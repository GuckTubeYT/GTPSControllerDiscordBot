/*
* Coded by: GuckTube YT
* Helped by: Clayne
* Credit Discord Bot: eslachance
*/
const Discord = require("discord.js");
const { exec } = require("child_process");
const fs = require('fs')
const client = new Discord.Client();
const config = require("./config.json");
const group = ("Server Creator")
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
    if(!message.member.roles.cache.some(r=>[group].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");

      /* or you can use this code
      if(message.author.id !== "User ID") return message.channel.send('Sorry, you don't have permissions to use this!')
      Helped by Clayne
      */

      const m = await message.channel.send("Please Wait...");
      try {
        if (fs.existsSync("enet.exe")) {
          exec("start enet.exe")
          m.edit("Server is UP")
        }
      } catch(err) {
        m.edit("enet.exe Not Found! Please put this app into your gtps folder")
      }
      
      
  }

  if(command === "stop") {
    if(!message.member.roles.cache.some(r=>[group].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
      exec("taskkill /f /im enet.exe")
      message.channel.send("Server Has Been Stopped!");
  }
});

client.login(config.token);
