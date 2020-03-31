const Discord = require('discord.js');
const MongoClient = require('mongodb').MongoClient;
const config = require("../config.js");
const DB = config.DB;
const DEV = config.DEV;
module.exports = {
  	name: 'slap',
  	description: 'slap someone!',
  	execute(msg, args) {
		var whitelisted = false;
		const MONGO = config.MONGO;
        var dioce = Math.floor( Math.random() * 20 ) +1;
        if(dioce==7){
          const exampleEmbed = new Discord.RichEmbed()
                .setColor('#ffff00')
                .setTitle(`You were expecting a slap anime gif, but it was me, Dio!`)
                .setImage('https://cdn.discordapp.com/attachments/682860137316220928/689793060258971750/1532018000_Tumblr_o0i5tcPs2o1s0527so1_500.gif');
              return msg.channel.send(exampleEmbed);
        }
      else{
  		if (!msg.mentions.users.size) {
			msg.channel.send("Find someone :(");
		}
		const userlist = msg.mentions.users.map(user => {
			const usera = msg.member.user.tag;
			const userb = user.tag;
			const id = user.id;
			var whitelisted = MongoClient.connect(MONGO, function(err, db) {
			  	if (err) throw err;
			  	var dbo = db.db(DB);
			  	var query = { user: id };
			  	dbo.collection("whitelist").find(query).toArray(function(err, result) {
			    	if (err) throw err;
			    	if(typeof result[0] !== 'undefined'){
				    	if(result[0].user==id){
				    		whitelisted=true;
				    	}	
			    	}
			    	db.close();
			  	});
			});	
			MongoClient.connect(MONGO, function(err, db) {
		  		if (err) throw err;
		  		var dbo = db.db(DB);
		  		dbo.collection("slap").find({}).toArray(function(err, result) {
		    		if (err) throw err;
						if(usera==userb){
							return msg.channel.send("Find someone else :(");
						}
						else if(id==DEV){
							const exampleEmbed = new Discord.RichEmbed()
							.setColor('#0000FF')
							.setTitle(`To my sweet creator?, then I refuse`)
							.setImage('https://cdn.discordapp.com/attachments/690295794628165707/690482556612640798/1512056068_f2f41dcf5a5f3cba9d9a6b80c7152de115acd050_hq.gif');
							return msg.channel.send(exampleEmbed);	
						}
						else if(whitelisted){
							const exampleEmbed = new Discord.RichEmbed()
								.setColor('#0000FF')
								.setTitle(`Who? Someone who doesn't want to be bothered?`)
								.setImage('https://media1.tenor.com/images/23be03bcbba3a14fe95c6db874035bf3/tenor.gif?itemid=7729085');
								msg.delete();
								return msg.channel.send(exampleEmbed);	
						}
						else {
							const a = usera.indexOf("#");
							const b = userb.indexOf("#");
							const  resa = usera.substring(0, a);
							const  resb = userb.substring(0, b);
						    var randomIndex = Math.floor(Math.random() * result.length); 
						    var gif = result[randomIndex].url;
						    const exampleEmbed = new Discord.RichEmbed()
							.setColor('#ffc0cb')
							.setTitle(`${resa} slaps ${resb}`)
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
