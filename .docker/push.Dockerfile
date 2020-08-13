FROM node:12.13.0-alpine as build

WORKDIR /app
COPY ./package.json /app/package.json

RUN npm install
RUN npm audit fix
COPY . /app

ENTRYPOINT ["npm", "start"]
