# Remix Shadcn Starter

A starter template for building modern web applications with React Router v8, React 19, Tailwind CSS v4, and shadcn/ui.

- [React Router Docs](https://reactrouter.com/)
- [Shadcn UI Docs](https://ui.shadcn.com/docs/)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs/)

## Tech Stack

- **React** v19
- **React Router** v8
- **Tailwind CSS** v4
- **Vite** v8
- **Biome** (linting & formatting)
- **pnpm** v11.5.3
- **Node.js** v24+

## Live Preview

You can view this starter [here](https://remix-shadcn-starter.fly.dev/)

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) v24+ (or use the Nix flake)
- [pnpm](https://pnpm.io/) v11.5.3
- [Podman](https://podman.io/) (optional)

### Using Nix (Recommended)

If you have Nix installed, the development environment is fully managed via the provided `flake.nix`:

```sh
nix develop
# or with direnv:
direnv allow
```

### Manual Setup

```sh
# Install dependencies
pnpm install

# Run the development server
pnpm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Build & Production

Build your app for production:

```sh
pnpm run build
```

Then run the app in production mode:

```sh
pnpm start
```

Make sure to deploy the output of `react-router build`:

- `build/server/`
- `build/client/`

## Podman

Build and run with Podman:

```sh
# Build the image
pnpm run image

# Or with Podman Compose
pnpm run up
```

The Dockerfile uses:
- Node.js v24.15.0
- pnpm v11.5.3

## Scripts

| Script | Description |
|--------|-------------|
| `pnpm run dev` | Start development server |
| `pnpm run build` | Build for production |
| `pnpm run start` | Start production server |
| `pnpm run lint` | Run Biome linter |
| `pnpm run fmt` | Run Biome formatter |
| `pnpm run typecheck` | Run TypeScript type check |
| `pnpm run image` | Build Podman image |
| `pnpm run up` | Start Podman Compose stack |
| `pnpm run down` | Stop Podman Compose stack |
| `pnpm run watch` | Podman Compose watch mode |

## License

MIT
