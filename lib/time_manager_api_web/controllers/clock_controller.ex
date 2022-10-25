defmodule TimeManagerApiWeb.ClockController do
  use TimeManagerApiWeb, :controller

  alias TimeManagerApi.Timemanager
  alias TimeManagerApi.Timemanager.Clock

  action_fallback TimeManagerApiWeb.FallbackController

  def index(conn, _params) do
    clocks = Timemanager.list_clocks()
    render(conn, "index.json", clocks: clocks)
  end

  def create(conn, %{"clock" => clock_params}) do
    with {:ok, %Clock{} = clock} <- Timemanager.create_clock(clock_params) do
      conn
      |> put_status(:created)
      # |> put_resp_header("location", Routes.clock_path(conn, :show, clock))
      |> render("show.json", clock: clock)
    end
  end

  def create_with_user_id(conn, %{"clock" => clock_params, "id" => user_id}) do
    with {:ok, %Clock{} = clock} <- Timemanager.create_clock(clock_params, user_id) do
      conn
      |> put_status(:created)
      |> render("show.json", clock: clock)
    end
  end

  def get_clock_with_user_id(conn, %{"id" => id}) do
    IO.puts("get_clock_with_user_id")
    clock = Timemanager.get_clock_user_id!(id)
    render(conn, "show.json", clock: clock)
  end

  def show(conn, %{"id" => id}) do
    clock = Timemanager.get_clock!(id)
    render(conn, "show.json", clock: clock)
  end

  def update(conn, %{"id" => id, "clock" => clock_params}) do
    clock = Timemanager.get_clock!(id)

    with {:ok, %Clock{} = clock} <- Timemanager.update_clock(clock, clock_params) do
      render(conn, "show.json", clock: clock)
    end
  end

  def delete(conn, %{"id" => id}) do
    clock = Timemanager.get_clock!(id)

    with {:ok, %Clock{}} <- Timemanager.delete_clock(clock) do
      send_resp(conn, :no_content, "")
    end
  end
end
