require("dotenv").config();
const { Client, GatewayIntentBits, AttachmentBuilder } = require("discord.js");
const { createCanvas, loadImage } = require("canvas");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

client.once("ready", () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
});

client.on("guildMemberAdd", async (member) => {
  const channel = member.guild.channels.cache.get(
    process.env.WELCOME_CHANNEL_ID
  );
  if (!channel) return;

  // 🎨 Canvas
  const canvas = createCanvas(800, 350);
  const ctx = canvas.getContext("2d");

  // 🖤 Background
  ctx.fillStyle = "#0b0b0b";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 🖼 Avatar
  const avatarURL = member.user.displayAvatarURL({
    extension: "png",
    size: 256
  });
  const avatar = await loadImage(avatarURL);

  // ⭕ Circle avatar
  const x = canvas.width / 2;
  const y = 120;
  const radius = 70;

  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(avatar, x - radius, y - radius, radius * 2, radius * 2);
  ctx.restore();

  // 📝 Username text
  ctx.fillStyle = "#ffffff";
  ctx.font = "28px Sans";
  ctx.textAlign = "center";
  ctx.fillText(
    `${member.user.username}. just joined the server`,
    canvas.width / 2,
    240
  );

  // 🧾 Member count
  ctx.fillStyle = "#b3b3b3";
  ctx.font = "20px Sans";
  ctx.fillText(
    `Member #${member.guild.memberCount}`,
    canvas.width / 2,
    275
  );

  const attachment = new AttachmentBuilder(
    canvas.toBuffer(),
    { name: "welcome.png" }
  );

  channel.send({ files: [attachment] });
});

client.login(process.env.TOKEN);
