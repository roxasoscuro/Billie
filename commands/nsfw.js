const Discord = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    name: 'nsfw',
    description: 'AzTest',
    execute: async (msg, args) => {

        var error = false;

        // Nsfw channel test
        if (!msg.channel.nsfw) {
            const nsfwWrongChannelWarn = new Discord.RichEmbed()
                .setColor('#FF0000')
                .setTitle('You lewd !')
                .setDescription('You need to be in a nsfw channel for that Baa~ Baka')
                .setImage("https://media1.tenor.com/images/8674cfb928b1055dd6b8227e7e61060b/tenor.gif?itemid=7979947");

            msg.channel.send(nsfwWrongChannelWarn);
        } else {

            // Image Feed
            if (!args || args == "") {
                // No tag then we take vanilla

                args = "hentai";
                console.log(args);
            }
            console.log(args);

            var rating = '';

            if (args.includes('-h')) {
                rating = '&search[rating]=explicit'
                args.splice(args.indexOf('-h'), 1);
            }
            if (args.includes('-e')) {
                rating = rating + '&search[rating]=questionable'
                args.splice(args.indexOf('-e'), 1);

            }
            if (args.includes('-s')) {
                rating = rating + '&search[rating]=safe'
                args.splice(args.indexOf('-s'), 1);

            }

            console.log(args);



            var listArgsDelete;
            if (args.length > 2) {
                listArgsDelete = args.splice(2, args.length - 2);

            } else {
                listArgsDelete = "";
            }



            var urlTag = args.join('+');
            console.log(urlTag);
            
            var urlSearch = "https://danbooru.donmai.us/posts.json?random=true&raw=true&tags=" + urlTag + rating;
            console.log(urlSearch);

            var postID;

            //// Select the post with tag
            await fetch(urlSearch)
                .then(response => response.json())
                .then(data => {
                    if (data.length == 0) {
                                const postEmbed = new Discord.RichEmbed()
                                    .setColor('#FF0000')
                                    .setTitle('Error')
                                    .setDescription("No image with those tags : " + args)
                                    .setImage('https://vqgazmo.yrhfibxjbtvw.hath.network:1298/h/ef870055f5d3063030868f9dabb19ba76f17b583-20809-512-288-jpg/keystamp=1584103200-96f49dde50;fileindex=67809191;xres=org/0126d1a112f09cc260c8ec0063113bfc9a5b8b5dr1_1136_640v2_00.jpg');
                        msg.channel.send(postEmbed);
                        error = true;
                        return;
                    }

                    var seed = Math.floor(Math.random() * data.length - 1); 
                    postID = data[seed].id;
                })
                .catch(err => { msg.channel.send(err) });

            if (!error) {
                //Get Image

                var urlPost = "https://danbooru.donmai.us/posts/" + postID + ".json?"
                await fetch(urlPost)
                    .then(response => response.json())
                    .then(data => {
                        const postEmbed = new Discord.RichEmbed()
                            .setColor('#ffc0cb')
                            .setURL('https://danbooru.donmai.us/posts/' + postID)
                            .setAuthor(data.tag_string_artist)
                            .setDescription("Tags : " + args + " - Tags deleted : " + listArgsDelete)
                            .setImage(data.file_url);

                        console.log("Id Post : " + data.id);
                        msg.channel.send(postEmbed);
                    })
                    .catch(err => { msg.channel.send(err) });
            }
        }


        msg.delete();
    },
};