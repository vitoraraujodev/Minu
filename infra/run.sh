#! /bin/bash
sudo yum update -y # && sudo yum install -y gcc openssl-devel bzip2-devel libffi-devel
sudo amazon-linux-extras install -y docker
sudo yum install -y docker
sudo service docker start
sudo usermod -a -G docker ec2-user
sudo docker login -u AWS -p `aws ecr get-login-password --region us-east-2` 108961151232.dkr.ecr.us-east-2.amazonaws.com
sudo docker pull 108961151232.dkr.ecr.us-east-2.amazonaws.com/minu/site/backend:latest
sudo docker pull 108961151232.dkr.ecr.us-east-2.amazonaws.com/minu/site/frontend:latest

sudo docker run --restart always -it -d -p 3333:3333 -e NODE_ENV=production \
    108961151232.dkr.ecr.us-east-2.amazonaws.com/minu/site/backend:latest
sudo docker run --restart always -it -d -p 3000:3000 -p 80:3000 \
    108961151232.dkr.ecr.us-east-2.amazonaws.com/minu/site/frontend:latest