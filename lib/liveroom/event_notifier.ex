defmodule Liveroom.EventNotifier do
  alias Phoenix.LiveView.Socket

  alias Liveroom.Discord
  alias Liveroom.Analytics

  def emit(event, socket_or_analytics_data, opts \\ [])

  def emit(event, %Socket{} = socket, opts) when is_atom(event) or is_binary(event) do
    emit(event, socket.assigns.analytics_data, opts)
  end

  ### Both Umami & Discord

  def emit(event, analytics_data, opts)
      when event in [
             :join_waitlist_clicked,
             :user_joined_room,
             :user_left_room
           ] do
    Task.start(fn -> Analytics.send_event(event, analytics_data, opts) end)
    Task.start(fn -> Discord.send_notification(event, opts) end)
  end

  ### Only Umami

  ### Only Discord
end
