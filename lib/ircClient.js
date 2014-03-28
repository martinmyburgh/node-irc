var irc = require('./irc.js');
var ident = require('./ident.js');
ident.init();//start ident server.
ident.init();
module.exports.Client = Client;
module.exports.colors = irc.colors;
var serverClient = {};
function Client(server, nick, opt) {
	var client = new irc.Client(server, nick, opt);

	if(opt.identId) {
		client.conn.on("connect",function() {
			ident.register(this.address().port, this.remotePort, opt.identId);
		});

		client.conn.on("disconnect", function() {
			ident.remove(this.address().port,this.remotePort);
		});
	}
	return client;
}
