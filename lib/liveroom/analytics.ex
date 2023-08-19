defmodule Liveroom.Analytics do
  alias Phoenix.LiveView.Socket

  alias Liveroom.Analytics.Umami

  ### High-level API

  def send_event(event, socket_or_analytics_data, opts \\ [])

  def send_event(event, %Socket{} = socket, opts) when is_atom(event) or is_binary(event) do
    send_event(event, socket.assigns.analytics_data, opts)
  end

  def send_event(:join_waitlist_clicked, analytics_data, opts) do
    send_event(
      "join_waitlist_clicked",
      analytics_data,
      props: %{
        location: Keyword.fetch!(opts, :location)
      }
    )
  end

  def send_event(:user_joined_room, analytics_data, opts) do
    send_event(
      "user_joined_room",
      analytics_data,
      props: %{
        room_id: Keyword.fetch!(opts, :room_id),
        client_url: analytics_data.url
      }
    )
  end

  def send_event(:user_left_room, analytics_data, opts) do
    send_event(
      "user_left_room",
      analytics_data,
      props: %{
        room_id: Keyword.fetch!(opts, :room_id),
        client_url: analytics_data.url,
        n_of_users: Keyword.fetch!(opts, :n_of_users)
      }
    )
  end

  ### Low-level API

  @doc """
  To use live views,
  for any event (following an action of an user for example).
  """
  def send_event(event, analytics_data, opts) when is_binary(event) and is_list(opts) do
    Umami.send_event(
      event,
      opts[:url] || analytics_data[:url],
      opts[:user_agent] || analytics_data[:user_agent],
      opts[:user_ip] || analytics_data[:user_ip],
      referrer: opts[:referrer] || analytics_data[:referrer],
      screen_width: opts[:screen_width] || analytics_data[:screen_width],
      screen_height: opts[:screen_height] || analytics_data[:screen_height],
      props: opts[:props] || %{},
      language: opts[:language] || analytics_data[:language]
    )
  end
end