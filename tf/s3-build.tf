locals {
  build_folder = "${path.module}/../dist"
}

resource "aws_s3_object" "dist" {
  for_each = var.upload_dist_to_s3 ? fileset(local.build_folder, "**") : []

  bucket = module.static_landing.bucket_name
  key    = each.key
  source = "${local.build_folder}/${each.value}"
  etag   = filemd5("${local.build_folder}/${each.value}")
}
