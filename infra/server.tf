resource "aws_iam_instance_profile" "site_iam" {
  name = "site_iam"
  role = "ec2MinuBackend"
}

resource "aws_instance" "site" {
    ami = "ami-03657b56516ab7912"
    instance_type = "t3a.medium"
    iam_instance_profile = aws_iam_instance_profile.site_iam.name
    key_name = "Minu"
    
    network_interface {
      device_index = 0
      network_interface_id = "eni-032d3a88fca5dafd5"
    }

    user_data = "${file("run.sh")}"

    tags = {
        Name = "MinuSite"
        product = "MinuSite"
    }
}