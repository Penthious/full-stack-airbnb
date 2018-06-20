FROM node:10
WORKDIR /app

ENV NODE_ENV=develop
COPY package.json .
COPY yarn.lock .
COPY dist .

RUN yarn

CMD node dist/index.js
