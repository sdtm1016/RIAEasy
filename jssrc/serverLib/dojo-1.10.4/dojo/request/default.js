//>>built

define("dojo/request/default", ["exports", "require", "../has"], function (exports, require, has) {
    var defId = has("config-requestProvider"), platformId;
    if (0 || has("host-webworker")) {
        platformId = "./xhr";
    } else {
        if (0) {
            platformId = "./node";
        }
    }
    if (!defId) {
        defId = platformId;
    }
    exports.getPlatformDefaultId = function () {
        return platformId;
    };
    exports.load = function (id, parentRequire, loaded, config) {
        require([id == "platform" ? platformId : defId], function (provider) {
            loaded(provider);
        });
    };
});

