output "main_bucket_name" {
  value = module.static_landing.bucket_names.main
}

output "bucket_names" {
  value = module.static_landing.bucket_names
}

output "site_urls" {
  value = module.static_landing.site_urls
}

# output "cloudflare_ips" {
#   value = data.cloudflare_ip_ranges.cloudflare.ipv4_cidr_blocks
# }
