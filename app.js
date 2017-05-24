define(['StatementCreator'], function(StatementCreator) {

    var App = function() {
        var creator = new StatementCreator();

        creator.addProviderIdentity("facebook", "hgessner");
        creator.addDeviceLanguage("de-DE");
    };

    return App;
});
