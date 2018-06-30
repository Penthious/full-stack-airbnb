#! /bin/bash
yarn build:server
mv Dockerfile Dockerfile.dev
mv Dockerfile.prod Dockerfile
yarn docker:build
yarn docker:push
ssh root@178.128.72.185 "docker pull penthious/airbnb-clone:latest && docker tag penthious/airbnb-clone:latest dokku/airbnb:latest && dokku tags:deploy airbnb latest"