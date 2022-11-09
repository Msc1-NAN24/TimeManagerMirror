defmodule TimeManagerApiWeb.StatusController do
  use TimeManagerApiWeb, :controller

  def status(conn, _params) do
    send_resp(conn, :ok, "")
  end

end