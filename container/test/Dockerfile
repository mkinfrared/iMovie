FROM node:12.16.1-alpine

WORKDIR /usr/app

COPY ./package.json .
COPY ./yarn.lock .
COPY ./lerna.json .
COPY ./packages/common/package.json ./packages/common/package.json
COPY ./packages/server/package.json ./packages/server/package.json
COPY ./packages/web/package.json ./packages/web/package.json

RUN yarn
RUN yarn bootstrap

COPY . .

#SERVER
ENV SERVER_PORT="4000"

#CORS
ENV CORS=["http://localhost:3000"]

CMD ["yarn",  "test"]
