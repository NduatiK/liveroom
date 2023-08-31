defmodule LiveroomWeb.Accounts.UserLoginLive do
  alias LiveroomWeb.Components
  use LiveroomWeb, :live_view

  def render(assigns) do
    ~H"""
    <div class="mx-auto max-w-sm">
      <.header class="text-left mb-8">
        Sign in to account
        <:subtitle>
          Don't have an account?
          <.link navigate={~p"/register"} class="font-semibold text-brand hover:underline">
            Sign up
          </.link>
          for an account now.
        </:subtitle>
      </.header>

      <.simple_form for={@form} id="login_form" action={~p"/log_in"} phx-update="ignore">
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

      <div class="flex justify-center mt-8">
        <div class="align-center">OR</div>
      </div>

      <.simple_form
        for={@form}
        id="magic_link_form"
        action={~p"/log_in?_action=magic_link"}
        phx-update="ignore"
        class="my-0 py-0"
      >
        <.input field={@form[:email]} type="email" label="Email" required />
        <:actions>
          <.button class="w-full">
            Send me a link <.icon name="hero-envelope" />
          </.button>
        </:actions>
      </.simple_form>

      <div class="flex justify-center mt-8">
        <div class="align-center">OR</div>
      </div>

      <Components.GoogleAuthButton.render url={@oauth_google_url} />
    </div>
    """
  end

  def mount(_params, _session, socket) do
    email = live_flash(socket.assigns.flash, :email)
    form = to_form(%{"email" => email}, as: "user")

    socket =
      assign(socket,
        form: form,
        oauth_google_url: ElixirAuthGoogle.generate_oauth_url(LiveroomWeb.Endpoint.url())
      )

    {:ok, socket, temporary_assigns: [form: form]}
  end
end
