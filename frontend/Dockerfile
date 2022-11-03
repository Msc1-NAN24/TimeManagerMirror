FROM node:latest

RUN npm install -g pnpm serve
COPY ./package.json /app/package.json
WORKDIR /app
RUN pnpm i
COPY . /app
RUN pnpm build

ARG PORT
EXPOSE ${PORT}
ENV WEB_PORT=${PORT}

CMD serve -s dist -p ${WEB_PORT}

# CMD pnpm run dev