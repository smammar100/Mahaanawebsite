terraform {
  required_version = ">= 1.5.0"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.111.0"
    }
    azuread = {
      source  = "hashicorp/azuread"
      version = "=2.19.1"
    }
  }

  backend "azurerm" {}
}

provider "azurerm" {
  features {}
}

data "azurerm_resource_group" "webapp" {
  name = var.resource_group_name
}

data "azurerm_service_plan" "linux" {
  name                = var.service_plan_name
  resource_group_name = data.azurerm_resource_group.webapp.name
}

data "azurerm_subnet" "app" {
  name                 = var.subnet_name
  virtual_network_name = var.virtual_network_name
  resource_group_name  = var.network_resource_group_name
}

data "azurerm_ip_group" "mahaana_ips" {
  name                = var.ip_group_name
  resource_group_name = var.ip_group_resource_group_name
}

data "azurerm_cdn_frontdoor_profile" "fd" {
  name                = var.frontdoor_profile_name
  resource_group_name = var.frontdoor_resource_group_name
}

# Next.js on Linux App Service — use Node startup, not static "serve -s".
resource "azurerm_linux_web_app" "webapp" {
  name                          = "${var.name_prefix}-mahaanaweb"
  location                      = var.location
  resource_group_name           = data.azurerm_resource_group.webapp.name
  service_plan_id               = data.azurerm_service_plan.linux.id
  virtual_network_subnet_id     = data.azurerm_subnet.app.id
  https_only                    = true
  public_network_access_enabled = true

  site_config {
    always_on              = true
    vnet_route_all_enabled = true
    app_command_line       = "rm -f /home/site/wwwroot/node_modules.tar.gz /home/site/wwwroot/oryx-manifest.toml 2>/dev/null; cd /home/site/wwwroot && node server.js"
    minimum_tls_version    = "1.2"


    application_stack {
      node_version = var.node_version
    }

    ip_restriction {
      name = "AllowFrontDoorRule"
      headers {
        x_azure_fdid = [data.azurerm_cdn_frontdoor_profile.fd.resource_guid]
      }
      service_tag = "AzureFrontDoor.Backend"
      priority    = 2
      action      = "Allow"
    }

    ip_restriction {
      name                      = "Vnet"
      virtual_network_subnet_id = data.azurerm_subnet.app.id
      priority                  = 3
      action                    = "Allow"
    }

    dynamic "ip_restriction" {
      for_each = tolist(data.azurerm_ip_group.mahaana_ips.cidrs)
      content {
        name        = "MahaanaIP-${ip_restriction.key}"
        ip_address  = ip_restriction.value
        priority    = 100 + ip_restriction.key
        action      = "Allow"
        description = "IP from MahaanaIPs IP Group"
      }
    }

    cors {
      allowed_origins = var.cors_allowed_origins
    }
  }

  app_settings = var.app_settings
}

output "linux_web_app_name" {
  value = azurerm_linux_web_app.webapp.name
}

output "linux_web_app_default_hostname" {
  value = azurerm_linux_web_app.webapp.default_hostname
}

output "linux_web_app_id" {
  value = azurerm_linux_web_app.webapp.id
}
