var config = {
    "debug": false,
    "version": "{{VERSION}}",
    "image_version": "{{DOCKER_IMAGE_VERSION}}",
    "endpoints": {
        "clarin": { "url": "http://localhost:8080/idps/idps_clarin_prod.json", "default": false},
        "edugain": { "url": "http://localhost:8080/idps/idps_edugain.json", "default": true}
        //"edugain": { "url": "/identity_providers_edugain.json", "default": false}
        //"clarin": { "url": "/identity_providers_clarin.json", "default": true},
        //"edugain": { "url": "/identity_providers_edugain.json", "default": false}
    },
    "user_registration_endpoint": "https://user.clarin.eu/user/register",
    "support_contact": "spf@clarin.eu",
    "website": "https://www.clarin.eu",
    "piwik_id": -1,
    "showMissingQueryParamWarning": true,
    "showMissingQueryParamWarningModal": true,
    "headerUrl": "/"
}