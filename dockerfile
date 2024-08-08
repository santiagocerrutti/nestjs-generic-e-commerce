FROM node:20.16-alpine

WORKDIR /app

COPY . .

RUN npm install -g npm@10
RUN npm install

CMD [ "npm", "start" ]

EXPOSE 8081