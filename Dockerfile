FROM node:10

WORKDIR /app
ENV NODE_ENV development

COPY package.json /app/package.json

RUN npm install

# COPY .env.example /app/.env.example
COPY . /app

CMD ["npm","start"]

EXPOSE 8080