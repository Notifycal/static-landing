module "static_landing" {
  source = "git@github.com:Notifycal/tofu-module-static-website.git?ref=v0.1.1"

  bucket_name = var.bucket_name
}
