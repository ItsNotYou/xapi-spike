define(['StatementCreator'], function(StatementCreator) {

    var App = function() {
        var creator = new StatementCreator();

        creator.addProviderIdentity("facebook", "hgessner");
    };

    return App;
});
