import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  PermissionsBitField,
  GuildMember,
  TextChannel
} from "discord.js";
import { createPunishmentEmbed, generatePunishmentId } from "../utils/punishmentEmbed";
import dotenv from "dotenv";

dotenv.config();

const LOG_CHANNEL_ID = process.env.LOG_CHANNEL_ID!;

export const data = new SlashCommandBuilder()
  .setName("ban")
  .setDescription("Banir um usuário")
  .addUserOption(option =>
    option.setName("usuario").setDescription("Usuário").setRequired(true)
  )
  .addStringOption(option =>
    option.setName("motivo").setDescription("Motivo").setRequired(true)
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  if (!interaction.memberPermissions?.has(PermissionsBitField.Flags.BanMembers)) {
    return interaction.reply({ content: "❌ Sem permissão.", ephemeral: true });
  }

  const user = interaction.options.getUser("usuario", true);
  const motivo = interaction.options.getString("motivo", true);
  const member = interaction.guild?.members.cache.get(user.id) as GuildMember;
  const moderator = interaction.user;

  if (!member) {
    return interaction.reply({ content: "Usuário não encontrado.", ephemeral: true });
  }

  const punishmentId = generatePunishmentId();

  await member.ban({
    reason: `BAN | ${motivo} | Por: ${moderator.tag} | ID: ${punishmentId}`
  });

  const embed = createPunishmentEmbed({
    user: user,
    moderator: moderator,
    type: "BAN",
    reason: motivo,
    duration: null, 
    channel: interaction.channel?.isTextBased() ? interaction.channel as any : null,
    guildName: interaction.guild?.name,
    punishmentId: punishmentId,
    status: "Ativa"
  });

  const logChannel = await interaction.guild?.channels.fetch(LOG_CHANNEL_ID);
  if (logChannel?.isTextBased()) {
    await logChannel.send({ embeds: [embed] });
  }

  return interaction.reply({
    content: `✅ ${user.tag} foi banido. (ID: \`${punishmentId}\`)`,
    ephemeral: true
  });
}

