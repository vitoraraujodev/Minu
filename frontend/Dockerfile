FROM node:15.0.1-alpine3.11

WORKDIR /app

COPY frontend/package.json /app/frontend/package.json
RUN cd /app/frontend && yarn

COPY frontend/public/ /app/frontend/public/
COPY frontend/jsconfig.json /app/frontend/jsconfig.json
COPY frontend/config-overrides.js /app/frontend/config-overrides.js
COPY frontend/src/ /app/frontend/src/

RUN cd /app/frontend && yarn build
CMD cd /app/frontend && yarn run serve