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
        device: function (languageCode, deviceUuid) {
            if (!languageCode) {
                throw "Language code required";
            }
            if (!deviceUuid) {
                throw "Device uuid required";
            }

            return {
                "id": "http://xapi.uni-potsdam.de/device/" + deviceUuid,
                "definition": {
                    "name": {
                        "en-US": "device "
                    },
                    "description": {
                        "en-US": "Represents a device of any sort."
                    },
                    "type": "http://activitystrea.ms/schema/1.0/device",
                    "extensions": {
                        "http://id.tincanapi.com/extension/language": languageCode
                    }
                },
                "objectType": "Activity"
            };
        }
    }
});
