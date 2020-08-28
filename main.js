/*
* Coded by: GuckTube YT
* Helped by: Clayne and JadlionHD
* Credit Discord Bot example Code: eslachance
*/
const Discord = require("discord.js");
const { exec } = require("child_process");
const kill = require("child_process").exec
const fs = require('fs')
const client = new Discord.Client();
const config = require("./config.json");
const path = require("path");
const bcrypt = require("bcrypt");

client.on("ready", () => {
  console.log(`Bot is Online Now!`); 
  client.user.setActivity(`GTPSController By GuckTube YT`);
});

client.on("message", async message => {
  if(message.author.bot) return;
  if(!message.content.startsWith(config.prefix)) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let pfix = config.prefix
  const pf = `${pfix}`
  if(command === "help") {
    message.channel.send("```" + pf + "start (Start the server) (Owner Only)\n" + pf + "stop (Stop the server) (Owner Only)\n" + pf + "count (Count The Players and Worlds)\n" + pf + "maintenance [on/off] (Maintenance Switch) (Owner Only)\n" + pf + "wdelete [World] (Delete World) (Owner Only)\n" + pf + "pdelete [Player] (Delete Player) (Owner Only)\n" + pf + "roll[all, player, world] (Rollback world, player, all) (Owner Only)\n" + pf + "forgotpass [Player] [New Password] (Changing Password) (Owner Only)\n" + pf + "givegems [Player] [Gems Amount] (Giving Gems) (Owner Only)\n" + pf + "givelevel [Player] [level] (Giving level) (Owner Only)\n" + pf + "giverole [Player] [Role Number] (Give Role) (Owner Only)```");
  }

  if(command === "start") {
    if(!message.member.roles.cache.some(r=>[config.role].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
      const m = await message.channel.send("Please Wait...");
      console.log(config.exegtps)
        fs.access(config.exegtps, (err) => {
          if (err)
          {
          return m.edit(config.exegtps + " Not Found! Please set on config.json")
          }
            exec(`start "${config.exegtps}"`)
          m.edit("Server is UP")
        });
   }

  if(command === "stop") {
    if(!message.member.roles.cache.some(r=>[config.role].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
      kill(`taskkill /f /im ${config.exegtps}`)
      message.channel.send("Server Has Been Stopped!");
  }

  if(command === "count") {
      const m = await message.channel.send("Please Wait...");
      fs.readdir(config.player, (err, files) => {
      if (err)
      {
        m.edit("Player Folder Not Found! Please edit on config.json")
      }
      fs.readdir(config.world, (err1, files1) => {
        if (err1)
      {
        m.edit("World Not Found! Please edit on config.json")
      }
      const f1 = files.length;
      const f2 = files1.length;
      m.edit("Player Count = " + f1 + "\nWorlds Count = " + f2);
      })});;
  }
  if (command === "maintenance")
  {
    if(!message.member.roles.cache.some(r=>[config.role].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
      if (!args.length)
      return message.channel.send(`Command = ${pfix}maintenance [on/off]`)

      const m = await message.channel.send("Please Wait...");
      const command1 = args.shift().toLowerCase();
      if (command1 === "on")
      {
        if(!message.member.roles.cache.some(r=>[config.role].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
        fs.readFile(config.sdata, 'utf8', function (err,data) {
          if (err) {
            return m.edit("Error: server_data.php Not Found! please set in config.json");
          }
        var result = data.replace("#maint|", 'maint|');
        fs.writeFile(config.sdata, result, 'utf8', function (err) {
          if (err) 
          return m.edit("Error: Server is already maintenance");
        });
        });
        return m.edit("Maintenance Server is Turn On!");
      }
      if (command1 === "off")
      {
        if(!message.member.roles.cache.some(r=>[config.role].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
        fs.readFile(config.sdata, 'utf8', function (err,data1) {
          if (err) {
            return m.edit("Error: server_data.php Not Found! please set in config.json");
          }
        var result1 = data1.replace("maint|", '#maint|');
        fs.writeFile(config.sdata, result1, 'utf8', function (err) {
          if (err) 
          return m.edit("Error: Server isnt maintenance");
        });
        });
        return m.edit("Maintenance Server is Turn Off");
        }
      }
      if (command === "pdelete")
      {
        if(!message.member.roles.cache.some(r=>[config.role].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
        if (!args.length)
      return message.channel.send(`Command = ${pfix}pdelete [player]`)
      const m = await message.channel.send("Please Wait...");
      fs.unlink(config.player + "\\" + args + ".json", function (err) {
        if (err)
        return m.edit("Player Not Found!");
        m.edit('Player has been Deleted! Restarting...');
        kill(`taskkill /f /im ${config.exegtps}`)
        fs.access(config.exegtps, (err) => {
          if (err)
          {
          return m.edit(config.exegtps + " Not Found! Please set on config.json")
          }
          exec(`start ${config.exegtps}`)
        });
        message.channel.send("Server has been Restarted!")
      });
    }
    if (command === "wdelete")
      {
        if(!message.member.roles.cache.some(r=>[config.role].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
        if (!args.length)
      return message.channel.send(`Command = ${pfix}wdelete [world]`)
      const m = await message.channel.send("Please Wait...");
      fs.unlink(config.world + "\\" + args + ".json", function (err) {
        if (err)
        return m.edit("World Not Found!");
        m.edit('World has been Deleted! Restarting Server...');
        kill(`taskkill /f /im ${config.exegtps}`)
        fs.access(config.exegtps, (err) => {
          if (err)
          {
          return m.edit(config.exegtps + " Not Found! Please set on config.json")
          }
          exec(`start ${config.exegtps}`)
        });
        message.channel.send("Server has been Restarted!")
      });
    }
    if (command === "rollall")
    {
      if(!message.member.roles.cache.some(r=>[config.role].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
      if (!args.length)
      return message.channel.send(`Are you sure to Rollback all? Like Worlds and Players? type ${pfix}rollall yes to rollback all, if you dont want to rollback all, just ignore`)
      const command2 = args.shift().toLowerCase();
      if (command2 === "yes")
      {
        const m = await message.channel.send("Please Wait...")
        const directory1 = config.player;
        const directory2 = config.world;
        fs.readdir(directory1, (err, files1) => {
          if (err)
          {
            return m.edit("player folder not found!, please set on config.json");
          }
          
        
          for (const file1 of files1) {
            fs.unlink(path.join(directory1, file1), err => {
              if (err)
              {
                return m.edit("player folder not found!, please set on config.json");
              }
            });
          }
        });
        fs.readdir(directory2, (err, files2) => {
          if (err)
          {
            return m.edit("world folder not found!, please set on config.json");
          }
        
          for (const file2 of files2) {
            fs.unlink(path.join(directory2, file2), err => {
              if (err)
              {
                return m.edit("world folder not found!, please set on config.json");
              }
            });
          }
        });
      m.edit("Rollback All is done! Restarting...");
      kill(`taskkill /f /im ${config.exegtps}`)
        fs.access(config.exegtps, (err) => {
          if (err)
          {
          return m.edit(config.exegtps + " Not Found! Please set on config.json")
          }
          exec(`start ${config.exegtps}`)
        });
        message.channel.send("Server has been Restarted!")
      }
      else
      {
        return message.channel.send(`Are you sure to Rollback all? Like Worlds and Players? type ${pfix}rollall yes to rollback all, if you dont want to rollback all, just ignore`)
      }
    }
    if (command === "rollworld")
    {
    	if(!message.member.roles.cache.some(r=>[config.role].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
      if (!args.length)
      {
        return message.channel.send(`Are you sure to Rollback world? type ${pfix}rollworld yes to rollback world, if you dont want to rollback world, just ignore`)
      }
      const command3 = args.shift().toLowerCase();
      if (command3 === "yes")
      {
        const m = await message.channel.send("Please Wait...")
        const directory2 = config.world;
        fs.readdir(directory2, (err, files2) => {
          if (err)
          return m.edit("world folder not found!, please set on config.json");
        
          for (const file2 of files2) {
            fs.unlink(path.join(directory2, file2), err => {
              if (err)
              return m.edit("world folder not found!, please set on config.json");
            });
          }
        });
        m.edit(`World has been Rollbacked! Restarting...`)
        kill(`taskkill /f /im ${config.exegtps}`)
        fs.access(config.exegtps, (err) => {
          if (err)
          {
          return m.edit(`${config.exegtps} Not Found! Please set on config.json`)
          }
          exec(`start ${config.exegtps}`)
        });
        message.channel.send("Server has been Restarted!")
      }
      else
      {
        return message.channel.send(`Are you sure to Rollback world? type ${pfix}rollworld yes to rollback world, if you dont want to rollback world, just ignore`)
      }
    }
    if (command === "rollplayer")
    {
    	if(!message.member.roles.cache.some(r=>[config.role].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
      if (!args.length)
      {
        return message.channel.send(`Are you sure to Rollback player? type ${pfix}rollplayer yes to rollback player, if you dont want to rollback player, just ignore`)
      }
      const command3 = args.shift().toLowerCase();
      if (command3 === "yes")
      {
        const directory2 = config.player;
        const m = await message.channel.send("Please Wait...")
        fs.readdir(directory2, (err, files2) => {
          if (err)
          return m.edit("player folder not found!, please set on config.json");
        
          for (const file2 of files2) {
            fs.unlink(path.join(directory2, file2), err => {
              if (err)
              return m.edit("player folder not found!, please set on config.json");
            });
          }
        });
        m.edit(`player has been Rollbacked! Restarting...`)
        kill(`taskkill /f /im ${config.exegtps}`)
        fs.access(config.exegtps, (err) => {
          if (err)
          {
          return m.edit(`${config.exegtps} Not Found! Please set on config.json`)
          }
          exec(`start ${config.exegtps}`)
        });
        message.channel.send("Server has been Restarted!")
      }
      else
      {
        return message.channel.send(`Are you sure to Rollback player? type ${pfix}rollplayer yes to rollback player, if you dont want to rollback player, just ignore`)
      }
    }
    if(command === "forgotpass") {
      if(!message.member.roles.cache.some(r => [config.role].includes(r.name)))
        return message.reply("Sorry, you don't have permissions to use this!");
        const user = args[0]
        const pass = args[1]
      if(args[0] == null)
        return message.reply(`Usage: ${pfix}forgotpass <playername> <new password>`);

        if(args[1] == null)
        return message.reply(`Usage: ${pfix}forgotpass <playername> <new password>`);

        if (!fs.existsSync(config.player)) {
        return message.reply("Player Folder not found! Please set on config.json")
      }

      if (!fs.existsSync(config.player + "\\" + user + ".json")) {
      return  message.reply("Player Not Found!")
    }
      let playername1 = `./` + config.player + `/${args[0]}.json`
      let playername2 = require(playername1);
      bcrypt.genSalt(12, function(err, salt) {
        bcrypt.hash(pass, salt, function(err, hash) {
          playername2.password = hash;
          fs.writeFile(playername1, JSON.stringify(playername2), function writeJSON(err) {
          if (err)
            return console.log(err);
          message.reply(`Changed password! of player named: ${args[0]}`);
          })
        })
      })
    }
    if (command === "givegems")
    {
      let playername1 = `./` + config.player + `/${args[0]}.json`
      let playername2 = require(playername1);
      if(!message.member.roles.cache.some(r => [config.role].includes(r.name)))
        return message.reply("Sorry, you don't have permissions to use this!");
        const user = args[0]
        const gems = args[1]

        if (args[0] == null)
        {
        return message.reply(`Usage: ${pfix}givegems [Player] [Gems Amount]`)
        }

        if (args[1] == null)
        {
        return message.reply(`Usage: ${pfix}givegems [Player] [Gems Amount]`)
        }
        
        if (!fs.existsSync(config.player)) {
          return message.reply("Player Folder not found! Please set on config.json")
        }
  
          if (!fs.existsSync(config.player + "\\" + user + ".json")) {
        return  message.reply("Player Not Found!")
      }
        
          var contents = fs.readFileSync(playername1);
          var jsonContent = JSON.parse(contents);
          var newgem2 = parseInt(jsonContent.gems)
          var gemargs = parseInt(gems)
          newgem2 += gemargs
     const gemss =  parseInt(newgem2)

      playername2.gems = gemss;

      fs.writeFile(playername1, JSON.stringify(playername2), function writeJSON() {
          return message.reply(`Gems has been Gived!\n\nof player named: ${args[0]}\nGems Amount: ${args[1]}\nTotal Gems: ${playername2.gems}\n\nPlease Re-login for take the effect`)
        })
    }
    if (command === "givelevel")
    {
      let playername1 = `./` + config.player + `/${args[0]}.json`
      let playername2 = require(playername1);
      if(!message.member.roles.cache.some(r => [config.role].includes(r.name)))
        return message.reply("Sorry, you don't have permissions to use this!");
        const user = args[0]
        const levels = args[1]

        if (args[0] == null)
        {
        return message.reply(`Usage: ${pfix}givelevel [Player] [Level]`)
        }

        if (args[1] == null)
        {
        return message.reply(`Usage: ${pfix}givelevel [Player] [Level]`)
        }
        
        if (!fs.existsSync(config.player)) {
          return message.reply("Player Folder not found! Please set on config.json")
        }
  
          if (!fs.existsSync(config.player + "\\" + user + ".json")) {
        return  message.reply("Player Not Found!")
      }
        
          var contents = fs.readFileSync(playername1);
          var jsonContent = JSON.parse(contents);
          var newlev2 = parseInt(jsonContent.level)
          console.log(newlev2)
          var levargs = parseInt(levels)
          newlev2 += levargs
     const levelss =  parseInt(newlev2)

      playername2.level = levelss;

      fs.writeFile(playername1, JSON.stringify(playername2), function writeJSON() {
          return message.reply(`Level has been Gived!\n\nof player named: ${args[0]}\nGive Level: ${args[1]}\nTotal Level: ${playername2.level}\n\nPlease Re-login for take the effect`)
        })
    }

    if (command === "giverole")
    {
      if(!message.member.roles.cache.some(r => [config.role].includes(r.name)))
        return message.reply("Sorry, you don't have permissions to use this!");

        const user = args[0]
        const role = args[1]

      if (user == null)
      {
        message.reply(`Command = ${config.prefix}giverole [Player] [Role Number]`)
      }
      if (role == null)
      {
        message.reply(`Command = ${config.prefix}giverole [Player] [Role Number]`)
      }
      if (!fs.existsSync(config.player)) {
        return message.reply("Player Folder not found! Please set on config.json")
      }

        if (!fs.existsSync(config.player + "\\" + user + ".json")) {
        return message.reply("Player Not Found!")
      }
      let playername1 = `./` + config.player + `/${args[0]}.json`
      let playername2 = require(playername1);

      const rolenum =  parseInt(role)

      playername2.adminLevel = rolenum;

      fs.writeFile(playername1, JSON.stringify(playername2), function writeJSON(err) {
        if (err)
          return console.log(err);
        message.reply(`Role has been Gived!\n\nof player named: ${args[0]}\nGive Role Number: ${args[1]}\n\nPlease Re-login for take the effect`);
        })
    }
});

client.login(config.token);
