FROM node

WORKDIR /airbnb

COPY ./wait-for-conn.sh .
COPY ./package.json .
COPY ./packages/server/package.json ./packages/server/
COPY ./packages/common/package.json ./packages/common/

RUN yarn --production

COPY ./packages/server/dist ./packages/server/dist
COPY ./packages/server/.env-production ./packages/server

COPY ./packages/common/dist ./packages/common/dist

WORKDIR ./packages/server
RUN cat .env-production

ENV NODE_ENV=production

EXPOSE 4000

