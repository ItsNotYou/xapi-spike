require.config({
    paths: {
        'jquery': 'lib/jquery',
        'underscore': 'lib/underscore-min',
        'underscore.string': 'lib/underscore.string.min',
        'backbone': 'lib/backbone-min',
        'backboneMVC': 'lib/backbone-mvc',
        'uri': 'lib/src',
        // App specific dependencies
        'ADL': 'lib/xapiwrapper.min',
        // RequireJS plugins
        text: 'lib/require/text',
        async: 'lib/require/async',
        font: 'lib/require/font',
        goog: 'lib/require/goog',
        image: 'lib/require/image',
        json: 'lib/require/json',
        noext: 'lib/require/noext',
        mdown: 'lib/require/mdown',
        propertyParser: 'lib/require/propertyParser',
        markdownConverter: 'lib/require/Markdown.Converter'
    },
    shim: {
        'ADL': {
            exports: 'ADL'
        }
    }
});

require(['app'], function (App) {
    new App();
});
