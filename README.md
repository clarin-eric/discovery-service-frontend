* ![Build CI](https://github.com/clarin-eric/discovery-service-frontend/actions/workflows/node.js.yml/badge.svg)
* [Known Vulnerabilities](https://app.snyk.io/org/clarin-eric/project/159a68ce-6273-4239-a94b-b7afd4da242d)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

# Usage

There are two flavors of the generic pattern to access the discovery service:

1. Standard location with most common defaults
```
http(s)://<hostname>/?<query_parameters> 
```

2. Or using a custom feed
```
http(s)://<hostname>/feed/:idp_data_feed?<query_parameters>
```

## Supported Parameters

```
/feed/:idp_data_feed   (optional) Specify which idp feed to use. Supported values: 'clarin' 
                        or 'edugain', where 'clarin' is the default value if not provided. 
                        These feeds can be defined in the config.js file.
```

## Supported Query Parameters

```
entityId  (required) The entityID of the SP that called the discovery service. Must be in 
            url encoded form.
return    (required) The return URL to redirect the user to after selecting an IDP. 
            entityID=<value> will be appended to signal the user selected IDP. Must be in 
            url encoded form.
                      
            If a `uy_auto_login` query parameter is found the unity-idm auto login flow 
            is triggered and an extra query parameter (`uy_select_authn`) with the 
            entityID digest and index in unity-idm format is appended
debug     (optional) Used to override the configured debug setting. Accepts 'true' or 
            'false'. 
```

## Example

```
https://discovery.clarin.eu/idps_edugain.json?\
  entityID=https%3A%2F%2Fsp.vcr.clarin.eu&\
  return=https%3A%2F%2Fcollections.clarin.eu%2FShibboleth.sso%2FLogin%3FSAMLDS%3D1%26target%3Dss%253Amem%25123456789123456789
```

## Shibboleth SP Configuration

Example:

```
<!--
<SSO entityID="https://test-idp.clarin.eu">
  SAML2 SAML1
</SSO>
-->
<SSO discoveryProtocol="SAMLDS" discoveryURL="http://localhost:3000/">
    SAML2 SAML1
</SSO>
```

# Configuration

## config.js

```shell
var config = {
    "debug": false,                             //Show debug output in the browsers console
    "version": "{{VERSION}}",                   //Version shown in the UI, automatically set
    "image_version": "{{DOCKER_IMAGE_VERSION}}",//Version shown in the UI, automatically set
    "endpoints": {                              //List of endpoints, one should be marked as default.
        "clarin": { "url": "http://localhost:8080/idps/idps_clarin_prod.json", "default": false},
        "edugain": { "url": "http://localhost:8080/idps/idps_edugain.json", "default": true}
    },
    "user_registration_endpoint": "https://user.clarin.eu/user/register",
    "support_contact": "spf@clarin.eu",         //Email address used in the footer "Contact" link.
    "website": "https://www.clarin.eu",         //Link address used for the service provided by label in the footer.
    "website_label": "CLARIN",                  //Label shown with the "Serivce provided by <label>"  in the footer.
    "piwik_id": -1,                             //Piwik site id, use -1 to disable piwik integration
    "showMissingQueryParamWarning": true,       //Show a warning when accessing the page directly, i.e. not via the SP
    "showMissingQueryParamWarningModal": true,  //Show a modal warning when accessing the page directly, i.e. not via the SP.
    "headerUrl": "/"                            //Optional Link address to use for the title in the page header. Omit to disable link.
}
```

Each endpoint configured under "endpoints" is made available under `/feed/:endpoint`. So for the example above the following
feed paths would work and load their metadata from the respective urls:
* `/feed/clarin`
* `/feed/edugain`

# References

## Country flag icons

* https://www.flaticon.com/packs/countrys-flags?style_id=141&family_id=41&group_id=1&category_id=85
* Browser svg support: https://caniuse.com/#feat=svg
    
