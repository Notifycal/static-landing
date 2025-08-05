output "main_bucket_name" {
  value = module.static_landing.bucket_names.main
}

output "bucket_names" {
  value = module.static_landing.bucket_names
}

output "site_urls" {
  value = "https://${local.domain}"
}

locals {
  _service_registration_url = "https://${local.domain}"
}
