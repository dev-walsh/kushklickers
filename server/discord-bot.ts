import { Client, GatewayIntentBits, SlashCommandBuilder, REST, Routes } from 'discord.js';
import { storage } from './storage';

export class DiscordBot {
  private client: Client;
  private token: string;

  constructor(token: string) {
    this.token = token;
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
      ]
    });

    this.setupBot();
  }

  private async setupBot() {
    this.client.once('ready', () => {
      console.log(`Discord bot logged in as ${this.client.user?.tag}!`);
      this.registerCommands();
    });

    this.client.on('interactionCreate', async (interaction) => {
      if (!interaction.isChatInputCommand()) return;

      const { commandName } = interaction;

      try {
        switch (commandName) {
          case 'start':
            await this.handleStart(interaction);
            break;
          case 'stats':
            await this.handleStats(interaction);
            break;
          case 'leaderboard':
            await this.handleLeaderboard(interaction);
            break;
          case 'link':
            await this.handleLink(interaction);
            break;
          default:
            await interaction.reply('Unknown command!');
        }
      } catch (error) {
        console.error('Discord command error:', error);
        await interaction.reply('An error occurred while processing your command.');
      }
    });

    await this.client.login(this.token);
  }

  private async registerCommands() {
    const commands = [
      new SlashCommandBuilder()
        .setName('start')
        .setDescription('Get started with KushKlicker and receive your game link'),
      new SlashCommandBuilder()
        .setName('stats')
        .setDescription('View your KushKlicker game statistics'),
      new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('See the top KushKlicker players'),
      new SlashCommandBuilder()
        .setName('link')
        .setDescription('Link your Discord account to KushKlicker')
        .addStringOption(option =>
          option.setName('username')
            .setDescription('Your KushKlicker username')
            .setRequired(true))
    ].map(command => command.toJSON());

    const rest = new REST().setToken(this.token);

    try {
      await rest.put(
        Routes.applicationCommands(this.client.user!.id),
        { body: commands }
      );
      console.log('Discord slash commands registered successfully!');
    } catch (error) {
      console.error('Error registering Discord commands:', error);
    }
  }

  private async handleStart(interaction: any) {
    const embed = {
      color: 0x4CAF50, // Green color matching the logo
      title: '🌿 Welcome to KushKlicker! 🌿',
      description: 'The ultimate cannabis-themed clicker game!',
      thumbnail: {
        url: 'https://your-domain.replit.app/logo.png' // We'll add this later
      },
      fields: [
        {
          name: '🎮 Play Now',
          value: '[Click here to start playing!](https://your-domain.replit.app)',
          inline: true
        },
        {
          name: '💰 Features',
          value: '• Click to earn KUSH tokens\n• Buy upgrades\n• Unlock achievements\n• Compete on leaderboards',
          inline: false
        }
      ],
      footer: {
        text: 'Use /link to connect your Discord account with your game progress!'
      }
    };

    await interaction.reply({ embeds: [embed] });
  }

  private async handleStats(interaction: any) {
    const discordId = interaction.user.id;
    
    try {
      // Try to find player by Discord ID (we'll need to add this field to the schema)
      const player = await storage.getPlayerByUsername(`discord_${discordId}`);
      
      if (!player) {
        await interaction.reply({
          content: '❌ No linked account found! Use `/link` to connect your Discord account first.',
          ephemeral: true
        });
        return;
      }

      const embed = {
        color: 0x4CAF50,
        title: `📊 ${player.username}'s Stats`,
        fields: [
          { name: '💰 Total KUSH', value: player.totalKush.toLocaleString(), inline: true },
          { name: '👆 Total Clicks', value: player.totalClicks.toLocaleString(), inline: true },
          { name: '⚡ Click Power', value: `${player.perClickMultiplier}x`, inline: true },
          { name: '🤖 Auto Income', value: `${player.autoIncomePerHour}/hour`, inline: true }
        ],
        footer: {
          text: 'Keep clicking to earn more KUSH!'
        }
      };

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Stats error:', error);
      await interaction.reply('Error fetching your stats. Please try again later.');
    }
  }

  private async handleLeaderboard(interaction: any) {
    try {
      const topPlayers = await storage.getTopPlayers(10);
      
      const leaderboardText = topPlayers
        .map((player, index) => `${index + 1}. ${player.username} - ${player.totalKush.toLocaleString()} KUSH`)
        .join('\n');

      const embed = {
        color: 0x4CAF50,
        title: '🏆 Top KushKlicker Players',
        description: leaderboardText || 'No players found!',
        footer: {
          text: 'Keep playing to climb the ranks!'
        }
      };

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Leaderboard error:', error);
      await interaction.reply('Error fetching leaderboard. Please try again later.');
    }
  }

  private async handleLink(interaction: any) {
    const discordId = interaction.user.id;
    const username = interaction.options.getString('username');

    try {
      const existingPlayer = await storage.getPlayerByUsername(username!);
      
      if (!existingPlayer) {
        await interaction.reply({
          content: '❌ Player not found! Make sure you entered your correct KushKlicker username.',
          ephemeral: true
        });
        return;
      }

      // Update player with Discord ID
      await storage.updatePlayer(existingPlayer.id, {
        username: `discord_${discordId}_${username}`
      });

      const embed = {
        color: 0x4CAF50,
        title: '✅ Account Linked Successfully!',
        description: `Your Discord account has been linked to **${username}**`,
        fields: [
          { name: '💰 Your KUSH', value: existingPlayer.totalKush.toLocaleString(), inline: true },
          { name: '👆 Total Clicks', value: existingPlayer.totalClicks.toLocaleString(), inline: true }
        ],
        footer: {
          text: 'You can now use /stats to check your progress!'
        }
      };

      await interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      console.error('Link error:', error);
      await interaction.reply({
        content: 'Error linking your account. Please try again later.',
        ephemeral: true
      });
    }
  }
}

export function startDiscordBot() {
  const token = process.env.DISCORD_BOT_TOKEN;
  
  if (!token) {
    console.log('Discord bot token not found, skipping Discord bot initialization');
    return;
  }

  try {
    new DiscordBot(token);
    console.log('Discord bot starting...');
  } catch (error) {
    console.error('Failed to start Discord bot:', error);
  }
}