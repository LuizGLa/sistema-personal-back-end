FROM node:16.13.0-alpine

WORKDIR /app

COPY . .

RUN npm i -g pm2

RUN npm i -g @nestjs/cli

RUN npm i --only=production --ignore-scripts

RUN npm run build

RUN npm uninstall typescript

EXPOSE 3001

CMD ["pm2-runtime", "ecosystem.config.js"]
