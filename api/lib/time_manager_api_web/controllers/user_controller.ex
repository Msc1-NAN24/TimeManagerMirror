defmodule TimeManagerApiWeb.UserController do
  use TimeManagerApiWeb, :controller

  alias TimeManagerApi.Timemanager
  alias TimeManagerApi.Timemanager.User

  action_fallback TimeManagerApiWeb.FallbackController

  import TimeManagerApiWeb.Router

  plug :is_manager when action in [:list, :delete, :update, :get]
  plug :is_general_manager when action in [:promote, :revoke, :reset_password_user]

  def list(conn, %{"email" => email}) do
    users = Timemanager.find_user_by_email(email)
    render(conn, "index.json", users: users)
  end

  def list(conn, %{"firstname" => firstname, "lastname" => lastname}) do
    users = Timemanager.find_user_by_names(firstname, lastname)
    render(conn, "index.json", users: users)
  end

  def list(conn, params) do
    users = Timemanager.list_users()
    render(conn, "index.json", users: users)
  end

  def get(conn, %{"id" => id}) do
    user = Timemanager.get_user!(id)
    render(conn, "manager.json", user: user)
  end

  def get_me(conn, _params) do
    render(conn, "user.json", user: conn.user)
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

  def delete_me(conn, _params) do
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

  def reset_password(conn, %{"new_password" => new_password, "last_password" => last_password}) do
    with true <- TimeManagerApi.Auth.verify(conn.user, last_password) do
      Timemanager.update_user(conn.user, %{password: TimeManagerApi.Auth.hash_password(new_password)})
      send_resp(conn, :ok, "")
    else false ->
      send_error(conn, "Invalid password !")
    end
  end

  def reset_password_user(conn, %{"id" => id, "new_password" => new_password}) do
    with %User{} = user <- Timemanager.get_user(id) do
      Timemanager.update_user(user, %{password: TimeManagerApi.Auth.hash_password(new_password)})
      send_resp(conn, :ok, "")
    else _ ->
      send_error(conn, "Invalid user id !")
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