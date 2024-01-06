# Welcome to a Remix / Shadcn UI / Remix Devtools Starter / Vite !

- [Remix Docs](https://remix.run/docs)
- [Shadcn UI Docs](https://ui.shadcn.com/docs/)
- [Remix Devtools Docs](https://github.com/Code-Forge-Net/Remix-Dev-Tools)
- [Remix Vite Migration](https://remix.run/docs/en/main/future/vite#setup-vite)

## Development

From your terminal:

```sh
pnpm run dev
```

This starts your app in development mode, rebuilding assets on file changes. You can open it in your browser at `http://localhost:5173` and in the bottom right corner you'll see a button to the Remix Devtools.

## Deployment

First, build your app for production:

```sh
pnpm run build
```

Then run the app in production mode:

```sh
pnpm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/server`
- `build/client/`

### Todo

- [ ] Add a dockerfile
- [ ] Add a docker-compose file
