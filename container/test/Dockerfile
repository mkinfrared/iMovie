ARG USERNAME
ARG PASSWORD

FROM node:12.16.1-alpine

WORKDIR /usr/app

RUN echo "building test image"
RUN echo "$DB_HOST_TEST"
RUN echo "$POSTGRES_DB"
RUN echo "$POSTGRES_USER"
RUN echo "$POSTGRES_HOST_AUTH_METHOD"

COPY ./package.json .
COPY ./yarn.lock .
COPY ./lerna.json .
COPY ./packages/common/package.json ./packages/common/package.json
COPY ./packages/server/package.json ./packages/server/package.json
COPY ./packages/web/package.json ./packages/web/package.json

RUN yarn
RUN yarn bootstrap

COPY . .

RUN yarn build:common

#SERVER
ENV SERVER_PORT="4000"

#CORS
ENV CORS=["http://localhost:3000"]

# DATABASE
ENV DB_HOST="db"
ENV DB_NAME="test"
ENV DB_USERNAME="test"
ENV DB_PASSWORD="test"

# TOKENS
ENV ACCESS_TOKEN_KEY="jimmy"
ENV REFRESH_TOKEN_KEY="timmy"
ENV EMAIL_TOKEN_KEY="kenny"

# REDIS
ENV REDIS_HOST="redis"

# EMAIL
ARG USERNAME
ARG PASSWORD
ENV EMAIL_USERNAME=$USERNAME
ENV EMAIL_PASSWORD=$PASSWORD

CMD ["yarn",  "test"]
