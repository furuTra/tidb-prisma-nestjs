FROM node:16.14.2-alpine3.15

RUN apk update && \
    apk add git

RUN npm i -g @nestjs/cli

WORKDIR /usr/src/app