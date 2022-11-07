FROM elixir:latest

COPY . /app

WORKDIR /app
ARG MIX_ENV=dev

RUN mix local.hex --force
RUN mix local.rebar --force
RUN mix deps.get

EXPOSE ${API_PORT}

ENTRYPOINT [ "sh", "./entrypoint.sh" ]
