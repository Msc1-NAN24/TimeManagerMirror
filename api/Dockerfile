FROM elixir:latest

COPY . /app

WORKDIR /app
ARG MIX_ENV=dev

RUN mix local.hex --force
RUN mix local.rebar --force
RUN mix deps.get
Run mix ecto.create
RUN mix ecto.migrate
EXPOSE ${API_PORT}

CMD mix phx.server
