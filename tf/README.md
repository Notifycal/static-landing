<!-- BEGIN_TF_DOCS -->
## Requirements

| Name | Version |
|------|---------|
| <a name="requirement_terraform"></a> [terraform](#requirement\_terraform) | >= 1.5 |
| <a name="requirement_aws"></a> [aws](#requirement\_aws) | ~> 5.0 |

## Providers

| Name | Version |
|------|---------|
| <a name="provider_aws"></a> [aws](#provider\_aws) | 5.46.0 |

## Modules

| Name | Source | Version |
|------|--------|---------|
| <a name="module_static_landing"></a> [static\_landing](#module\_static\_landing) | git@github.com:Notifycal/tofu-module-static-website.git | v0.1.1 |

## Resources

| Name | Type |
|------|------|
| [aws_s3_object.dist](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_object) | resource |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_bucket_name"></a> [bucket\_name](#input\_bucket\_name) | n/a | `string` | n/a | yes |
| <a name="input_upload_dist_to_s3"></a> [upload\_dist\_to\_s3](#input\_upload\_dist\_to\_s3) | n/a | `bool` | `true` | no |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_bucket_name"></a> [bucket\_name](#output\_bucket\_name) | n/a |
| <a name="output_site_url"></a> [site\_url](#output\_site\_url) | n/a |
<!-- END_TF_DOCS -->