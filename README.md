# RAHASIA Discord BOT

[RAHASIA | ⚙](https://discord.com/api/oauth2/authorize?client_id=1072586274319388682&permissions=8&scope=bot) is a Discord bot designed to simplify user interaction within a Discord server. The bot is created using JavaScript programming language and Discord.js library. It has various features to help manage a server such as message management, warning, role management, and more.

The bot is still in the development phase and will have several new features added and improved.

## Features

- /ping = Check bot response and performance.
- /clear = Delete specific messages.
- /createverify = Create a verification system.
- /ban = Ban a user from the server.
- /unban = Unban a member from the server.
- /help = Display all available BOT commands.
- /mute = Mute a member from the server.
- /unmute = Unmute a member from the server.
- /ticket = Perform ticket actions.
- /ticketsetup = Create a ticket message.
- /meme = Send GIF/meme from Giphy.
- /addrole = Add role to reaction role panel.
- /panel = Display the reaction role panel.
- /removerole = Remove role from reaction role panel.
- /warnings add = Add warnings to a user.
- /warnings check = Check a user's warnings.
- /warnings clear = Clear all warnings from a user.
- /warnings remove = Remove warnings from a user.
- /poll = Create a poll and send it to a certain channel.
- /suggest = Place a suggestion.
- /update = Update the bots presences.

## Installation

To run this bot, you need to configure your MongoDB and BOT Token in the config.json file. To obtain your BOT Token, you can get it [here](https://discord.com/developers)

```bash
  {
    "token": "YOUR_BOT_TOKEN_HERE",
    "mongodb": "mongodb://<dbuser>:<dbpassword>@<host>:<port>/<dbname>"
  }
```

Clone this repository to your computer using the command:

```bash
  git clone https://github.com/Fadhilmagass/DJS.14
```

Change the directory to the bot:

```bash
  cd DJS.14
```

Install the required dependencies:

```bash
  npm install
```

Run the bot using the command:

```bash
  node .
```

# Tech Stack

## 1. [Node.js](https://nodejs.org/en/)

Node.js is a JavaScript runtime platform that enables you to run JavaScript code outside of a browser. Discord.js is built using the JavaScript programming language and runs on Node.js, so you need to install Node.js first.

## 2. [Discord API](https://github.com/discord/discord-api-docs)

Discord provides an API that allows you to create Discord bots and communicate with Discord servers. You can find the Discord API documentation and information on how to use it on the official Discord Developer Portal website.

## 3. [Discord.js](https://discord.js.org/#/docs/discord.js/main/general/welcome)

Discord.js is a JavaScript library that enables you to easily create Discord bots using the Discord API. The library has many features and methods that make it easy to interact with Discord servers and make bot code more efficient.

## 4. [MongoDB](https://www.mongodb.com/)

MongoDB is a popular NoSQL database that can be used to store and retrieve data needed by your Discord bot. By using MongoDB, you can create more complex Discord bots with more comprehensive features such as storing user data, monitoring user activity, and creating logs.

## 5. [Text editor](https://code.visualstudio.com/)

You will need a text editor to write your bot code. You can use any text editor, such as Visual Studio Code, Atom, etc. Make sure the text editor you use
