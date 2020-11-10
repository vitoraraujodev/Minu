FROM node:15.0.1-alpine3.11

WORKDIR /app

COPY backend/package.json /app/backend/package.json
RUN cd /app/backend && yarn

COPY backend/.env/ /app/backend/.env/
COPY backend/.sequelize-dev /app/backend/.sequelize-dev
COPY backend/.sequelize-prod /app/backend/.sequelize-prod
COPY backend/uploads/ /app/backend/uploads/
COPY backend/src/ /app/backend/src/

RUN cd /app/backend && yarn build
CMD cd /app/backend && yarn start