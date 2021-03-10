resource "aws_iam_instance_profile" "site_iam" {
  name = "site_iam"
  role = "ec2MinuBackend"
}

resource "aws_spot_instance_request" "site" {
    ami = "ami-03657b56516ab7912"
    instance_type = "t3.nano"
    iam_instance_profile = aws_iam_instance_profile.site_iam.name
    key_name = "Minu"
    wait_for_fulfillment=true
    
    network_interface {
      device_index = 0
      network_interface_id = "eni-032d3a88fca5dafd5"
    }

    user_data = "${file("bin/run.sh")}"

    tags = {
        Name = "MinuSite"
        product = "MinuSite"
    }
}

## ALB
module "alb" {
  source  = "terraform-aws-modules/alb/aws"
  version = "~> 5.0"
  name = "SiteLoadBalancer"
  load_balancer_type = "application"
  idle_timeout = 4000
  enable_deletion_protection = true

  vpc_id             = "vpc-072ecc0359799bc54"
  subnets            = ["subnet-05b41b8e24145cd84", "subnet-03219a27dd700040c"]
  security_groups    = ["sg-00f99ea6f4374b4b4"]

  target_groups = [
    {
      name_prefix      = "http-"
      backend_protocol = "HTTP"
      backend_port     = 443
      target_type      = "ip"
    }
  ]

  https_listeners = [
    {
      port               = 443
      protocol           = "HTTPS"
      certificate_arn    = "arn:aws:acm:us-east-2:108961151232:certificate/0167ea93-69dc-4910-b717-3df7c5244df0"
      target_group_index = 0
    }
  ]

  tags = {
    Name = "SiteLoadBalancer"
    name = "SiteLoadBalancer"
    Product = "SiteLoadBalancer"
  }
}

resource "aws_alb_target_group_attachment" "https_alb_target" {
  target_group_arn = module.alb.target_group_arns[0]
  target_id        = aws_spot_instance_request.site.private_ip
  port             = 443
}

resource "aws_route53_record" "backend_record" {
  zone_id = "Z02376092O1PJE98BKWAF"
  name    = "backend.seuminu.com"
  type    = "A"

  alias {
    name                   = module.alb.this_lb_dns_name
    zone_id                = module.alb.this_lb_zone_id
    evaluate_target_health = true
  }
}