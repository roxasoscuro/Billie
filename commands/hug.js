const Discord = require('discord.js');
const MongoClient = require('mongodb').MongoClient;
const config = require("../config.js");
module.exports = {
  	name: 'hug',
  	description: 'hug!',
  	execute(msg, args) {
		const MONGO = config.MONGO;
	  	if (!msg.mentions.users.size) {
			msg.channel.send("Find someone :(");
		}	
		else if {
			MongoClient.connect(MONGO, function(err, db) {
	  			if (err) throw err;
	  			var dbo = db.db("billie");
	  			const userlist = msg.mentions.users.map(user => {
	  				const userb = user.tag;
					var query = { user: userb };
					dbo.collection("whitelist").find(query).toArray(function(err, result) {
						if (err) throw err;
							return msg.channel.send("Dont bother him/her...");
	  				}); 
					db.close();
					msg.delete();
				});
			});
		}
		else{
			MongoClient.connect(MONGO, function(err, db) {
	  			if (err) throw err;
	  			var dbo = db.db("billie");
	  			dbo.collection("hug").find({}).toArray(function(err, result) {
	    			if (err) throw err;
					const userlist = msg.mentions.users.map(user => {
						const usera = msg.member.user.tag;
						const userb = user.tag;
						if(usera==userb){
							return msg.channel.send("Find someone else :(");
						}
						else {
							const a = usera.indexOf("#");
							const b = userb.indexOf("#");
							const  resa = usera.substring(0, a);
							const  resb = userb.substring(0, b);
						    var randomIndex = Math.floor(Math.random() * result.length); 
						    var gif = result[randomIndex].url;
						    const exampleEmbed = new Discord.RichEmbed()
							.setColor('#0099ff')
							.setTitle(`${resa} hugs ${resb}`)
							.setImage(gif[0]);
		  
							return msg.channel.send(exampleEmbed);
						}
					}); 
					db.close();
				});
			});
		}
	  	
	},
};
