const Discord = require('discord.js');
const MongoClient = require('mongodb').MongoClient;
const config = require("../config.js");
const DB = config.DB;
module.exports = {
  	name: 'fuck',
  	description: 'fuck!',
  	execute(msg, args) {
		var whitelisted = false;
		const MONGO = config.MONGO;
	    var dioce = Math.floor( Math.random() * 20 ) +1;
	    if(dioce==7){
	      const exampleEmbed = new Discord.RichEmbed()
	              .setColor('#ffff00')
	              .setTitle(`You were expecting a fucking anime gif, but it was me, Dio!`)
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
					if (args.includes('-help')) {
		  				args.splice(args.indexOf('-help'), 1);
						const exampleEmbed = new Discord.RichEmbed()
						.setColor('#0000FF')
						.setTitle(`Fuck usage:`)
		  				.addField( '    @Someone', 'Ill post a vanilla fuck gif', true)
		  				.addField( ' -s @Someone', 'Ill post a strapon fuck gif', true)
		  				.addField( ' -a @Someone', 'Ill post an anal fuck gif', true)
		  				.addField( ' -o @Someone', 'Ill post an oral fuck gif', true)
		  				.addField( ' -help`', 'Ill post this info! Baka!', true)
						msg.delete();
						return msg.channel.send(exampleEmbed);	
					}
					else{
						msg.channel.send("Find someone :(");						
					}
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
					if (args.includes('-s')) {
		  				args.splice(args.indexOf('-s'), 1);
						MongoClient.connect(MONGO, function(err, db) {
					  		if (err) throw err;
					  		var dbo = db.db(DB);
					  		dbo.collection("strapon").find({}).toArray(function(err, result) {
				    			if (err) throw err;
								if(usera==userb){
									return msg.channel.send("Find someone else :(");
							}
							else if(whitelisted){
								const exampleEmbed = new Discord.RichEmbed()
								.setColor('#0000FF')
								.setTitle(`Who? Someone who doesn't want to be bothered?`)
								.setImage('https://media1.tenor.com/images/23be03bcbba3a14fe95c6db874035bf3/tenor.gif?itemid=7729085');
								msg.delete();
								return msg.channel.send(exampleEmbed);	
							}
							else if(typeof result[0] !== 'undefined'){
								const a = usera.indexOf("#");
								const b = userb.indexOf("#");
								const  resa = usera.substring(0, a);
								const  resb = userb.substring(0, b);
							    var randomIndex = Math.floor(Math.random() * result.length); 
							    var gif = result[randomIndex].url;
							    const exampleEmbed = new Discord.RichEmbed()
								.setColor('#ffc0cb')
								.setTitle(`${resa} fucks ${resb} with a toy`)
								.setImage(gif[0]);
		  
								return msg.channel.send(exampleEmbed);
								}

							else{
								msg.channel.send("There are not fucks gifs yet!");
							}
							}); 
							db.close();
						});
					}
					else if (args.includes('-a')) {
		  				args.splice(args.indexOf('-a'), 1);
						MongoClient.connect(MONGO, function(err, db) {
					  		if (err) throw err;
					  		var dbo = db.db(DB);
					  		dbo.collection("anal").find({}).toArray(function(err, result) {
				    			if (err) throw err;
								if(usera==userb){
									return msg.channel.send("Find someone else :(");
							}
							else if(whitelisted){
								const exampleEmbed = new Discord.RichEmbed()
								.setColor('#0000FF')
								.setTitle(`Who? Someone who doesn't want to be bothered?`)
								.setImage('https://media1.tenor.com/images/23be03bcbba3a14fe95c6db874035bf3/tenor.gif?itemid=7729085');
								msg.delete();
								return msg.channel.send(exampleEmbed);	
							}
							else if(typeof result[0] !== 'undefined'){
								const a = usera.indexOf("#");
								const b = userb.indexOf("#");
								const  resa = usera.substring(0, a);
								const  resb = userb.substring(0, b);
							    var randomIndex = Math.floor(Math.random() * result.length); 
							    var gif = result[randomIndex].url;
							    const exampleEmbed = new Discord.RichEmbed()
								.setColor('#ffc0cb')
								.setTitle(`${resa} fucks ${resb} in the ass`)
								.setImage(gif[0]);
		  
								return msg.channel.send(exampleEmbed);
								}

								else {
	                				msg.channel.send("There are not fucks gifs yet!");
								}

							}); 
							db.close();
						});
					}
					else if (args.includes('-o')) {
		  				args.splice(args.indexOf('-o'), 1);
						MongoClient.connect(MONGO, function(err, db) {
					  		if (err) throw err;
					  		var dbo = db.db(DB);
					  		dbo.collection("oral").find({}).toArray(function(err, result) {
				    			if (err) throw err;
								if(usera==userb){
									return msg.channel.send("Find someone else :(");
								}
								else if(whitelisted){
									const exampleEmbed = new Discord.RichEmbed()
									.setColor('#0000FF')
									.setTitle(`Who? Someone who doesn't want to be bothered?`)
									.setImage('https://media1.tenor.com/images/23be03bcbba3a14fe95c6db874035bf3/tenor.gif?itemid=7729085');
									msg.delete();
									return msg.channel.send(exampleEmbed);	
								}
								else if(typeof result[0] != 'undefined'){
									const a = usera.indexOf("#");
									const b = userb.indexOf("#");
									const  resa = usera.substring(0, a);
									const  resb = userb.substring(0, b);
								    var randomIndex = Math.floor(Math.random() * result.length); 
								    var gif = result[randomIndex].url;
								    const exampleEmbed = new Discord.RichEmbed()
									.setColor('#ffc0cb')
									.setTitle(`${resa} fucks ${resb} mouth`)
									.setImage(gif[0]);
			  
									return msg.channel.send(exampleEmbed);

								}
								else {
	                				msg.channel.send("There are not oral gifs yet!");
								}
							}); 
							db.close();
						});
					}						
					else{
						MongoClient.connect(MONGO, function(err, db) {
				  			if (err) throw err;
				  			var dbo = db.db(DB);
				  			dbo.collection("fuck").find({}).toArray(function(err, result) {
					    		if (err) throw err;
								if(usera==userb){
									return msg.channel.send("Find someone else :(");
								}
								else if(whitelisted){
									const exampleEmbed = new Discord.RichEmbed()
								.setColor('#0000FF')
								.setTitle(`Who? Someone who doesn't want to be bothered?`)
								.setImage('https://media1.tenor.com/images/23be03bcbba3a14fe95c6db874035bf3/tenor.gif?itemid=7729085');
								msg.delete();
								return msg.channel.send(exampleEmbed);	
								}
								else if(typeof result[0] != 'undefined'){
									const a = usera.indexOf("#");
									const b = userb.indexOf("#");
									const  resa = usera.substring(0, a);
									const  resb = userb.substring(0, b);
								    var randomIndex = Math.floor(Math.random() * result.length); 
								    var gif = result[randomIndex].url;
								    const exampleEmbed = new Discord.RichEmbed()
									.setColor('#ffc0cb')
									.setTitle(`${resa} fucks ${resb}`)
									.setImage(gif[0]);
				  
									return msg.channel.send(exampleEmbed);
								}
								
								else {
	                				msg.channel.send("There are not fucks gifs yet!");
								}
							}); 
							db.close();
						});

					}
				});
		  	}
		} 	
	},
};