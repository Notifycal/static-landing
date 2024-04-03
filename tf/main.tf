resource "random_string" "resource_suffix" {
  length  = 5
  lower   = true
  upper   = false
  numeric = true
  special = false
}

module "static_landing" {
  source = "git@github.com:Notifycal/tofu-module-static-website.git?ref=v0.1.1"

  bucket_name = "notifycal-landing-page-${random_string.resource_suffix.result}"
}
