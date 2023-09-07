defmodule Liveroom.EventNotifier do
  alias Plug.Conn
  alias Phoenix.LiveView.Socket

  alias Liveroom.Discord
  alias Liveroom.Analytics
  alias LiveroomWeb.RemoteIp

  def emit(event, socket_or_conn_or_analytics_data, opts \\ [])

  def emit(event, %Socket{} = socket, opts) when is_atom(event) or is_binary(event) do
    emit(event, socket.assigns.analytics_data, opts)
  end

  def emit(event, %Conn{} = conn, opts) when is_atom(event) or is_binary(event) do
    emit(
      event,
      %{
        url: Conn.request_url(conn),
        user_agent: get_user_agent(conn),
        user_ip: RemoteIp.get(conn),
        referrer: get_referrer(conn)
        # screen_width is not available
        # screen_height is not available
        # language is not available
      },
      opts
    )
  end

  ### Both Umami & Discord

  def emit(event, analytics_data, opts)
      when event in [
             :get_started_clicked,
             :join_waitlist_clicked,
             :user_joined_room,
             :user_left_room,
             :user_registered,
             :user_logged_in,
             :install_extension_button_clicked,
             :refresh_client_version_button_clicked,
             :copy_script_tag_button_clicked,
             :user_website_url_updated
           ] do
    Task.start(fn -> Analytics.send_event(event, analytics_data, opts) end)

    Task.start(fn ->
      Discord.send_notification(event, Keyword.merge([analytics_data: analytics_data], opts))
    end)
  end

  ### Only Umami

  ### Only Discord

  ### Helpers

  defp get_user_agent(%Conn{} = conn) do
    conn |> Conn.get_req_header("user-agent") |> List.first()
  end

  defp get_referrer(%Conn{} = conn) do
    conn |> Conn.get_req_header("referrer") |> List.first()
  end
end
