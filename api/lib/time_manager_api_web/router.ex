defmodule TimeManagerApiWeb.Router do
  use TimeManagerApiWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :employee do
    plug :required_authentication
  end

  pipeline :manager do
    plug :required_authentication
    plug :is_manager
  end

  pipeline :general_manager do
    plug :required_authentication
    plug :is_general_manager
  end

  scope "/api", TimeManagerApiWeb do
    pipe_through [:api, :employee]
    post "/clocks/:id", ClockController, :create_with_user_id
    get "/clocks/:id", ClockController, :get_clock_with_user_id
  end

  scope "/api/users", TimeManagerApiWeb do
    pipe_through [:api, :employee]

    get "/", UserController, :list
    get "/me", UserController, :get_me
    get "/:id", UserController, :get
    delete "/", UserController, :delete_me
    delete "/:id", UserController, :delete
    put "/", UserController, :update_me
    put "/:id", UserController, :update
    post "/:id/promote", UserController, :promote
    post "/:id/revoke", UserController, :revoke
  end

  scope "/api/auth", TimeManagerApiWeb do
    pipe_through [:api]

    post "/register", AuthController, :register
    post "/login", AuthController, :login
  end

  def is_manager(conn, _opts) do
    case conn.user.rank do
      :employee ->
        send_perm_error(conn, "You are not permitted to do this")
      _ ->
        conn
    end
  end

  def is_general_manager(conn, _opts) do
    case conn.user.rank do
      :general_manager ->
        conn
      _ ->
        send_perm_error(conn, "You are not permitted to do this")
    end
  end

  def required_authentication(conn, _opts) do
    auth = Enum.at(get_req_header(conn, "authorization"), 0)
    if is_nil(auth) do
      send_auth_error(conn, "Require auth token!")
    else
      with {:ok, data} <- TimeManagerApi.Auth.verify(auth) do
        with nil <- TimeManagerApi.Timemanager.get_user(data) do
          send_auth_error(conn, "Invalid auth token!")
        else user ->
          conn = Map.put_new(conn, :user, user);
          conn
        end
      else {:error, error} -> send_auth_error(conn, "Invalid auth token!")
      end
    end
  end

  def send_auth_error(conn, message) do
    conn
    |> put_status(:unauthorized)
    |> put_view(TimeManagerApiWeb.AuthView)
    |> render("auth_error.json", %{error: message})
    |> halt()
  end

  def send_perm_error(conn, message) do
    conn
    |> put_status(:forbidden)
    |> put_view(TimeManagerApiWeb.AuthView)
    |> render("auth_error.json", %{error: message})
    |> halt()
  end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through [:fetch_session, :protect_from_forgery]

      live_dashboard "/dashboard", metrics: TimeManagerApiWeb.Telemetry
    end
  end

  # Enables the Swoosh mailbox preview in development.
  #
  # Note that preview only shows emails that were sent by the same
  # node running the Phoenix server.
  if Mix.env() == :dev do
    scope "/dev" do
      pipe_through [:fetch_session, :protect_from_forgery]

      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end
end
