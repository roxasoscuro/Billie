const Discord = require('discord.js');
const MongoClient = require('mongodb').MongoClient;
const config = require("../config.js");
const DB = config.DB;
module.exports = {
  	name: 'masturbate',
  	description: 'masturbate things!',
  	execute(msg, args) {
		var whitelisted = false;
		const MONGO = config.MONGO;
      	var dioce = Math.floor( Math.random() * 10 ) +1;
      	if(dioce==7){
        	const exampleEmbed = new Discord.RichEmbed()
                .setColor('#ffff00')
                .setTitle(`You were expecting a masturbate anime gif, but it was me, Dio!`)
                .setImage('https://cdn.discordapp.com/attachments/682860137316220928/689793060258971750/1532018000_Tumblr_o0i5tcPs2o1s0527so1_500.gif');
              return msg.channel.send(exampleEmbed);
      	}
    	else{
			if (!msg.channel.nsfw) {
	        	const nsfwWrongChannelWarn = new Discord.RichEmbed()
	            .setColor('#FF0000')
	            .setTitle('You lewd !')
	            .setDescription('You need to be in a nsfw channel for that Baa~ Baka')
	            .setImage("https://media1.tenor.com/images/8674cfb928b1055dd6b8227e7e61060b/tenor.gif?itemid=7979947");

	        	msg.channel.send(nsfwWrongChannelWarn);
	    	}
	    	else {
		  		if (!msg.mentions.users.size) {
					MongoClient.connect(MONGO, function(err, db) {
					  	if (err) throw err;
					  	var dbo = db.db(DB);
					  	dbo.collection("masturbate").find({}).toArray(function(err, result) {
					    	if (err) throw err;
							const user = msg.member.user.tag;
							const n = user.indexOf("#");
							const  res = user.substring(0, n);
						    var randomIndex = Math.floor(Math.random() * result.length); 
						    var gif = result[randomIndex].url;
						    const exampleEmbed = new Discord.RichEmbed()
							.setColor('#ffc0cb')
							.setTitle(`${res} masturbates`)
							.setImage(gif[0]);
							return msg.channel.send(exampleEmbed);
						}); 
						db.close();
					});
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
				  		dbo.collection("masturbate").find({}).toArray(function(err, result) {
				    		if (err) throw err;
								if(usera==userb){
									return msg.channel.send("Find someone else :(");
								}
								else if(whitelisted){
									const exampleEmbed = new Discord.RichEmbed()
								.setColor('#FF0000')
								.setTitle(`Who? Someone who doesn't want to be bothered?`)
								.setImage('https://cdn.discordapp.com/attachments/690295794628165707/690318207432655163/8d38fdcda93da34d39d30cb01d1e6e21fd5f41f6_hq.gif');
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
									.setTitle(`${resa} masturbates ${resb}`)
									.setImage(gif[0]);
				  
									return msg.channel.send(exampleEmbed);
								}
							}); 
							db.close();
						});
				});
		  	}
	  	}
	},
};
