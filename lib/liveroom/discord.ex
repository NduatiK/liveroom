defmodule Liveroom.Discord do
  @moduledoc """
  Send messages to a dedicated channel on a Discord server.

  See https://discord.com/developers/docs/resources/webhook#execute-webhook for doc on how to build a Discord message.
  """

  require Logger

  ### High-level API

  def send_log(level, msg, opts \\ []) when level in [:warn, :error] do
    timestamp = Keyword.get(opts, :timestamp, DateTime.utc_now())
    module = Keyword.get(opts, :module, nil)
    function = Keyword.get(opts, :function, nil)
    file = Keyword.get(opts, :file, nil)
    line = Keyword.get(opts, :line, nil)

    %{
      embeds: [
        %{
          title:
            case level do
              :warn -> "🚧 Warning"
              :error -> "🚨 Error"
            end,
          description: inspect(msg),
          timestamp: DateTime.to_iso8601(timestamp),
          color:
            case level do
              :warn -> color(:yellow)
              :error -> color(:red)
            end,
          fields:
            [
              module && %{name: "Module", value: module, inline: true},
              function && %{name: "Function", value: function, inline: true},
              file && line && %{name: "File:line", value: "#{file}:#{line}"}
            ]
            |> Enum.filter(& &1)
        }
      ]
    }
    |> send_message(webhook_url_app_logs())
  end

  def send_notification(name, opts \\ [])

  def send_notification(:join_waitlist_clicked, opts) do
    %{
      embeds: [
        %{
          title: "💌 join waitlist cliked",
          # description: "",
          # timestamp: DateTime.to_iso8601(DateTime.utc_now()),
          color: color(:purple),
          fields: [
            %{
              name: "location",
              value: Keyword.fetch!(opts, :location),
              inline: true
            }
          ]
        }
      ]
    }
    |> send_message(webhook_url_app_notifications())
  end

  def send_notification(:user_joined_room, opts) do
    %{
      embeds: [
        %{
          title: "👋 user joined room",
          # description: "",
          # timestamp: DateTime.to_iso8601(DateTime.utc_now()),
          color: color(:green),
          fields: [
            %{
              name: "room",
              value: Keyword.fetch!(opts, :room_id) || "",
              inline: true
            },
            %{
              name: "client url",
              value: opts[:analytics_data][:url] || "",
              inline: true
            },
            %{
              name: "# of users in the room",
              value: Keyword.fetch!(opts, :n_of_users) || "",
              inline: true
            },
            %{
              name: "analytics data",
              value:
                %{
                  referrer: opts[:analytics_data][:referrer],
                  # user_ip: opts[:analytics_data][:user_ip],
                  screen:
                    "#{opts[:analytics_data][:inner_width]}x#{opts[:analytics_data][:inner_height]}",
                  language: opts[:analytics_data][:language]
                  # user_agent: opts[:analytics_data][:user_agent]
                }
                |> Enum.map(fn {k, v} -> "#{k}: #{v}" end)
                |> Enum.join("\n"),
              inline: false
            }
          ]
        }
      ]
    }
    |> send_message(webhook_url_app_notifications())
  end

  def send_notification(:user_left_room, opts) do
    %{
      embeds: [
        %{
          title: "🤝 user left room",
          # description: "",
          # timestamp: DateTime.to_iso8601(DateTime.utc_now()),
          color: color(:dark_navy),
          fields: [
            %{
              name: "room",
              value: Keyword.fetch!(opts, :room_id) || "",
              inline: true
            },
            %{
              name: "client url",
              value: opts[:analytics_data][:url] || "",
              inline: true
            },
            %{
              name: "# of users in the room",
              value: Keyword.fetch!(opts, :n_of_users) || "",
              inline: true
            }
          ]
        }
      ]
    }
    |> send_message(webhook_url_app_notifications())
  end

  ### Low-level API

  def send_message(message, webhook_url) when is_map(message) do
    if is_discord_enabled?(), do: Req.post!(webhook_url, json: message)
  end

  def send_message(message, webhook_url) when is_binary(message) do
    if is_discord_enabled?(), do: Req.post!(webhook_url, json: %{content: message})
  end

  ### Helpers

  # Colors taken from https://gist.github.com/thomasbnt/b6f455e2c7d743b796917fa3c205f812
  defp color(:red), do: 15_548_997
  defp color(:yellow), do: 16_705_372
  # defp color(:grey), do: 10_070_709
  defp color(:green), do: 5_763_719
  defp color(:purple), do: 5_793_266
  defp color(:dark_navy), do: 2_899_536

  defp is_discord_enabled?, do: config()[:enabled]
  defp webhook_url_app_logs, do: config()[:webhook_url_app_logs]
  defp webhook_url_app_notifications, do: config()[:webhook_url_app_notifications]

  defp config, do: Application.get_env(:liveroom, :discord)
end
