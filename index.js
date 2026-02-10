require("dotenv").config();
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

// 🤖 CLIENT
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

// ✅ READY
client.once("ready", () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
});

// 👋 MEMBER JOIN EVENT
client.on("guildMemberAdd", async (member) => {
  const channel = member.guild.channels.cache.get(
    process.env.WELCOME_CHANNEL_ID
  );
  if (!channel) return;

  const avatar = member.user.displayAvatarURL({
    size: 512,
    dynamic: true
  });

  // 🔹 LINE 1 (normal text, system feel)
  await channel.send(
    `Hey ${member}, welcome to **TEAM KORN!**`
  );

  // 🔹 SYSTEM-STYLE WELCOME CARD
  const embed = new EmbedBuilder()
    .setColor("#0b0b0b")
    .setImage(avatar)
    .setDescription(
      `**${member.user.username}** just joined the server\n` +
      `Member #${member.guild.memberCount}`
    );

  await channel.send({ embeds: [embed] });
});

// 🔐 LOGIN
client.login(process.env.TOKEN);
