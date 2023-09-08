defmodule LiveroomWeb.ExtensionLive do
  use LiveroomWeb, :live_view

  def render(assigns) do
    ~H"""
    <div
      id="extension"
      phx-hook="PutAuthUserTokenHook"
      data-usertoken={@user_token}
      data-extensionid={Application.fetch_env!(:liveroom, :chrome_extension_id)}
      class="w-full max-w-lg flex flex-col justify-center items-center gap-4 text-lg font-semibold py-32 px-4"
    >
      <p class="text-center">Login successful 🎉</p>
      <p class="text-center">You can now close this tab and go back to Google Meet</p>
    </div>
    """
  end

  def mount(_params, session, socket) do
    user_token =
      case session["user_token"] do
        t when is_binary(t) -> t |> :erlang.binary_to_list() |> inspect()
        _ -> nil
      end

    socket = assign(socket, user_token: user_token)

    {:ok, socket}
  end
end
