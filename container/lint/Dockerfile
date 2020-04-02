FROM node:12.16.1-alpine

WORKDIR /usr/app

RUN echo "building lint image"
RUN echo "$DB_HOST_TEST"

COPY ./package.json .
COPY ./yarn.lock .
COPY ./lerna.json .

RUN yarn

COPY . .

CMD ["yarn",  "lint"]
