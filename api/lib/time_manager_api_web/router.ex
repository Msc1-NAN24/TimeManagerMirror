defmodule TimeManagerApiWeb.Router do
  use TimeManagerApiWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :authorize do
    plug :required_authentication
  end

  scope "/api", TimeManagerApiWeb do
    pipe_through :api
    post "/clocks/:id", ClockController, :create_with_user_id
    get "/clocks/:id", ClockController, :get_clock_with_user_id
    get "/users/me", AuthController, :me
    resources "/users", UserController, except: [:new, :edit]
  end

  scope "/api/auth", TimeManagerApiWeb do
    pipe_through [:api]

    post "/register", AuthController, :register
    post "/login", AuthController, :login
  end

  def required_authentication(conn, _opts) do
    auth = Enum.at(get_req_header(conn, "authorization"), 0)
    if is_nil(auth) do
      conn
      |> put_status(:unauthorized)
      |> put_view(TimeManagerApiWeb.AuthView)
      |> render("auth_error.json", %{error: "Require auth token !"})
      |> halt()
    else
      with {:ok, data} <- TimeManagerApi.Auth.verify(auth) do
        user = TimeManagerApi.Timemanager.get_user!(data)
        conn = Map.put_new(conn, :user, user);
        conn
      else {:error, error} ->
        conn
        |> put_status(:unauthorized)
        |> put_view(TimeManagerApiWeb.AuthView)
        |> render("auth_error.json", %{error: "Invalid auth token !"})
        |> halt()
      end
    end
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
