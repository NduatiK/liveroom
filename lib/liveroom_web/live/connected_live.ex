defmodule LiveroomWeb.ConnectedLive do
  use LiveroomWeb, :live_view

  @impl true
  def render(assigns) do
    ~H"""
    connected
    <p :if={@email}><%= @email %></p>
    <p :if={@name}><%= @name %></p>
    <img :if={@picture_url} src={@picture_url} width="100px" />

    <.link
      href={~p"/accounts/users/log_out"}
      method="delete"
      class="mt-12 bg-zinc-200/75 hover:bg-zinc-200 py-1 px-2 font-medium rounded transition-colors"
    >
      Log out
    </.link>
    """
  end

  ### Components

  ### Server

  @impl true
  def mount(_params, _session, socket) do
    socket =
      assign(socket,
        email: socket.assigns.current_user.email,
        name: nil,
        picture_url: socket.assigns.current_user.picture_url
      )

    {:ok, socket}
  end

  @impl true
  def handle_params(params, _uri, socket) do
    socket =
      if params != %{} do
        assign(socket,
          email: params["email"],
          name: params["name"],
          picture_url: params["picture_url"]
        )
      else
        socket
      end

    {:noreply, socket}
  end
end
