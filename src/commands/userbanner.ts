import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder
} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("banner")
  .setDescription("Exibe o banner de um usuário")
  .addUserOption(option =>
    option
      .setName("usuario")
      .setDescription("Usuário para ver o banner")
      .setRequired(false)
  );

export async function execute(interaction: ChatInputCommandInteraction) {
    
    const user = interaction.options.getUser("usuario") || interaction.user;
    const fetchedUser = await user.fetch(true);
    const bannerURL = fetchedUser.bannerURL({ size: 4096 });
    if (!bannerURL) {
      return interaction.reply({
        content: `❌ ${user.tag} não possui um banner personalizado.`,
        ephemeral: true
      });
    }

    const embed = new EmbedBuilder()
      .setColor(fetchedUser.accentColor || 0x5865F2)
      .setAuthor({
        name: `Banner de ${user.tag}`,
        iconURL: user.displayAvatarURL({ size: 128 })
      })
      .setDescription(`[Baixar Banner](${bannerURL})`)
      .setImage(bannerURL)
      .setFooter({
        text: `Solicitado por ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL({ size: 64 })
      })
      .setTimestamp();

    return interaction.reply({ embeds: [embed] });
} 
  

