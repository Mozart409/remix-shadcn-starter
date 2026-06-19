# syntax=docker/dockerfile:1

ARG NODE_VERSION=24.15.0

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine AS base

# Set working directory for all build stages.
WORKDIR /usr/src/app

# Update system packages to fix OS-level vulnerabilities.
RUN apk update && apk upgrade

# Install pnpm. The version is controlled by packageManager in package.json.
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm

################################################################################
# Create a stage for installing production dependencies.
FROM base AS deps

# pnpm-workspace.yaml must be copied (not bind-mounted) because pnpm may rewrite it.
COPY pnpm-workspace.yaml .

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.local/share/pnpm/store to speed up subsequent builds.
# Leverage bind mounts to package.json and pnpm-lock.yaml to avoid having to copy them
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --prod --frozen-lockfile

################################################################################
# Create a stage for building the application.
FROM deps AS build

# Download additional development dependencies before building.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# Copy the rest of the source files into the image.
COPY . .
# Run the build script.
RUN pnpm run build

################################################################################
# Create a new stage to run the application with minimal runtime dependencies
# where the necessary files are copied from the build stage.
# Use a fresh node image to avoid bundling npm/pnpm and their vulnerable deps.
FROM node:${NODE_VERSION}-alpine AS final

# Set working directory.
WORKDIR /usr/src/app

# Update system packages to fix OS-level vulnerabilities.
RUN apk update && apk upgrade

# Remove npm and corepack to eliminate bundled vulnerable dependencies.
# The runtime only needs Node.js and the application dependencies.
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx /usr/local/lib/node_modules/corepack /usr/local/bin/corepack

# Use production node environment by default.
ENV NODE_ENV=production

# Run the application as a non-root user.
USER node

# Copy package.json so that package manager commands can be used.
COPY package.json .

# Copy the production dependencies from the deps stage and also
# the built application from the build stage into the image.
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/build/client ./build/client
COPY --from=build /usr/src/app/build/server ./build/server

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application directly with node to avoid needing npm/pnpm in the final image.
CMD ["node", "./node_modules/@react-router/serve/bin.cjs", "./build/server/index.js"]
