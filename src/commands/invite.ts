import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChatInputCommandInteraction,
    EmbedBuilder,
    SlashCommandBuilder
} from "discord.js";

export const data = new SlashCommandBuilder()
.setName("invite")
.setDescription("Me convidar para seu servidor!")

export async function execute(interaction: ChatInputCommandInteraction) {
    const inviteEmbed = new EmbedBuilder()
    .setColor(0x5865F2)
    .setTitle("Me convide para seu servidor!")
    .setDescription( "Clique no botão abaixo para me adicionar ao seu servidor e brincar comigo")
    .setThumbnail(interaction.client.user!.displayAvatarURL())
    .addFields(
        {
            name: "Eu só fui criada para treinar",
            value: "Eu ainda não tenho comandos legais 😔",
            inline: false,
        },
        {
        name: "🔐 Permissões",
        value: "Administrador",
        inline: false,
        }
    )
    .setFooter({
        text: "Obrigado por usar o bot!\n",
        iconURL: interaction.client.user!.displayAvatarURL(),
    })
    .setTimestamp();

    const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
        .setLabel(("Me convidar"))
        .setEmoji("🚀")
        .setStyle(ButtonStyle.Link)
        .setURL(
                `https://discord.com/api/oauth2/authorize?client_id=${interaction.client.user!.id}&permissions=8&scope=bot%20applications.commands`
        )
    )

    await interaction.reply({
         embeds: [inviteEmbed],
        components: [actionRow]
});
}
