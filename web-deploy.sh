#! /bin/bash
yarn build:web
mv Dockerfile Dockerfile.dev
mv Dockerfile.web Dockerfile
yarn docker:build-web
yarn docker:push-web
ssh root@178.128.72.185 "docker pull penthious/airbnb-clone_web:latest && docker tag penthious/airbnb-clone_web:latest dokku/airbnb:latest && dokku tags:deploy airbnb latest"
mv Dockerfile Dockerfile.web
mv Dockerfile.dev Dockerfile