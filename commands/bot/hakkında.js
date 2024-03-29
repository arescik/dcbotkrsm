const { Command } = require('discord.js-commando')
const commando = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require('moment');
const os = require('os');
const { stripIndents } = require('common-tags');
require('moment-duration-format');

module.exports = class EmbedCommand extends Command {
    constructor(client) {
        super(client, {
			name: 'hakkında',
			aliases: ['istatistik', 'davet', 'i', 'd', 'bilgi'],
            group: 'bot',
            memberName: 'hakkında',
            description: 'Bot hakkında bilgi verir.(Botun davet linklerini atar, hakkında bilgi verir ve istatistiklerini gösterir.)',
        }) 
    }

    async run(message) {
		var osType = await os.type();

		if (osType === 'Darwin') osType = 'macOS'
		else if (osType === 'Windows') osType = 'Windows'
		else osType = os.type();

		const embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.addField(`❯ Botun İsmi/Adı:`, `Better Bot`)
		.addField(`❯ Botun Sahibi/Yapımcısı:`, `<@427400103377108992>`)
		.addField(`❯ Botun Prefixi/Ön-Eki:`, `>`)
		.addField(`❯ Açık Kalma Süresi/Çalışma Süresi:`, moment.duration(this.client.uptime).format('D [gün], H [saat], m [dakika], s [saniye]'))
		.addField(`❯ İşletim Sistemi:`, `${osType}`)
		.addField(`❯ Bellek kullanımı:`, `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`)
		.addField(`❯ Genel istatistikler:`, stripIndents`
		**• Sunucu:** ${this.client.guilds.size}
		**• Kanal:** ${this.client.channels.size}
		**• Kullanıcı:** ${this.client.users.size}
		**• Ping/Gecikme Süresi:** ${this.client.ping ? `${Math.round(this.client.ping)}ms.` : ''}
		`)
		.addField(`❯ Sürümler:`, stripIndents`
		**• Bot:** v1.0.5
		**• Discord.js:** v${Discord.version}
		**• Discord.js-commando:** v${commando.version}
		**• Node:** ${process.version}
		`)
		.addField(`❯ Botun Linkleri:`, `**[Botu sunucuna eklemek için tıkla!](https://discordapp.com/oauth2/authorize?client_id=457547769159352341&permissions=8&scope=bot) \n[Botun destek sunucusuna gelmek için tıkla!](https://discord.gg/rc5kfTU) \n[Bota oy vermek için tıkla!](https://discordbots.org/bot/457547769159352341) \n[Botun sitesine bakmak için tıkla!](http://better-bot.rf.gd/)**`)
        .setFooter('©' + (new Date()).getFullYear() + ' Better Bot')
		.setThumbnail(this.client.user.avatarURL)
		message.channel.send({embed});
        }
    };