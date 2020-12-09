resource "aws_iam_instance_profile" "backend_iam" {
  name = "backend_iam"
  role = "ec2MinuBackend"
}

resource "aws_instance" "backend" {
    ami = "ami-03657b56516ab7912"
    instance_type = "t3a.small"
    iam_instance_profile = aws_iam_instance_profile.backend_iam.name
    key_name = "Minu"
    
    network_interface {
      device_index = 0
      network_interface_id = "eni-032d3a88fca5dafd5"
    }

    user_data = <<-EOF
    #! /bin/bash
    sudo yum update -y # && sudo yum install -y gcc openssl-devel bzip2-devel libffi-devel
    sudo amazon-linux-extras install -y docker
    sudo yum install -y docker
    sudo service docker start
    sudo usermod -a -G docker ec2-user
    docker login -u AWS -p `aws ecr get-login-password --region us-east-2` 108961151232.dkr.ecr.us-east-2.amazonaws.com
    docker pull 108961151232.dkr.ecr.us-east-2.amazonaws.com/minu/site/backend:latest

    docker run -p 3333:3333 108961151232.dkr.ecr.us-east-2.amazonaws.com/minu/site/backend:latest
  EOF

    tags = {
        Name = "MinuBackend"
        product = "MinuBackend"
    }
}