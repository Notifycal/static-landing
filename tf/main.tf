resource "random_string" "resource_suffix" {
  length = 5
  lower = true
  upper = false
  numeric = true
  special = false
}

resource "aws_s3_bucket" "static_landing" {
  bucket = "notifycal-landing-page-${random_string.resource_suffix.result}"
}
