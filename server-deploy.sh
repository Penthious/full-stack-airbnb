#! /bin/bash
yarn build:server
mv Dockerfile Dockerfile.dev
mv Dockerfile.server Dockerfile
yarn docker:build-server
yarn docker:push-server
ssh root@178.128.72.185 "docker pull penthious/airbnb-clone_server:latest && docker tag penthious/airbnb-clone_server:latest dokku/airbnb-server:latest && dokku tags:deploy airbnb-server latest"
mv Dockerfile Dockerfile.server
mv Dockerfile.dev Dockerfile