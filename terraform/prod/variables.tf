variable "name_prefix" {
  type        = string
  description = "Prefix for the Linux Web App name (<prefix>-frontend)."
  default     = "prod-mahaana-webapp"
}

variable "location" {
  type    = string
  default = "uaenorth"
}

variable "resource_group_name" {
  type        = string
  description = "Existing resource group for the Web App and App Service plan."
  default     = "mahaana-dfa-prod"
}

variable "service_plan_name" {
  type        = string
  description = "Existing Linux App Service plan name."
  default     = "prod-mahaana-dfa-linux-serviceplan"
}

variable "subnet_name" {
  type    = string
  default = "Equity-Manager-Subnet"
}

variable "virtual_network_name" {
  type    = string
  default = "prod-mahaana-wealth-vnet"
}

variable "network_resource_group_name" {
  type    = string
  default = "mahaana-wealth-prod"
}

variable "ip_group_name" {
  type    = string
  default = "MahaanaIPs"
}

variable "ip_group_resource_group_name" {
  type    = string
  default = "rg-mahaana-networking"
}

variable "frontdoor_profile_name" {
  type    = string
  default = "fdp-prod-mahaana"
}

variable "frontdoor_resource_group_name" {
  type    = string
  default = "rg-mahaana-networking"
}

variable "node_version" {
  type    = string
  default = "20-lts"
}

variable "cors_allowed_origins" {
  type    = list(string)
  default = ["*"]
}

variable "app_settings" {
  type        = map(string)
  description = "App Service application settings."
  default = {
    "WEBSITE_NODE_DEFAULT_VERSION"        = "~20"
    "SCM_DO_BUILD_DURING_DEPLOYMENT"      = "false"
    "WEBSITES_ENABLE_APP_SERVICE_STORAGE" = "false"
    "PORT"                                = "8080"
    "NEXT_TELEMETRY_DISABLED"             = "1"
  }
}
