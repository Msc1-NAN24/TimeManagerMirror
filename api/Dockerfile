FROM elixir:latest

COPY . /app

WORKDIR /app

RUN mix local.hex --force
RUN mix local.rebar --force
RUN mix deps.get

ARG API_PORT
EXPOSE ${API_PORT}

CMD mix setup && mix phx.server
