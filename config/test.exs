import Config

config :liveroom, chrome_extension_id: "cjaebgpalgiknhanmkoplhhnekdcbnne"

# Only in tests, remove the complexity from the password hashing algorithm
config :bcrypt_elixir, :log_rounds, 1

# Configure your database
#
# The MIX_TEST_PARTITION environment variable can be used
# to provide built-in test partitioning in CI environment.
# Run `mix help test` for more information.
config :liveroom, Liveroom.Repo.Local,
  database:
    Path.expand(
      "../litefs/liveroom_test#{System.get_env("MIX_TEST_PARTITION")}.db",
      Path.dirname(__ENV__.file)
    ),
  pool: Ecto.Adapters.SQL.Sandbox,
  pool_size: 10

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :liveroom, LiveroomWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "4q0uKggGLdEeTZAoRaoNBHDkLGkSZsx03laaUKPWEossdPNAk6tOaRRHTGv8/Zb4",
  server: false

# In test we don't send emails.
config :liveroom, Liveroom.Mailer, adapter: Swoosh.Adapters.Test

# Disable swoosh api client as it is only required for production adapters.
config :swoosh, :api_client, false

# Print only warnings and errors during test
config :logger, level: :warning

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime
