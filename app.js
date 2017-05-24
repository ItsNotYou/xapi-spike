define(['StatementCreator'], function (StatementCreator) {

    var App = function () {
        var creator = new StatementCreator();

        creator.addProviderIdentity("facebook", "hgessner");
        creator.addDeviceDetails("de-DE", ["+49-172-2781000"]);
    };

    return App;
});
