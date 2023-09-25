# This file is responsible for configuring your application
# and its dependencies with the aid of the Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
import Config

config :liveroom, Liveroom.Repo.Local, priv: "priv/repo"

config :liveroom,
  ecto_repos: [Liveroom.Repo.Local],
  generators: [binary_id: true]

# Configures the endpoint
config :liveroom, LiveroomWeb.Endpoint,
  url: [host: "localhost"],
  render_errors: [
    formats: [html: LiveroomWeb.ErrorHTML, json: LiveroomWeb.ErrorJSON],
    layout: false
  ],
  pubsub_server: Liveroom.PubSub,
  live_view: [signing_salt: "s8LWOzCq"]

# Configures the mailer
#
# By default it uses the "Local" adapter which stores the emails
# locally. You can see the emails in your browser, at "/dev/mailbox".
#
# For production it's recommended to configure a different adapter
# at the `config/runtime.exs`.
config :liveroom, Liveroom.Mailer, adapter: Swoosh.Adapters.Local

# Configure esbuild (the version is required)
config :esbuild,
  version: "0.19.3",
  default: [
    args:
      ~w(js/app.js --bundle --target=es2017 --outdir=../priv/static/assets --external:/fonts/* --external:/images/* --external:/videos/*),
    cd: Path.expand("../assets", __DIR__),
    env: %{"NODE_PATH" => Path.expand("../deps", __DIR__)}
  ]

# Configure tailwind (the version is required)
config :tailwind,
  version: "3.3.2",
  default: [
    args: ~w(
      --config=tailwind.config.js
      --input=css/app.css
      --output=../priv/static/assets/app.css
    ),
    cd: Path.expand("../assets", __DIR__)
  ]

# Configures Elixir's Logger
config :logger,
  utc_log: true,
  backends: [Liveroom.DiscordLoggerBackend, :console]

config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{config_env()}.exs"
