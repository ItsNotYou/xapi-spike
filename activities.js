define(['ADL'], function (ADL) {

    var serviceProviders = {
        "facebook": "http://www.facebook.com/"
    };

    return {
        service: function (provider, identity) {
            if (!serviceProviders[provider]) {
                throw "Unsupported service provider";
            }
            if (!identity) {
                throw "Identity required";
            }

            return {
                "id": serviceProviders[provider],
                "definition": {
                    "name": {
                        "en-US": "service"
                    },
                    "description": {
                        "en-US": "Represents any form of hosted or consumable service that performs some kind of work or benefit for other entities. Examples of such objects include websites, businesses, etc."
                    },
                    "type": "http://activitystrea.ms/schema/1.0/service",
                    "extensions": {
                        "http://id.tincanapi.com/extension/account": identity
                    }
                },
                "objectType": "Activity"
            };
        },
        device: function (deviceUuid, extensions) {
            extensions = extensions || {};

            if (!deviceUuid) {
                throw "Device uuid required";
            }

            var result = {
                "id": "http://xapi.uni-potsdam.de/device/" + deviceUuid,
                "definition": {
                    "name": {
                        "en-US": "device "
                    },
                    "description": {
                        "en-US": "Represents a device of any sort."
                    },
                    "type": "http://activitystrea.ms/schema/1.0/device",
                    "extensions": {}
                },
                "objectType": "Activity"
            };

            if (extensions.languageCode) {
                result.definition.extensions["http://id.tincanapi.com/extension/language"] = extensions.languageCode;
            }

            if (extensions.phoneNumbers) {
                result.definition.extensions["http://id.tincanapi.com/extension/phonenumbers"] = extensions.phoneNumbers;
            }

            return result;
        }
    }
});
