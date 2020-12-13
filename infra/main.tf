provider "aws" {
  region = "us-east-2"
}

terraform {
  backend "s3" {
    bucket = "minu-general"
    key    = "minu_site/terraform_status.tfstate"
    region = "us-east-2"
  }
}