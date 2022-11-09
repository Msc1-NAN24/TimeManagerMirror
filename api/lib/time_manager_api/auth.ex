defmodule TimeManagerApi.Auth do
  @salt "hello_world"
  @token_age_secs 14 * 86_400
  alias TimeManagerApi.Timemanager.User

  def hash_password(password) do
    Bcrypt.Base.hash_password(password, Bcrypt.Base.gen_salt(12, true))
  end

  def sign(data) do
    Phoenix.Token.sign(TimeManagerApiWeb.Endpoint, @salt, data)
  end

  def verify(user, password) do
    Bcrypt.verify_pass(password, user.password)
  end

  def verify(data) do
    case Phoenix.Token.verify(TimeManagerApiWeb.Endpoint, @salt, data, max_age: @token_age_secs) do
      {:ok, data} -> {:ok, data}
      _error -> {:error, :unauthenticated}
    end
  end
end