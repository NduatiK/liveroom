import Config

# config/runtime.exs is executed for all environments, including
# during releases. It is executed after compilation and before the
# system starts, so it is typically used to load production configuration
# and secrets from environment variables or elsewhere. Do not define
# any compile-time configuration in here, as it won't be applied.
# The block below contains prod specific runtime configuration.

# ## Using releases
#
# If you use `mix release`, you need to explicitly enable the server
# by passing the PHX_SERVER=true when you start it:
#
#     PHX_SERVER=true bin/liveroom start
#
# Alternatively, you can use `mix phx.gen.release` to generate a `bin/server`
# script that automatically sets the env var above.
if System.get_env("PHX_SERVER") do
  config :liveroom, LiveroomWeb.Endpoint, server: true
end

if config_env() != :test do
  config :liveroom, :umami,
    enabled: System.get_env("UMAMI_ENABLED") == "true",
    base_url: System.get_env("UMAMI_BASE_URL"),
    website_id: System.get_env("UMAMI_WEBSITE_ID")

  config :liveroom, :discord,
    enabled: System.get_env("DISCORD_ENABLED") == "true",
    webhook_url_app_logs: System.get_env("DISCORD_WEBHOOK_URL_APP_LOGS"),
    webhook_url_app_notifications: System.get_env("DISCORD_WEBHOOK_URL_APP_NOTIFICATIONS")

  config :elixir_auth_google,
    client_id: System.fetch_env!("GOOGLE_CLIENT_ID"),
    client_secret: System.fetch_env!("GOOGLE_CLIENT_SECRET")
end

# if config_env() != :prod do
#   config :libcluster,
#     topologies: [
#       local_epmd_example: [
#         strategy: Elixir.Cluster.Strategy.LocalEpmd
#       ]
#     ]
# end

if config_env() == :prod do
  config :liveroom, :admin_basic_auth,
    username: System.fetch_env!("ADMIN_BASIC_AUTH_USERNAME"),
    password: System.fetch_env!("ADMIN_BASIC_AUTH_PASSWORD")

  if app_name = System.get_env("FLY_APP_NAME") do
    config :libcluster,
      debug: true,
      topologies: [
        fly6pn: [
          strategy: Cluster.Strategy.DNSPoll,
          config: [
            # NOTE: Default is 5_000 ms. But during deployment, it is quite spammy.
            #       Bumping it a little should not hurt that much.
            # polling_interval: 5_000,
            polling_interval: 10_000,
            query: "#{app_name}.internal",
            node_basename: app_name
          ]
        ]
      ]
  end

  database_path =
    System.get_env("DATABASE_PATH") ||
      raise """
      environment variable DATABASE_PATH is missing.
      For example: /data/litefs/liveroom.db
      """

  maybe_ipv6 = if System.get_env("ECTO_IPV6") in ~w(true 1), do: [:inet6], else: []

  config :liveroom, Liveroom.Repo.Local,
    database: database_path,
    pool_size: String.to_integer(System.get_env("POOL_SIZE") || "10"),
    socket_options: maybe_ipv6

  # The secret key base is used to sign/encrypt cookies and other secrets.
  # A default value is used in config/dev.exs and config/test.exs but you
  # want to use a different value for prod and you most likely don't want
  # to check this value into version control, so we use an environment
  # variable instead.
  secret_key_base =
    System.get_env("SECRET_KEY_BASE") ||
      raise """
      environment variable SECRET_KEY_BASE is missing.
      You can generate one by calling: mix phx.gen.secret
      """

  host = System.get_env("PHX_HOST") || "example.com"
  port = String.to_integer(System.get_env("PORT") || "4000")

  config :liveroom, LiveroomWeb.Endpoint,
    url: [host: host, port: 443, scheme: "https"],
    http: [
      # Enable IPv6 and bind on all interfaces.
      # Set it to  {0, 0, 0, 0, 0, 0, 0, 1} for local network only access.
      # See the documentation on https://hexdocs.pm/plug_cowboy/Plug.Cowboy.html
      # for details about using IPv6 vs IPv4 and loopback vs public addresses.
      ip: {0, 0, 0, 0, 0, 0, 0, 0},
      port: port
    ],
    secret_key_base: secret_key_base

  config :liveroom, canonical_host: System.get_env("PHX_HOST")

  # ## SSL Support
  #
  # To get SSL working, you will need to add the `https` key
  # to your endpoint configuration:
  #
  #     config :liveroom, LiveroomWeb.Endpoint,
  #       https: [
  #         ...,
  #         port: 443,
  #         cipher_suite: :strong,
  #         keyfile: System.get_env("SOME_APP_SSL_KEY_PATH"),
  #         certfile: System.get_env("SOME_APP_SSL_CERT_PATH")
  #       ]
  #
  # The `cipher_suite` is set to `:strong` to support only the
  # latest and more secure SSL ciphers. This means old browsers
  # and clients may not be supported. You can set it to
  # `:compatible` for wider support.
  #
  # `:keyfile` and `:certfile` expect an absolute path to the key
  # and cert in disk or a relative path inside priv, for example
  # "priv/ssl/server.key". For all supported SSL configuration
  # options, see https://hexdocs.pm/plug/Plug.SSL.html#configure/1
  #
  # We also recommend setting `force_ssl` in your endpoint, ensuring
  # no data is ever sent via http, always redirecting to https:
  #
  #     config :liveroom, LiveroomWeb.Endpoint,
  #       force_ssl: [hsts: true]
  #
  # Check `Plug.SSL` for all available options in `force_ssl`.

  # ## Configuring the mailer
  #
  # In production you need to configure the mailer to use a different adapter.
  # Also, you may need to configure the Swoosh API client of your choice if you
  # are not using SMTP. Here is an example of the configuration:
  #
  config :liveroom, Liveroom.Mailer,
    adapter: Swoosh.Adapters.Brevo,
    api_key: System.get_env("BREVO_API_KEY")

  # For this example you need include a HTTP client required by Swoosh API client.
  # Swoosh supports Hackney and Finch out of the box:

  config :swoosh, :api_client, Swoosh.ApiClient.Hackney

  # See https://hexdocs.pm/swoosh/Swoosh.html#module-installation for details.
end
