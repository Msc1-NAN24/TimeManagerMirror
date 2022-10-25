defmodule TimeManagerApiWeb.UserController do
  use TimeManagerApiWeb, :controller

  alias TimeManagerApi.Timemanager
  alias TimeManagerApi.Timemanager.User

  action_fallback TimeManagerApiWeb.FallbackController

  def index(conn, _params) do
    users = Timemanager.list_users()
    render(conn, "index.json", users: users)
  end

  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- Timemanager.create_user(user_params) do
      conn
      |> put_status(:created)
      # |> put_resp_header("location", Routes.user_path(conn, :show, user))
      |> render("show.json", user: user)
    end
  end

  def show(conn, %{"id" => id}) do
    user = Timemanager.get_user!(id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Timemanager.get_user!(id)

    with {:ok, %User{} = user} <- Timemanager.update_user(user, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Timemanager.get_user!(id)

    with {:ok, %User{}} <- Timemanager.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end
