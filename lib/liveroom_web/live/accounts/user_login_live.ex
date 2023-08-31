defmodule LiveroomWeb.Accounts.UserLoginLive do
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

      <a
        href={@oauth_google_url}
        class="mt-4 inline-flex items-center bg-blue-600/90 hover:bg-blue-600 text-blue-50 text-lg font-semibold pr-8 rounded transition-colors duration-200 ease-in-out"
      >
        <div class="m-1 p-1 flex justify-center items-center bg-blue-50 rounded-sm">
          <svg
            width="25"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 533.5 544.3"
            class="inline-flex items-center"
          >
            <path
              d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
              fill="#4285f4"
            />
            <path
              d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
              fill="#34a853"
            />
            <path
              d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
              fill="#fbbc04"
            />
            <path
              d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
              fill="#ea4335"
            />
          </svg>
        </div>

        <div class="ml-6">
          Sign in with Google
        </div>
      </a>

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
