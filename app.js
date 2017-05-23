define(['ADL', 'activities', 'json!verbs.json'], function(ADL, activities, verbs) {

    var App = function() {
        var conf = {
            endpoint: "https://lrs.adlnet.gov/xAPI/",
            auth : "Basic " + toBase64('hgessner:nexplorer'),
            strictCallbacks: true
        };

        // create ADL config
        ADL.XAPIWrapper.changeConfig(conf);

        this.createStatements();
        console.log("Init finished");
    };

    App.prototype.createStatements = function() {
        var agent = new ADL.XAPIStatement.Agent(ADL.XAPIWrapper.hash('mailto:hgessner@uni-potsdam.de'), 'Hendrik Geßner');

        var stmt = new ADL.XAPIStatement(
            agent,
            verbs.loggedin,
            activities.service("facebook", "hgessner")
        );
        console.log(stmt);

        ADL.XAPIWrapper.sendStatement(stmt, function(err, res, body) {
            if (err) {
                console.error(err);
                return;
            }

            console.log("[" + body.id + "]: " + res.status + " - " + res.statusText);
            console.log(stmt.id);
        });

    };

    return App;
});
