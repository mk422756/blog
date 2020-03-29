FROM node:12.16.1-alpine3.10

WORKDIR /app
COPY . /app

RUN npm install && \
  npm run build

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["npm","run","start"]