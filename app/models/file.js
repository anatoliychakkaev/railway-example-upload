var fs = require('fs');

function File(name) {
    this.id = this.name = name;
}

File.find = function (cb) {
    var files = [];
    fs.readdir(app.root + '/data', function (err, fileNames) {
        fileNames.forEach(function (file) {
            files.push(new File(file));
        });
        cb(err, files);
    });
};

File.findById = function (id, cb) {
    cb(null, new File(id));
};

File.prototype.remove = function (cb) {
    fs.unlink(this.filename(), cb);
};

File.prototype.filename = function () {
    return app.root + '/data/' + this.name;
};

File.prototype.upload = function (name, path, cb) {
    this.name = name;
    fs.rename(path, this.filename(), cb);
};

File.prototype.rename = function (name, cb) {
    var oldPath = this.filename();
    this.name = name;
    fs.rename(oldPath, this.filename(), cb);
};

module.exports = File