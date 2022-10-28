defmodule TimeManagerApiWeb.UserController do
  use TimeManagerApiWeb, :controller

  alias TimeManagerApi.Timemanager
  alias TimeManagerApi.Timemanager.User

  action_fallback TimeManagerApiWeb.FallbackController

  import TimeManagerApiWeb.Router

  plug :is_manager when action in [:list, :delete, :update, :get]
  plug :is_general_manager when action in [:promote, :revoke]

  def list(conn, params) do
    users = Timemanager.list_users()
    render(conn, "index.json", users: users)
  end

  def get(conn, %{"id" => id}) do
    user = Timemanager.get_user!(id)
    render(conn, "manager.json", user: user)
  end

  def get_me(conn, _params) do
    render(conn, "show.json", user: conn.user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Timemanager.get_user!(id)
    with {:ok, %User{} = user} <- Timemanager.update_user(user, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  def update_me(conn, %{"user" => user_params}) do
    user = conn.user
    with {:ok, %User{} = user} <- Timemanager.update_user(user, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  def delete_me(conn) do
    Timemanager.delete_user(conn.user);
    send_resp(conn, :ok, "")
  end

  def delete(conn, %{"id" => id}) do
    user = Timemanager.get_user!(id)

    with {:ok, %User{}} <- Timemanager.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end

  def promote(conn, %{"id" => id}) do
    user = Timemanager.get_user(id)
    if is_nil(user) do
      send_error(conn, "Invalid user !")
    else
      case user.rank do
        :employee ->
          Timemanager.change_rank(user, :manager)
          send_resp(conn, :ok, "")
        _ -> send_error(conn, "Can't promote user !")
      end
    end
  end

  def revoke(conn, %{"id" => id}) do
    user = Timemanager.get_user(id)
    if is_nil(user) do
      send_error(conn, "Invalid user !")
    else
      case user.rank do
        :manager ->
          Timemanager.change_rank(user, :employee)
          send_resp(conn, :ok, "")
        _ -> send_error(conn, "Can't revoke user !")
      end
    end
  end

  def send_error(conn, message) do
    conn
    |> put_status(:bad_request)
    |> put_view(TimeManagerApiWeb.ErrorView)
    |> render("error.json", %{error: message})
    |> halt()
  end

end