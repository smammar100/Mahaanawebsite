variable "name_prefix" {
  type        = string
  description = "Prefix for the Linux Web App name (<prefix>-frontend)."
  default     = "stg-mahaana-common"
}

variable "location" {
  type    = string
  default = "uaenorth"
}

variable "resource_group_name" {
  type        = string
  description = "Existing resource group that holds the App Service plan and where the Web App is created."
  default     = "mahaana-common-stg"
}

variable "service_plan_name" {
  type        = string
  description = "Existing Linux App Service plan name."
  default     = "stg-mahaana-common-linux-serviceplan"
}

variable "subnet_name" {
  type    = string
  default = "Equity-Manager-Subnet"
}

variable "virtual_network_name" {
  type    = string
  default = "stg-mahaana-wealth-vnet"
}

variable "network_resource_group_name" {
  type        = string
  description = "Resource group containing the VNet/subnet."
  default     = "mahaana-wealth-stg"
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
  default = "fdp-stg-mahaana"
}

variable "frontdoor_resource_group_name" {
  type    = string
  default = "rg-mahaana-networking"
}

variable "node_version" {
  type        = string
  description = "Linux App Service Node stack (match build agent / pipeline Node major)."
  default     = "20-lts"
}

variable "cors_allowed_origins" {
  type    = list(string)
  default = ["*"]
}

variable "app_settings" {
  type        = map(string)
  description = "App Service application settings (merge runtime env, SCM flags, etc.)."
  default = {
    "WEBSITE_NODE_DEFAULT_VERSION"              = "~20"
    "SCM_DO_BUILD_DURING_DEPLOYMENT"            = "false"
    "WEBSITES_ENABLE_APP_SERVICE_STORAGE"       = "false"
    "WEBSITE_SKIP_NODE_MODULES_TAR_COMPRESSION" = "1"
    "PORT"                                      = "8080"
    "NEXT_TELEMETRY_DISABLED"                   = "1"
  }
}
