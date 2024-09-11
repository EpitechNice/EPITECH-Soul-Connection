FROM node:22.7.0

ENV CI=true

RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/

COPY package.json /usr/src/app/
RUN npm install

COPY ./public/ /usr/src/app/public/
COPY ./src/ /usr/src/app/src/
COPY .env/ /usr/src/app/

EXPOSE 80

CMD [ "npm", "start" ]