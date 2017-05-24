define(['ADL', 'activities', 'json!verbs.json'], function(ADL, activities, verbs) {

    var StatementCreator = function() {
        // Init xAPI wrapper
        var conf = {
            endpoint: "https://lrs.adlnet.gov/xAPI/",
            auth : "Basic " + toBase64('hgessner:nexplorer'),
            strictCallbacks: true
        };
        ADL.XAPIWrapper.changeConfig(conf);

        // Init user agent
        this._agent = new ADL.XAPIStatement.Agent(ADL.XAPIWrapper.hash('mailto:hgessner@uni-potsdam.de'), 'Hendrik Geßner');
    };

    /**
     *
     * @param provider "mail", "facebook" etc., must be known
     * @param identity user name at the given provider
     */
    StatementCreator.prototype.addProviderIdentity = function(provider, identity) {
        var stmt = new ADL.XAPIStatement(
            this._agent,
            verbs.loggedin,
            activities.service(provider, identity)
        );

        ADL.XAPIWrapper.sendStatement(stmt, function(err, res, body) {
            if (err) {
                console.error(err);
                return;
            }

            console.log("[" + body.id + "]: " + res.status + " - " + res.statusText);
        });
    };

    return StatementCreator;
});
