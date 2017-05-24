define(['ADL', 'activities', 'json!verbs.json'], function (ADL, activities, verbs) {

    var StatementCreator = function () {
        // Init xAPI wrapper
        var conf = {
            endpoint: "https://lrs.adlnet.gov/xAPI/",
            auth: "Basic " + toBase64('hgessner:nexplorer'),
            strictCallbacks: true
        };
        ADL.XAPIWrapper.changeConfig(conf);

        // Init user agent
        this._agent = new ADL.XAPIStatement.Agent(ADL.XAPIWrapper.hash('mailto:hgessner@uni-potsdam.de'), 'Hendrik Geßner');
    };

    /**
     *
     * @param {string} provider "mail", "facebook" etc., must be known
     * @param {string} identity user name at the given provider
     */
    StatementCreator.prototype.addProviderIdentity = function (provider, identity) {
        var stmt = new ADL.XAPIStatement(
            this._agent,
            verbs.loggedin,
            activities.service(provider, identity)
        );

        ADL.XAPIWrapper.sendStatement(stmt, function (err, res, body) {
            if (err) {
                console.error(err);
                return;
            }

            console.log("[" + body.id + "]: " + res.status + " - " + res.statusText);
        });
    };

    /**
     *
     * @param {string} languageCode short form, e.g. "en-US" or "de-DE"
     * @param {string[]} phoneNumbers device phone numbers
     */
    StatementCreator.prototype.addDeviceDetails = function (languageCode, phoneNumbers) {
        var extensions = {
            languageCode: languageCode,
            phoneNumbers: phoneNumbers
        };

        var stmt = new ADL.XAPIStatement(
            this._agent,
            verbs.used,
            activities.device("0c0299eb-42f6-4f1c-96a5-13201683c825", extensions)
        );

        ADL.XAPIWrapper.sendStatement(stmt, function (err, res, body) {
            if (err) {
                console.error(err);
                return;
            }

            console.log("[" + body.id + "]: " + res.status + " - " + res.statusText);
        });
    };

    /**
     *
     * @param location current user location
     * @param {number} location.latitude latitude
     * @param {number} location.longitude longitude
     */
    StatementCreator.prototype.addUserLocation = function (location) {
        var stmt = new ADL.XAPIStatement(
            this._agent,
            verbs.wasat,
            activities.place(location)
        );

        ADL.XAPIWrapper.sendStatement(stmt, function (err, res, body) {
            if (err) {
                console.error(err);
                return;
            }

            console.log("[" + body.id + "]: " + res.status + " - " + res.statusText);
        });
    };

    return StatementCreator;
});
