import { Client, GatewayIntentBits, Interaction } from "discord.js";
import { config } from "./config";
import { commands } from "./commands";
import { deployCommands } from "./deploy-commands";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
  ],
});

client.once("ready", async () => {
  console.log("A sua empregada acordou! 🤖");
  await deployCommands(); // DEPLOY GLOBAL
});

client.on("interactionCreate", async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = commands[interaction.commandName as keyof typeof commands];
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "❌ Erro ao executar o comando.",
      ephemeral: true,
    });
  }
});

client.login(config.DISCORD_TOKEN);
