variable "aws_region" {
  type = string
}

variable "project" {
  type = string
}

variable "stack" {
  type = string
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project = var.project
      Region = var.aws_region
      Managed-By = "Terragrunt"
      Stack = var.stack
    }
  }
}

terraform {
  backend "s3" {
    bucket         = "tofu-state-notifycal-r3h5d3gp"
    dynamodb_table = "tofu-lock-notifycal-r3h5d3gp"
    encrypt        = true
    key            = "static-landing/terraform.tfstate"
    region         = "eu-west-1"
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}
