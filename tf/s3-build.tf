locals {
  build_folder = "dist"
}

resource "aws_s3_object" "dist" {
  for_each = fileset(local.build_folder, "**")

  bucket = module.static_landing.bucket_name
  key    = each.key
  source = "${local.build_folder}/${each.value}"
  etag   = filemd5("${local.build_folder}/${each.value}")
}
