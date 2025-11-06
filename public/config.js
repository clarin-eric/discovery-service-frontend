var config = {
    "debug": false,                             //Show debug output in the browsers console
    "version": "{{VERSION}}",                   //Version shown in the UI, automatically set
    "image_version": "{{DOCKER_IMAGE_VERSION}}",//Version shown in the UI, automatically set
    "endpoints": {                              //List of endpoints, one should be marked as default.
        "clarin": { "url": "http://localhost:8080/idps/idps_clarin_prod.json", "default": false},
        "edugain": { "url": "http://localhost:8080/idps/idps_edugain.json", "default": true}
        //"edugain": { "url": "/identity_providers_edugain.json", "default": false}
        //"clarin": { "url": "/identity_providers_clarin.json", "default": true},
        //"edugain": { "url": "/identity_providers_edugain.json", "default": false}
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