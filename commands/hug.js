const Discord = require('discord.js');
const MongoClient = require('mongodb').MongoClient;
const config = require("../config.js");
module.exports = {
  	name: 'hug',
  	description: 'hug!',
  	execute(msg, args) {
	var whitelisted = false;
		const MONGO = config.MONGO;	
	  	if (!msg.mentions.users.size) {
			msg.channel.send("Find someone :(");
		}	
		else{
			const userlist = msg.mentions.users.map(user => {
				const usera = msg.member.user.tag;
				const userb = user.tag;
				var whitelisted = MongoClient.connect(MONGO, function(err, db) {
				  	if (err) throw err;
				  	var dbo = db.db("billie");
				  	var query = { user: userb };
				  	dbo.collection("whitelist").find(query).toArray(function(err, result) {
				    	if (err) throw err;
				    	if(result[0].user==userb){
							console.log('result[0].user: '+result[0].user);
							console.log('userb: '+userb);
				    		whitelisted=true;
							console.log('whitelisted: '+ whitelisted);
				    	}
				    	db.close();
				  	});
				});
				MongoClient.connect(MONGO, function(err, db) {
		  			if (err) throw err;
		  			var dbo = db.db("billie");
		  			dbo.collection("hug").find({}).toArray(function(err, result) {
		    			if (err) throw err;
							if(usera==userb){
								return msg.channel.send("Find someone else :(");
							}
							else if(whitelisted){
								console.log(whitelisted);
								return msg.channel.send("Who?");	
							}
							else {
								console.log(whitelisted);
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
						db.close();
					});
				});
			});
		}
	},
};
