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

resource "aws_s3_bucket_website_configuration" "this" {
  bucket = aws_s3_bucket.static_landing.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "404.html"
  }
}

resource "aws_s3_bucket_public_access_block" "public_access" {
  bucket = aws_s3_bucket.static_landing.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

data "aws_iam_policy_document" "bucket_policydoc" {
  statement {
    sid = "PublicReadGetObject"

    principals {
      type = "*"
      identifiers = ["*"]
    }
    
    actions = ["s3:GetObject"]

    resources = [
      "${aws_s3_bucket.static_landing.arn}/*",
    ]
  }
}

resource "aws_s3_bucket_policy" "website_bucket_policy" {
  bucket = aws_s3_bucket.static_landing.id
  policy = data.aws_iam_policy_document.bucket_policydoc.json
}
