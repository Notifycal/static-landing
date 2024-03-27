resource "random_string" "resource_suffix" {
  length = 5
  lower = true
  upper = false
  numeric = true
  special = false
}

module "static_landing" {
  source = "../../modules/tofu-module-static-website"

  bucket_name = "notifycal-landing-page-${random_string.resource_suffix.result}"
}
