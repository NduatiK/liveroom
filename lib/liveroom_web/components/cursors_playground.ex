defmodule LiveroomWeb.Components.CursorsPlayground do
  use LiveroomWeb, :html

  alias LiveroomWeb.Components.Cursor

  attr :current_user_id, :string, required: true
  attr :users, :map, required: true

  def render(assigns) do
    ~H"""
    <div
      id="cursors_playground"
      phx-hook="TrackCursorsHook"
      data-mode="page"
      data-mouseclick="true"
      data-keyboardpress="true"
    >
      <.live_component
        :for={{user_id, user} <- @users}
        module={Cursor}
        id={"cursor_#{user_id}"}
        is_self={user_id == @current_user_id}
        user_id={user_id}
        x={user.x}
        y={user.y}
        name={user.name}
        color={user.color}
        is_shift_key_down={user.is_shift_key_down}
        is_mouse_down={user.is_mouse_down}
        msg={user.msg}
        mode={:full_screen}
      />
    </div>
    """
  end
end
