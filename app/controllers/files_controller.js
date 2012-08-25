load('application');

before(loadFile, {only: ['create', 'show', 'edit', 'update', 'destroy']});

action('new', function () {
    this.file = new File;
    this.title = 'New file';
    render();
});

action('create', function () {
    this.file = new File();
    var tmpFile = req.files.file;
    this.file.upload(tmpFile.name, tmpFile.path, function (err) {
        if (err) {
            console.log(err);
            this.title = 'New file';
            flash('error', 'File can not be created');
            render('new');
        } else {
            flash('info', 'File created');
            redirect(path_to.files);
        }
    }.bind(this));
});

action('index', function () {
    File.find(function (err, files) {
        if (err) {
            send(err);
        }
        else {
            this.files = files;
            this.title = 'Files index';
            render();
        }
    }.bind(this));
});

action('show', function () {
    this.title = 'File show';
    render();
});

action('edit', function () {
    this.title = 'File edit';
    render();
});

action('update', function () {
    this.file.rename(req.body.name, function (err) {
        if (!err) {
            flash('info', 'File updated');
            redirect(path_to.file(this.file));
        } else {
            this.title = 'Edit file details';
            flash('error', 'File can not be updated');
            console.log(err);
            render('edit');
        }
    }.bind(this));
});

action('destroy', function () {
    this.file.remove(function (error) {
        if (error) {
            flash('error', 'Can not destroy file');
        } else {
            flash('info', 'File successfully removed');
        }
        send("'" + path_to.files + "'");
    });
});

function loadFile () {
    File.findById(req.params.id + (req.params.format ? '.' + req.params.format : ''), function (err, file) {
        if (err || !file) {
            redirect(path_to.files);
        } else {
            this.file = file;
            next();
        }
    }.bind(this));
}
