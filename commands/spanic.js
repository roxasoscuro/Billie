const MongoClient = require('mongodb').MongoClient;
const config = require("../config.js");
const DB = config.DB;
const DEV = config.DEV;
module.exports = {
	name: 'spanic',
	description: 'set panic!',
	execute(msg, args) {
		const MONGO = config.MONGO;
		if(msg.member.id==DEV){
			if (!args || args == "") {
				msg.channel.send("I need an url");
			}	
			else{
				MongoClient.connect(MONGO, function(err, db) {
					if (err) throw err;
					var dbo = db.db(DB);
					var myobj = { url:args };
					dbo.createCollection("panic", function(err, res) {
						if (err) {
						}
						if(typeof res !== 'undefined'){

							dbo.collection("panic").insertOne(myobj, function(err, res) {
								if (err) throw err;
								msg.channel.send("1 panic inserted");
								db.close();
							});
						}
						db.close();
					});
				});
			}
		}
		else{
			msg.channel.send("You dont have permission");
		}
		msg.delete();
	},
};