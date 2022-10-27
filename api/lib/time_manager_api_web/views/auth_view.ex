defmodule TimeManagerApiWeb.AuthView do
  use TimeManagerApiWeb, :view
  alias TimeManagerApiWeb.AuthView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, AuthView, "auth.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, AuthView, "auth.json")}
  end

  def render("auth.json", %{user: user}) do
    %{
      id: user.id,
      username: user.username,
      email: user.email
    }
  end

  def render("auth_error.json", %{error: error}) do
    %{
      error: error,
    }
  end

  def render("token.json", %{token: token, user: user}) do
    %{
      access_token: token,
      user: %{
        id: user.id,
        username: user.username,
        email: user.email
      }
    }
  end
end