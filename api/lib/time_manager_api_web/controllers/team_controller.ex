defmodule TimeManagerApiWeb.TeamController do
  use TimeManagerApiWeb, :controller

  alias TimeManagerApi.Timemanager
  alias TimeManagerApi.Timemanager.Team

  action_fallback TimeManagerApiWeb.FallbackController

  def create(conn, %{"name" => name}) do
    with {:ok, created_team} <- Timemanager.create_team(%{name: name, owner: conn.user.id}) do
      conn
      |> render("team.json", %{team: created_team})
    else error ->
    IO.inspect error
      send_error(conn, "Can't create team !")
    end
  end

  def list(conn, _params) do
    case conn.user.rank do
      :manager ->
        teams = Timemanager.get_manager_teams(conn.user.id)
        render(conn, "teams.json", %{teams: teams})
      :general_manager ->
        teams = Timemanager.list_teams()
        render(conn, "teams.json", %{teams: teams})
    end
  end

  def get(conn, %{"id" => id}) do
    with nil <- Timemanager.get_team(id) do
      send_error(conn, "Team not found !")
    else team ->
      conn
      |> render("team.json", %{team: team})
    end
  end

  def add_member(conn, %{"id" => id, "user_id" => user_id}) do
    user = Timemanager.get_user(user_id);
    if is_nil(user) do
      send_error(conn, "No user found !")
    else
      case user.rank do
        :employee ->
          updatedUser = Timemanager.update_user(user, %{team_id: id});
          IO.inspect updatedUser
          send_resp(conn, :ok, "")
        _ -> send_error(conn, "Cannot move user in this team")
      end
    end
  end

  def remove_member(conn, _params) do

  end

  def delete(conn, _params) do

  end

  def update(conn, _params) do

  end

  def send_error(conn, message) do
    conn
    |> put_status(:bad_request)
    |> put_view(TimeManagerApiWeb.ErrorView)
    |> render("error.json", %{error: message})
    |> halt()
  end

end
