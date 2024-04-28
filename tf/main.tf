module "static_landing" {
  source = "git@github.com:Notifycal/tofu-module-static-website.git?ref=v1.0.1"

  bucket_name = var.main_site_domain
  
  enable_s3_public_access = false
  enable_www_redirect = true
}
