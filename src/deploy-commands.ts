import { REST, Routes } from "discord.js";
import { config } from "./config";
import { commands } from "./commands";

const commandsData = Object.values(commands).map((command) =>
  command.data.toJSON()
);

const rest = new REST({ version: "10" }).setToken(config.DISCORD_TOKEN);

export async function deployCommands() {
  try {
    console.log("🌍 Registrando comandos GLOBAIS...");

    await rest.put(
      Routes.applicationCommands(config.DISCORD_CLIENT_ID),
      { body: commandsData }
    );

    console.log("✅ Comandos globais registrados com sucesso!");
  } catch (error) {
    console.error(error);
  }
}
