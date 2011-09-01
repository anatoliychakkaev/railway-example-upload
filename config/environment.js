var express    = require('express');
var form = require('connect-form-sync');

app.configure(function(){
    var cwd = process.cwd();
    app.use(express.static(cwd + '/public', {maxAge: 86400000}));
    app.set('views', cwd + '/app/views');
    app.set('view engine', 'ejs');
    app.set('jsDirectory', '/javascripts/');
    app.set('cssDirectory', '/stylesheets/');
    app.use(form({ keepExtensions: true })); // https://github.com/anatoliychakkaev/connect-form-sync
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({secret: 'secret'}));
    app.use(express.methodOverride());
    app.use(app.router);
});
