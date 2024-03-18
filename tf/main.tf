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

resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.static_landing.id
  policy = jsonencode(
    {
      "Version" : "2012-10-17",
      "Statement" : [
        {
          "Sid" : "PublicReadGetObject",
          "Effect" : "Allow",
          "Principal" : "*",
          "Action" : "s3:GetObject",
          "Resource" : "arn:aws:s3:::${aws_s3_bucket.static_landing.id}/*"
        }
      ]
    }
  )
}
