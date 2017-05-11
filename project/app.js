
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var ibmdb = require('ibm_db');
require('cf-deployment-tracker-client').track();
var d3 = require("d3");

var app = express();
app.use(express.static(__dirname + '/public'));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

var db2;
var hasConnect = false;

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

if (process.env.VCAP_SERVICES) {
    var env = JSON.parse(process.env.VCAP_SERVICES);
	if (env['dashDB']) {
        hasConnect = true;
		db2 = env['dashDB'][0].credentials;
	}

}

if ( hasConnect == false ) {

   db2 = {
        db: "BLUDB",
        hostname: "dashdb-entry-yp-dal09-07.services.dal.bluemix.net",
        port: 50000,
        username: "dash11223",
        password: "WH7J@cers(3A"
     };
}

var connString = "DRIVER={DB2};DATABASE=" + db2.db + ";UID=" + db2.username + ";PWD=" + db2.password + ";HOSTNAME=" + db2.hostname + ";port=" + db2.port;



app.get('/', routes.listSysTables(ibmdb,connString));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
