defmodule LiveroomWeb.Accounts.UserRegistrationLive do
  use LiveroomWeb, :live_view

  alias Liveroom.Accounts
  alias Liveroom.Accounts.User
  alias LiveroomWeb.Components

  def render(assigns) do
    ~H"""
    <div class="mx-auto w-full max-w-xs flex flex-col items-stretch">
      <.header class="text-left mb-16">
        Register for an account
        <:subtitle>
          Already registered?
          <.link navigate={~p"/login"} class="font-semibold text-brand hover:underline">
            Sign in
          </.link>
          instead.
        </:subtitle>
      </.header>

      <%!-- <.simple_form
        for={@form}
        id="registration_form"
        phx-submit="save"
        phx-change="validate"
        phx-trigger-action={@trigger_submit}
        action={~p"/login?_action=registered"}
        method="post"
      >
        <.error :if={@check_errors}>
          Oops, something went wrong! Please check the errors below.
        </.error>

        <.input field={@form[:email]} type="email" label="Email" required />
        <.input field={@form[:password]} type="password" label="Password" required />

        <:actions>
          <.button phx-disable-with="Creating account..." class="w-full">Create an account</.button>
        </:actions>
      </.simple_form> --%>

      <%!-- <div class="flex justify-center mt-12 mb-8 mx-16 border-b border-dark-800/10" /> --%>

      <Components.GoogleAuthButton.render url={@oauth_google_url} label="Sign up with Google" />

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
            <.icon name="hero-envelope" class="mr-2" />Sign up with email
          </.button>
        </:actions>
      </.simple_form>
    </div>
    """
  end

  def mount(_params, _session, socket) do
    changeset = Accounts.change_user_registration(%User{})

    socket =
      socket
      |> assign(
        trigger_submit: false,
        check_errors: false,
        oauth_google_url: ElixirAuthGoogle.generate_oauth_url(LiveroomWeb.Endpoint.url())
      )
      |> assign_form(changeset)

    {:ok, socket, temporary_assigns: [form: nil]}
  end

  def handle_event("save", %{"user" => user_params}, socket) do
    case Accounts.register_user(user_params) do
      {:ok, user} ->
        {:ok, _} =
          Accounts.deliver_user_confirmation_instructions(
            user,
            &url(~p"/accounts/users/confirm/#{&1}")
          )

        changeset = Accounts.change_user_registration(user)
        {:noreply, socket |> assign(trigger_submit: true) |> assign_form(changeset)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, socket |> assign(check_errors: true) |> assign_form(changeset)}
    end
  end

  def handle_event("validate", %{"user" => user_params}, socket) do
    changeset = Accounts.change_user_registration(%User{}, user_params)
    {:noreply, assign_form(socket, Map.put(changeset, :action, :validate))}
  end

  defp assign_form(socket, %Ecto.Changeset{} = changeset) do
    form = to_form(changeset, as: "user")

    if changeset.valid? do
      assign(socket, form: form, check_errors: false)
    else
      assign(socket, form: form)
    end
  end
end
