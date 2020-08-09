/*
* Coded by: GuckTube YT
* Credit Discord Bot: eslachance
*/
const Discord = require("discord.js");
var exec = require('child_process').execFile;
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
  console.log(`Bot is Online Now!`); 
  client.user.setActivity(`GTPSController By GuckTube YT`);
});

client.on("message", async message => {
  if(message.author.bot) return;
  if(!message.content.startsWith(config.prefix)) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command === "help") {
    message.channel.send("```gt!start (Start the server) (Owner Only)\ngt!stop (Stop the server) (Owner Only)```");
  }

  if(command === "start") {
    if(!message.member.roles.cache.some(r=>["Onwer Role"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
      const m = await message.channel.send("Please Wait...");
   exec('enet.exe', function(err, data) {  
    return m.edit("enet.exe not found! please change your gtps exe to enet.exe, and put this app to your folder gtps");
    });  
      m.edit("Server Has Bees Started!");
  }

  if(command === "stop") {
    if(!message.member.roles.cache.some(r=>["Owner Role"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
      exec("taskkill /f /im enet.exe")
      message.channel.send("Server Has Bees Stopped!");
  }
});

client.login(config.token);