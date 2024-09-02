FROM node:22.7.0-alpine3.20

RUN mkdir -p /usr/src/app/backend/
RUN mkdir -p /usr/src/app/frontend/
WORKDIR /usr/src/app/

COPY package.json /usr/src/app/
RUN npm install

COPY ./backend/ /usr/src/app/backend/
COPY ./frontend/ /usr/src/app/frontend/

EXPOSE 80

CMD ["npm", "start"]
