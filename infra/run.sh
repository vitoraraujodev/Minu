#! /bin/bash
sudo yum update -y # && sudo yum install -y gcc openssl-devel bzip2-devel libffi-devel
sudo amazon-linux-extras install -y docker
sudo yum install -y docker
sudo service docker start
sudo usermod -a -G docker ec2-user
docker login -u AWS -p `aws ecr get-login-password --region us-east-2` 108961151232.dkr.ecr.us-east-2.amazonaws.com
docker pull 108961151232.dkr.ecr.us-east-2.amazonaws.com/minu/site/backend:latest
docker pull 108961151232.dkr.ecr.us-east-2.amazonaws.com/minu/site/frontend:latest

docker run -it -d --rm -p 3333:3333 -e NODE_ENV=production \
    108961151232.dkr.ecr.us-east-2.amazonaws.com/minu/site/backend:latest
docker run -it -d --rm -p 3000:3000 -p 80:3000 \
    108961151232.dkr.ecr.us-east-2.amazonaws.com/minu/site/frontend:latest