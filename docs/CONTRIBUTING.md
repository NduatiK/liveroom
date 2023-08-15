# Contributing

## One-time setup

1. install dependencies:

```bash
mix deps.get && \
npm install --prefix client && \
npm install --prefix chrome-extension
```

2. start the database:

```bash
docker-compose up -d db
```

3. setup the database:

```bash
mix setup
```

## Start

1. start the server app:

```bash
iex -S mix phx.server
```

2. start the client app:

```bash
npm run dev --prefix client -- --port 5173
```

3. start the chrome extension app:

```bash
npm run dev --prefix chrome-extension -- --port 5174
```

> [!NOTE]
> Don't forget to load the chrome extension with the "Load unpacked" button on [chrome://extensions](chrome://extensions).
> Select the `chrome-extension/dist` folder in the project.

## Access

Now you can visit from your browser:

- the chrome extension in any Google Meet meeting
- the client interface on [`localhost:5173`](http://localhost:5173)
- the admin server interface on [`localhost:4000/room/public/admin`](http://localhost:4000/room/public/admin)
- the client server interface on [`localhost:4000/room/public/client`](http://localhost:4000/room/public/client)
