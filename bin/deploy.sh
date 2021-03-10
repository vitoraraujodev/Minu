#!/bin/bash
cd $(git rev-parse --show-toplevel)

# Backend
# Build images
docker build -f ./backend/Dockerfile \
    -t 108961151232.dkr.ecr.us-east-2.amazonaws.com/minu/site/backend:$(git rev-parse --short HEAD) \
    -t 108961151232.dkr.ecr.us-east-2.amazonaws.com/minu/site/backend:latest .
# Push images
docker login -u AWS -p `aws ecr get-login-password --region us-east-2` 108961151232.dkr.ecr.us-east-2.amazonaws.com
docker push 108961151232.dkr.ecr.us-east-2.amazonaws.com/minu/site/backend:$(git rev-parse --short HEAD)
docker push 108961151232.dkr.ecr.us-east-2.amazonaws.com/minu/site/backend:latest

# Frontend
cd $(git rev-parse --show-toplevel)/frontend
yarn run build
aws s3 cp --recursive ./build s3://minu-site-deployment/

# Apply database migrations
cd $(git rev-parse --show-toplevel)/backend
DB_HOST=$(grep DB_HOST .env | cut -d '=' -f2)
DB_NAME=$(grep DB_NAME .env | cut -d '=' -f2)
DB_USERNAME=$(grep DB_USERNAME .env | cut -d '=' -f2)
DB_PASSWORD=$(grep DB_PASSWORD .env | cut -d '=' -f2)
yarn sequelize --url postgres://"$DB_USERNAME":"$DB_PASSWORD"@"$DB_HOST"/"$DB_NAME" \
    --options-path ./.sequelize-prod db:migrate

# Update infra
cd $(git rev-parse --show-toplevel)/infra
terraform destroy --auto-approve
terraform apply --auto-approve