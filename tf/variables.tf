variable "main_site_domain" {
  type = string
}

variable "enable_www_redirect" {
  type = string
  description = "When set to true, www. will redirect to the naked domain."
  default = true
}

variable "redirect_domains" {
  type = list(string)
  default = []
}
