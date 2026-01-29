import { EmbedBuilder, SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js'

export const data = new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Mostra o avatar de um usuário")
    .addUserOption(option =>
        option
            .setName("usuario")
            .setDescription("Usuário para ver o avatar")
            .setRequired(false)
    )

export async function execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getUser("usuario") ?? interaction.user

    const embed = new EmbedBuilder()
        .setTitle(`Avatar de ${user.username}`)
        .setImage(user.displayAvatarURL({ size: 512 }))
        .setFooter({
            text: interaction.user.username,
            iconURL: interaction.user.displayAvatarURL(),
        })
        .setTimestamp()

    await interaction.reply({ embeds: [embed] })
}
