import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
.setName("help")
.setDescription("Saiba meus comandos")

export async function execute(interaction: ChatInputCommandInteraction) {
    const helpEmbed = new EmbedBuilder()
    .setTitle("Teste")
    .setDescription("Teste")
    .setColor(0xF8AA2A)
    .addFields(
        {
            name: `Teste`,
            value: `Teste`,
            inline: true
        })
    .setTimestamp();

        await interaction.reply({ embeds: [helpEmbed] });
}