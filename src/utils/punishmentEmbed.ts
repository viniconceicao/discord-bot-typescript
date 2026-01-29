import { EmbedBuilder, User, TextChannel } from "discord.js";

export type PunishmentStatus = "Ativa" | "Expirada" | "Revogada";

interface PunishmentEmbedOptions {
  user: User;
  moderator: User;
  type: string;
  reason: string;
  duration?: string | null;
  channel?: TextChannel | null;
  guildName?: string | null;
  punishmentId: string;
  status?: PunishmentStatus;
}


export function createPunishmentEmbed(options: PunishmentEmbedOptions): EmbedBuilder {
  const {
    user,
    moderator,
    type,
    reason,
    duration = null,
    channel = null,
    guildName = "Servidor",
    punishmentId,
    status = "Ativa"
  } = options;

  const embedColor = 0x5865F2;

  const typeEmoji = getTypeEmoji(type);

  const now = new Date();
  const dateFormatted = now.toLocaleDateString("pt-BR");
  const timeFormatted = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  const timestamp = Math.floor(now.getTime() / 1000);

  const embed = new EmbedBuilder()
    .setColor(embedColor)
    .setTitle("🔨 Nova Punição Aplicada")
    .setAuthor({
      name: moderator.tag,
      iconURL: moderator.displayAvatarURL({ size: 128 })
    })
    .setThumbnail(user.displayAvatarURL({ size: 256 }))
    .addFields(
      {
        name: "👤 Usuário Punido",
        value: `**${user.tag}**\nID: \`${user.id}\``,
        inline: false
      },
      {
        name: "⚖️ Punição",
        value: [
          `${typeEmoji} **Tipo:** ${type}`,
          `⏱️ **Duração:** ${duration || "Permanente"}`,
          `📊 **Status:** ${getStatusEmoji(status)} ${status}`
        ].join("\n"),
        inline: false
      },
      {
        name: "📄 Motivo",
        value: `> ${reason}`,
        inline: false
      }
    )
    .setFooter({
      text: `ID: ${punishmentId} • Sistema de Moderação`,
      iconURL: undefined
    })
    .setTimestamp();

  if (channel) {
    embed.addFields({
      name: "📍 Contexto",
      value: `**Canal:** ${channel}\nID do Canal: \`${channel.id}\``,
      inline: false
    });
  }

  embed.addFields({
    name: "🕒 Data e Horário",
    value: [
      `📅 **Data:** ${dateFormatted}`,
      `🕐 **Hora:** ${timeFormatted}`,
      `⏰ **Registrado:** <t:${timestamp}:R>`
    ].join("\n"),
    inline: false
  });

  return embed;
}


function getTypeEmoji(type: string): string {
  const emojiMap: Record<string, string> = {
    BAN: "🔨",
    KICK: "👢",
    MUTE: "🔇",
    WARN: "⚠️",
    TIMEOUT: "⏸️",
    UNBAN: "🔓",
    UNMUTE: "🔊"
  };

  return emojiMap[type.toUpperCase()] || "📋";
}


function getStatusEmoji(status: PunishmentStatus): string {
  const statusMap: Record<PunishmentStatus, string> = {
    Ativa: "🟢",
    Expirada: "🟡",
    Revogada: "🔴"
  };

  return statusMap[status] || "⚪";
}

export function generatePunishmentId(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 7);
  return `${timestamp}-${randomStr}`.toUpperCase();
}
