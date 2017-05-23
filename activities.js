define(['ADL'], function (ADL) {

    var serviceProviders = {
        "facebook": "http://www.facebook.com/"
    };

    return {
        service: function (provider, identity) {
            if (!serviceProviders[provider]) {
                throw "Unsupported service provider";
            }

            var result = {
                "id": serviceProviders[provider],
                "definition": {
                    "name": {
                        "en-US": "service"
                    },
                    "description": {
                        "en-US": "Represents any form of hosted or consumable service that performs some kind of work or benefit for other entities. Examples of such objects include websites, businesses, etc."
                    },
                    "type": "http://activitystrea.ms/schema/1.0/service"
                },
                "objectType": "Activity"
            };

            if (identity) {
                result.definition.extensions = {
                    "http://id.tincanapi.com/extension/account": identity
                };
            }

            return result;
        }
    }
});
