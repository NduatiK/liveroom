defmodule LiveroomWeb.ApiControllerTest do
  use LiveroomWeb.ConnCase, async: false

  import Liveroom.AccountsFixtures

  describe "/api/current_user" do
    setup do
      %{user: user_fixture()}
    end

    test "success", %{conn: conn, user: user} do
      user_token =
        Liveroom.Accounts.generate_user_session_token(user)
        |> :erlang.binary_to_list()
        |> inspect()

      conn = post(conn, ~p"/api/current_user", %{user_token: user_token})

      assert response = json_response(conn, 200)
      assert response["current_user"]["id"] == user.id
      assert response["current_user"]["email"] == user.email
      assert response["current_user"]["picture_url"] == user.picture_url
      assert response["current_user"]["website_url"] == user.website_url
    end

    test "invalid token", %{conn: conn} do
      user_token = "invalid"
      conn = post(conn, ~p"/api/current_user", %{user_token: user_token})

      assert response = json_response(conn, 400)
      assert response["message"] == "Invalid token"
    end
  end
end
