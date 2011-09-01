exports.routes = function (map) {
    map.resources('files');
    map.root('files#index');
};
