FROM node:19.7.0-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./


# Explicitly set npm cache directory
ENV NPM_CONFIG_CACHE=/home/node/app/.npm-cache

RUN npm install

COPY --chown=node:node . .
EXPOSE 3200
CMD [ "node", "app.js" ]