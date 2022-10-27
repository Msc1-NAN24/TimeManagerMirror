defmodule TimeManagerApiWeb.AuthController do
  use TimeManagerApiWeb, :controller
  alias TimeManagerApi.Timemanager
  alias TimeManagerApi.Timemanager.User

  def me(conn, _params) do
    IO.inspect conn.user
    conn
    |> send_resp(:no_content, "")
  end

  def register(conn, user_params) do
    user = TimeManagerApi.Timemanager.get_user_by_email(user_params["email"])
    if is_nil(user) do
      with {:ok, %User{} = user} <- Timemanager.create_user(user_params) do
        conn
        |> put_status(:created)
        |> render("auth.json", user: user)
      else {:error, changeset} ->
        IO.inspect "ERROR !"
        conn
        |> send_resp(:bad_request, "Not found")
      end
    else
      conn
      |> send_resp(:no_content, "")
    end
  end

  def login(conn, %{"email" => email, "password" => password}) do
    user = TimeManagerApi.Timemanager.get_user_by_email(email);
    if (is_nil(user)) do
      conn
      |> put_status(:bad_request)
      |> render("auth_error.json", %{error: "Invalid email !"})
    end
    verify = TimeManagerApi.Auth.verify(user, password);
    if verify == false do
      conn
      |> put_status(:bad_request)
      |> render("auth_error.json", %{error: "Bad password !"})
    else
      token = TimeManagerApi.Auth.sign(user.id)
      IO.inspect token
      render(conn, "token.json", %{token: token, user: user})
    end
  end
end