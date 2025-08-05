output "main_bucket_name" {
  value = module.static_landing.bucket_names.main
}

output "bucket_names" {
  value = module.static_landing.bucket_names
}

output "site_url" {
  value = "https://${local.domain}"
}
