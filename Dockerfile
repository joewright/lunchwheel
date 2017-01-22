FROM node:7.4

RUN mkdir -p /src/app

COPY package.json /src
WORKDIR /src
RUN npm install

COPY . /src/app
WORKDIR /src/app
CMD ['node', 'index.js']