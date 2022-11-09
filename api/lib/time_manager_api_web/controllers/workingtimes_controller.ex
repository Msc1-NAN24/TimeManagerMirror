defmodule TimeManagerApiWeb.WorkingtimesController do
  use TimeManagerApiWeb, :controller

  alias TimeManagerApi.Timemanager
  alias TimeManagerApi.Timemanager.Workingtimes

  action_fallback TimeManagerApiWeb.FallbackController

  import TimeManagerApiWeb.Router

  plug :is_manager when action in [:get_workingtimes_manager, :get_workingtimes_team, :create, :update, :delete]

  # CUSTOM ROUTES
  def get_workingtimes(conn, %{"user_id" => user_id, "id" => id}) do
    workingtimes = Timemanager.get_workingtimes(user_id, id)
    render(conn, "workingtimes.json", workingtimes: workingtimes)
  end

  def get_workingtimes(conn, %{"user_id" => user_id, "start" => start_time, "end" => end_time}) do
    workingtimes = Timemanager.filter_workingtimes(user_id, start_time, end_time)
    render(conn, "index.json", workingtimes: workingtimes)
  end

  def get_workingtimes(conn, %{"user_id" => user_id, "start" => start_time}) do
    workingtimes = Timemanager.filter_workingtimes(user_id, start_time, nil)
    IO.inspect workingtimes
    render(conn, "index.json", workingtimes: workingtimes)
  end

  def get_workingtimes(conn, %{"user_id" => user_id, "end" => end_time}) do
    workingtimes = Timemanager.filter_workingtimes(user_id, nil, end_time)
    render(conn, "index.json", workingtimes: workingtimes)
  end

  def get_workingtimes(conn, %{"user_id" => user_id}) do
    workingtimes = Timemanager.get_workingtimes(user_id)
    render(conn, "index.json", workingtimes: workingtimes)
  end

  def get_workingtimes_manager(conn, %{"id" => id}) do
    workingtimes = Timemanager.get_workingtimes_by_id(id)
    render(conn, "index.json", workingtimes: workingtimes)
  end

  def get_workingtimes(conn, _params) do
    workingtimes = Timemanager.get_workingtimes(conn.user.id)
    render(conn, "index.json", %{workingtimes: workingtimes})
  end

  #
  # TEAM WORKING TIMES ROUTES
  #

  def get_workingtimes_team(conn, %{"id" => id, "start" => start_time, "end" => end_time}) do
    with nil <- Timemanager.get_team(id) do
      send_error(conn, "Invalid Team id!")
    else %Timemanager.Team{} = team ->
      workingtimes = Timemanager.get_team_workingtimes(team, %{start_time: start_time, end_time: end_time});
      render(conn, "teams.json", %{workingtimes: workingtimes})
    end
  end

  def get_workingtimes_team(conn, %{"id" => id, "start" => start_time}) do
    with nil <- Timemanager.get_team(id) do
      send_error(conn, "Invalid Team id!")
    else %Timemanager.Team{} = team ->
      workingtimes = Timemanager.get_team_workingtimes(team, %{start_time: start_time});
      render(conn, "teams.json", %{workingtimes: workingtimes})
    end
  end

  def get_workingtimes_team(conn, %{"id" => id, "end" => end_time}) do
    with nil <- Timemanager.get_team(id) do
      send_error(conn, "Invalid Team id!")
    else %Timemanager.Team{} = team ->
      workingtimes = Timemanager.get_team_workingtimes(team, %{end_time: end_time});
      render(conn, "teams.json", %{workingtimes: workingtimes})
    end
  end

  def get_workingtimes_team(conn, %{"id" => id}) do
    with nil <- Timemanager.get_team(id) do
      send_error(conn, "Invalid Team id!")
    else %Timemanager.Team{} = team ->
      workingtimes = Timemanager.get_team_workingtimes(team);
      render(conn, "teams.json", %{workingtimes: workingtimes})
    end
  end

  #
  #
  #

  def create(conn) do
    with {:ok, %Workingtimes{} = workingtimes} <- Timemanager.create_workingtimes(conn.body_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.workingtimes_path(conn, :show, workingtimes))
      |> render("show.json", workingtimes: workingtimes)
    end
  end

  def update(conn, %{"id" => id}) do
    workingtimes = Timemanager.get_workingtimes_by_id(id)
    IO.inspect workingtimes
    with {:ok, %Workingtimes{} = workingtimes} <- Timemanager.update_workingtimes(workingtimes, conn.body_params) do
      render(conn, "show.json", workingtimes: workingtimes)
    end
  end

  def delete(conn, %{"id" => id}) do
    workingtimes = Timemanager.get_workingtimes(id)
    with {:ok, %Workingtimes{}} <- Timemanager.delete_workingtimes(workingtimes) do
      send_resp(conn, :no_content, "")
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
