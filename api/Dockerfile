FROM bitwalker/alpine-elixir-phoenix:latest

COPY docker-entrypoint.sh /docker-entrypoint.sh
COPY . /app

ARG API_PORT

EXPOSE ${API_PORT}

WORKDIR /app


ENTRYPOINT ["/docker-entrypoint.sh"]