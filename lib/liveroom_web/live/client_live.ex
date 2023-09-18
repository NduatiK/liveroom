defmodule LiveroomWeb.ClientLive do
  use LiveroomWeb, :live_view

  alias LiveroomWeb.Components.UserBanner
  alias LiveroomWeb.Components.CursorsPlayground

  def render(assigns) do
    ~H"""
    <CursorsPlayground.render current_user_id={@_liveroom_user_id} users={@_liveroom_users} />

    <div id="client_live" class="min-h-[100dvh] flex flex-col bg-dark-50">
      <%!-- Current user --%>
      <div class="space-y-8 mt-8 px-8">
        <h2 class="font-semibold">You</h2>
        <ul id="current_user" class="space-y-8 text-sm text-gray-800/75">
          <.live_component
            :if={current_user = @_liveroom_users[@_liveroom_user_id]}
            module={__MODULE__.User}
            id={"user_#{current_user.id}"}
            user_id={current_user.id}
            phx_ref={current_user.phx_ref}
            name={current_user.name}
            color={current_user.color}
            type={current_user.type}
          />
        </ul>
      </div>

      <%!-- Other users --%>
      <div class="space-y-8 mt-16 mb-32 px-8">
        <h2 class="font-semibold">Other users in the session</h2>
        <ul id="other_users" class="space-y-8 text-sm text-gray-800/75">
          <.live_component
            :for={{user_id, user} <- @_liveroom_users}
            :if={_is_other_user = user_id != @_liveroom_user_id}
            module={__MODULE__.User}
            id={"user_#{user_id}"}
            user_id={user_id}
            phx_ref={user.phx_ref}
            name={user.name}
            color={user.color}
            type={user.type}
          />
        </ul>
      </div>

      <UserBanner.render
        name={@_liveroom_users[@_liveroom_user_id][:name]}
        color={@_liveroom_users[@_liveroom_user_id][:color]}
      />
    </div>
    """
  end

  ### Live Components

  defmodule User do
    use LiveroomWeb, :live_component

    attr :id, :string, required: true
    attr :user_id, :string, required: true
    attr :phx_ref, :string, required: true
    attr :name, :string, required: true
    attr :color, :string, required: true
    attr :type, :string, required: true

    def render(assigns) do
      ~H"""
      <li
        id={@id}
        phx-hook="AnimateHook"
        data-watched={@phx_ref}
        data-animateonmount="true"
        data-timeout="1000"
        class={[
          "flex flex-col sm:flex-row sm:flex-wrap items-baseline gap-y-2 gap-x-8",
          "opacity-75 data-[animated]:opacity-100",
          "transition-all duration-300"
        ]}
      >
        <p
          class="w-fit py-1 p-2.5 font-semibold select-all rounded-full"
          style={"background-color: #{@color};"}
        >
          <%= @name %>
        </p>

        <p class="font-medium font-mono select-all"><%= @type %></p>
        <p class="font-medium font-mono select-all"><%= @user_id %></p>
        <p class="font-medium font-mono select-all"><%= @phx_ref %></p>
      </li>
      """
    end
  end

  ### Server

  def mount(%{"room_id" => room_id} = _params, _session, socket) do
    socket =
      assign(socket,
        page_title: page_title(socket, room_id)
      )

    {:ok, socket, layout: false}
  end

  ### Helpers

  defp page_title(
         %{assigns: %{_liveroom_user_id: current_user_id, _liveroom_users: users}} = _socket,
         room_id
       ) do
    case users[current_user_id][:name] do
      nil -> room_id
      name -> name <> " - " <> room_id
    end
  end
end
