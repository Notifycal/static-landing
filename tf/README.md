<!-- BEGIN_TF_DOCS -->
## Requirements

| Name | Version |
|------|---------|
| <a name="requirement_terraform"></a> [terraform](#requirement\_terraform) | >= 1.5 |
| <a name="requirement_aws"></a> [aws](#requirement\_aws) | ~> 5.0 |

## Providers

| Name | Version |
|------|---------|
| <a name="provider_random"></a> [random](#provider\_random) | n/a |

## Modules

| Name | Source | Version |
|------|--------|---------|
| <a name="module_static_landing"></a> [static\_landing](#module\_static\_landing) | git@github.com:Notifycal/tofu-module-static-website.git | v0.1.1 |

## Resources

| Name | Type |
|------|------|
| [random_string.resource_suffix](https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/string) | resource |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_bucket_name"></a> [bucket\_name](#output\_bucket\_name) | n/a |
| <a name="output_site_url"></a> [site\_url](#output\_site\_url) | n/a |
<!-- END_TF_DOCS -->