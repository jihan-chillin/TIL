FROM node:22

WORKDIR /app

COPY package.json /app

COPY . /app

RUN npm install

EXPOSE 80

CMD ["node", "server.js"]