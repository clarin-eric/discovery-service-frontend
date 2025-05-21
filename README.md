* ![Build CI](https://github.com/clarin-eric/discovery-service-frontend/actions/workflows/node.js.yml/badge.svg)
* [Known Vulnerabilities](https://app.snyk.io/org/clarin-eric/project/159a68ce-6273-4239-a94b-b7afd4da242d)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Query Parameters

```
entityId  (required) The entityID of the SP that called the discovery service
return    (required) The return URL to redirect the user to after selecting an IDP. entityID=<value> will be appended
                      to signal the user selected IDP.
                      
                      If a `uy_auto_login` query parameter is found the unity-idm auto login flow is triggered and an 
                      extra query parameter (`uy_select_authn`) with the entityID digest and index in unity-idm format
                      is appended
debug     (optional) Used to override the configured debug setting. Accepts 'true' or 'false'. 
```

## Country flag icons

https://www.flaticon.com/packs/countrys-flags?style_id=141&family_id=41&group_id=1&category_id=85

Browser svg support: https://caniuse.com/#feat=svg
    
## Example

```
<!--
<SSO entityID="https://test-idp.clarin.eu">
  SAML2 SAML1
</SSO>
-->
<SSO discoveryProtocol="SAMLDS" discoveryURL="http://localhost:3000/">
    SAML2 SAML1
</SSO>