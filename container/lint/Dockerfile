FROM node:12.16.1-alpine

WORKDIR /usr/app

COPY ./package.json .
COPY ./yarn.lock .
COPY ./lerna.json .

RUN yarn

COPY . .

#SERVER
ENV SERVER_PORT="4000"

#CORS
ENV CORS=["http://localhost:3000"]

CMD ["yarn",  "lint"]
