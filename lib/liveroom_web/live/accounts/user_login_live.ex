defmodule LiveroomWeb.Accounts.UserLoginLive do
  use LiveroomWeb, :live_view

  alias LiveroomWeb.Components

  def render(assigns) do
    ~H"""
    <div class="mx-auto w-full max-w-xs flex flex-col items-stretch">
      <.header class="text-left mb-16">
        Sign in to account
        <:subtitle>
          Don't have an account?
          <.link navigate={~p"/register"} class="font-semibold text-brand hover:underline">
            Sign up
          </.link>
          instead.
        </:subtitle>
      </.header>

      <%!-- <.simple_form for={@form} id="login_form" action={~p"/login"} phx-update="ignore">
        <.input field={@form[:email]} type="email" label="Email" required />
        <.input field={@form[:password]} type="password" label="Password" required />

        <:actions>
          <.input field={@form[:remember_me]} type="checkbox" label="Keep me logged in" />
          <.link href={~p"/reset_password"} class="text-sm font-semibold">
            Forgot your password?
          </.link>
        </:actions>
        <:actions>
          <.button phx-disable-with="Signing in..." class="w-full">
            Sign in <span aria-hidden="true">→</span>
          </.button>
        </:actions>
      </.simple_form>

      <div class="flex justify-center mt-12 mb-8 mx-16 border-b border-dark-800/10" /> --%>

      <Components.GoogleAuthButton.render url={@oauth_google_url} label="Sign in with Google" />

      <div class="flex justify-center mt-12 mb-8 mx-16 border-b border-dark-800/10" />

      <.simple_form
        for={@form}
        id="magic_link_form"
        action={~p"/login?_action=magic_link"}
        phx-update="ignore"
        class="my-0 py-0"
      >
        <.input field={@form[:email]} type="email" label="Email" required />
        <:actions>
          <.button class="w-full flex justify-center items-center py-2.5">
            <.icon name="hero-envelope" class="mr-2" />Send me a link
          </.button>
        </:actions>
      </.simple_form>
    </div>
    """
  end

  ### Server

  def mount(_params, session, socket) do
    email = live_flash(socket.assigns.flash, :email)
    form = to_form(%{"email" => email}, as: "user")

    socket =
      assign(socket,
        form: form,
        oauth_google_url: oauth_google_url(session[:user_return_to])
      )

    {:ok, socket, temporary_assigns: [form: form]}
  end

  ### Helpers

  defp oauth_google_url(user_return_to \\ nil)

  defp oauth_google_url("/extension") do
    oauth_google_url() <> "&state=extension"
  end

  defp oauth_google_url(_user_return_to) do
    ElixirAuthGoogle.generate_oauth_url(LiveroomWeb.Endpoint.url())
  end
end
