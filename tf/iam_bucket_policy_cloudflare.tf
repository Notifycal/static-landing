# data "cloudflare_ip_ranges" "cloudflare" {}

locals {
  cloudflare_ips = [
    "173.245.48.0/20",
    "103.21.244.0/22",
    "103.22.200.0/22",
    "103.31.4.0/22",
    "141.101.64.0/18",
    "108.162.192.0/18",
    "190.93.240.0/20",
    "188.114.96.0/20",
    "197.234.240.0/22",
    "198.41.128.0/17",
    "162.158.0.0/15",
    "104.16.0.0/13",
    "104.24.0.0/14",
    "172.64.0.0/13",
    "131.0.72.0/22",
  ]
}

data "aws_iam_policy_document" "cloudflare_access" {
  for_each = module.static_landing.bucket_names

  statement {
    sid    = "CloudflareAccess"
    effect = "Allow"

    principals {
      type        = "*"
      identifiers = ["*"]
    }

    actions = ["s3:GetObject"]

    resources = [
      "arn:aws:s3:::${each.value}/*",
    ]

    condition {
      test     = "IpAddress"
      variable = "aws:SourceIp"

      values = local.cloudflare_ips
    }
  }
}

resource "aws_s3_bucket_policy" "cloudflare_access" {
  for_each = module.static_landing.bucket_names

  bucket = each.value
  policy = data.aws_iam_policy_document.cloudflare_access[each.key].json
}
