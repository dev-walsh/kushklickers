import TelegramBot from 'node-telegram-bot-api';
import { storage } from './storage';

export function startTelegramBot() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  
  if (!token) {
    console.log('Telegram bot token not found, skipping Telegram bot initialization');
    return;
  }

  try {
    const bot = new TelegramBot(token, { polling: true });

    // Bot command handlers
    bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id;
      const username = msg.from?.username || `user_${msg.from?.id}`;
      
      const welcomeMessage = `
🌿 Welcome to KushKlicker! 🌿

The ultimate cannabis-themed incremental clicker game on Telegram!

🎯 How to play:
• Click the KUSH button to earn tokens
• Buy upgrades to increase your earning power
• Unlock achievements and climb the leaderboard
• Connect your Solana wallet to earn real rewards

🚀 Ready to start? Click the button below to open the game!
      `;
      
      const keyboard = {
        reply_markup: {
          inline_keyboard: [
            [{ text: '🎮 Play KushKlicker', url: `https://${process.env.REPL_SLUG || 'kushklicker'}.${process.env.REPL_OWNER || 'user'}.repl.co?ref=${username}` }],
            [{ text: '📊 Leaderboard', callback_data: 'leaderboard' }],
            [{ text: '🏆 Achievements', callback_data: 'achievements' }],
            [{ text: '💰 Wallet', callback_data: 'wallet' }]
          ]
        }
      };
      
      bot.sendMessage(chatId, welcomeMessage, keyboard);
    });

    bot.onText(/\/help/, (msg) => {
      const chatId = msg.chat.id;
      
      const helpMessage = `
🌿 KushKlicker Help 🌿

Commands:
• /start - Start playing and get the game link
• /help - Show this help message
• /stats - View your game statistics
• /leaderboard - Check top players
• /link - Link your Telegram account to your game

Game Features:
• 🖱️ Click to earn KUSH tokens
• 🏪 Buy upgrades to increase earning power
• 🎯 Complete achievements for bonus rewards
• 💰 Connect Solana wallet for real token rewards
• 👥 Invite friends with referral system

Need more help? Contact @KushKlickerSupport
      `;
      
      bot.sendMessage(chatId, helpMessage);
    });

    bot.onText(/\/stats/, async (msg) => {
      const chatId = msg.chat.id;
      const telegramId = msg.from?.id;
      
      try {
        const player = await storage.getPlayerByUsername(`telegram_${telegramId}`);
        
        if (!player) {
          bot.sendMessage(chatId, "🔍 No linked account found. Use /link to connect your Telegram account first!");
          return;
        }

        const statsMessage = `
🌿 Your KushKlicker Stats 🌿

👤 Player: ${player.username}
💰 Total KUSH: ${player.totalKush.toLocaleString()}
🖱️ Total Clicks: ${player.totalClicks.toLocaleString()}
⚡ Per Click: ${player.perClickMultiplier}x
📈 Auto Income: ${player.autoIncomePerHour}/hour
📅 Playing Since: ${new Date(player.createdAt).toLocaleDateString()}

Keep clicking to earn more! 🚀
        `;
        
        const keyboard = {
          reply_markup: {
            inline_keyboard: [
              [{ text: '🎮 Continue Playing', url: `https://${process.env.REPL_SLUG || 'kushklicker'}.${process.env.REPL_OWNER || 'user'}.repl.co` }]
            ]
          }
        };
        
        bot.sendMessage(chatId, statsMessage, keyboard);
      } catch (error) {
        console.error('Stats error:', error);
        bot.sendMessage(chatId, "❌ Error fetching stats. Please try again later.");
      }
    });

    bot.onText(/\/leaderboard/, async (msg) => {
      const chatId = msg.chat.id;
      
      try {
        const leaderboard = await storage.getTopPlayers(10);
        let leaderboardMessage = "🏆 KushKlicker Leaderboard 🏆\n\n";
        
        leaderboard.forEach((player, index) => {
          const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `${index + 1}.`;
          leaderboardMessage += `${medal} ${player.username}: ${player.totalKush.toLocaleString()} KUSH\n`;
        });
        
        const keyboard = {
          reply_markup: {
            inline_keyboard: [
              [{ text: '🎮 Play Now', url: `https://${process.env.REPL_SLUG || 'kushklicker'}.${process.env.REPL_OWNER || 'user'}.repl.co` }]
            ]
          }
        };
        
        bot.sendMessage(chatId, leaderboardMessage, keyboard);
      } catch (error) {
        console.error('Leaderboard error:', error);
        bot.sendMessage(chatId, "❌ Error fetching leaderboard. Please try again later.");
      }
    });

    bot.onText(/\/link (.+)/, async (msg, match) => {
      const chatId = msg.chat.id;
      const telegramId = msg.from?.id;
      const username = match?.[1];

      if (!username) {
        bot.sendMessage(chatId, "Please provide your KushKlicker username: /link your_username");
        return;
      }

      try {
        const existingPlayer = await storage.getPlayerByUsername(username);
        
        if (!existingPlayer) {
          bot.sendMessage(chatId, "❌ Player not found! Make sure you entered your correct KushKlicker username.");
          return;
        }

        await storage.updatePlayer(existingPlayer.id, {
          username: `telegram_${telegramId}_${username}`
        });

        const linkMessage = `
✅ Account Linked Successfully!

Your Telegram account has been linked to **${username}**

💰 Your KUSH: ${existingPlayer.totalKush.toLocaleString()}
👆 Total Clicks: ${existingPlayer.totalClicks.toLocaleString()}

You can now use /stats to check your progress!
        `;

        bot.sendMessage(chatId, linkMessage);
      } catch (error) {
        console.error('Link error:', error);
        bot.sendMessage(chatId, "❌ Error linking your account. Please try again later.");
      }
    });

    // Callback query handlers
    bot.on('callback_query', (callbackQuery) => {
      const msg = callbackQuery.message;
      const data = callbackQuery.data;
      const chatId = msg?.chat.id;
      
      if (!chatId) return;
      
      switch (data) {
        case 'leaderboard':
          bot.sendMessage(chatId, "Use /leaderboard to see top players!");
          break;
        case 'achievements':
          bot.sendMessage(chatId, "🏆 View your achievements in the game! Use the Play button to open KushKlicker.");
          break;
        case 'wallet':
          bot.sendMessage(chatId, "💰 Connect your Solana wallet in the game to earn real rewards!");
          break;
      }
      
      bot.answerCallbackQuery(callbackQuery.id);
    });

    console.log('🤖 Telegram bot started successfully!');
    
    // Handle bot errors
    bot.on('polling_error', (error) => {
      console.error('Telegram bot polling error:', error);
    });
    
    return bot;
  } catch (error) {
    console.error('Failed to start Telegram bot:', error);
  }
}