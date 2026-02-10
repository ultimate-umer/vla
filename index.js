const { Client, GatewayIntentBits, AttachmentBuilder } = require("discord.js");
const { createCanvas, loadImage, registerFont } = require("canvas");
require("dotenv").config();

// REGISTER FONT (important)
registerFont("./assets/fonts/Poppins-Bold.ttf", {
  family: "Poppins",
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("guildMemberAdd", async (member) => {
  try {
    // 🔹 CHANNEL (general)
    const channel = member.guild.channels.cache.find(
      (ch) => ch.name === "general"
    );
    if (!channel) return;

    // 🔹 TEXT MESSAGE (IMAGE SE PEHLE)
    await channel.send(
      `Hey ${member}, welcome to 𝐊𝐞𝐧𝐠𝐬 /~`
    );

    // 🔹 CANVAS
    const canvas = createCanvas(800, 350);
    const ctx = canvas.getContext("2d");

    // Background
    const bg = await loadImage("./assets/background.png");
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

    // Discord Logo Circle
    const logo = await loadImage(
      "https://cdn.discordapp.com/embed/avatars/0.png"
    );

    const x = canvas.width / 2;
    const y = 140;
    const radius = 60;

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(logo, x - radius, y - radius, radius * 2, radius * 2);
    ctx.restore();

    // TEXT
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";

    ctx.shadowColor = "#ffffff";
    ctx.shadowBlur = 15;

    ctx.font = "36px Poppins";
    ctx.fillText("WELCOME TO KENGS /~", canvas.width / 2, 250);
   
    ctx.shadowBlur = 8;

    ctx.font = "22px Poppins";
    ctx.fillText("THANK YOU FOR JOINING", canvas.width / 2, 285);

    ctx.shadowBlur = 0;

    // SEND IMAGE
    const attachment = new AttachmentBuilder(canvas.toBuffer(), {
      name: "welcome.png",
    });

    await channel.send({ files: [attachment] });

  } catch (err) {
    console.error("❌ Welcome error:", err);
  }
});

client.login(process.env.TOKEN);
