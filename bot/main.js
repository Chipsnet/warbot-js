const Discord = require("discord.js");
const client = new Discord.Client();

module.exports = class {
    constructor(log, config) {
        this.log = log;
        this.config = config;

        this.keywords = {
            "/naki": "Nakiました",
            "/war": "開　戦"
        }

        client.login(this.config.token);
        this.log.info("Connecting discord...");

        this.run();
    }

    run() {
        client.on("ready", () => {
            this.log.info(`Discord connect successfully! Logged in as ${client.user.tag}!`);
        });

        client.on("message", (msg) => {
            this.msg = msg;

            if (this.keywords[msg.content.toLowerCase()]) {
                this.replyMessage(this.keywords[msg.content.toLowerCase()]);
            }

            if (msg.content.startsWith(this.config.prefix)) {
                const commands = msg.content.slice(this.config.prefix.length).split(' ')
                
                if (commands[0] === 'help') {
                    this.replyMessage({embed: {
                        title: "💭 WARBot Help",
                        description: "コマンド・反応する単語一覧を表示します。\nWARBotについてもっと知りたい場合は `/about` を実行してください。",
                        fields: [
                            {
                                name: "一般コマンド",
                                value: '```'+
                                '/about: このBotに関する情報を表示します\n'+
                                '/help: コマンド一覧を表示します'+
                                '```'
                            },
                            {
                                name: "限界大会関連コマンド",
                                value: '```準備中```'
                            },
                            {
                                name: "反応する単語",
                                value: '大文字小文字どれにも反応します\n```'+
                                Object.keys(this.keywords).join('\n')+
                                '```'
                            }
                        ]
                    }})
                }
            }
        });
    }

    replyMessage(sendMsg) {
        this.log.debug(`${this.msg.author.username}(${this.msg.author.id}): ${this.msg.content}`)
        this.msg.reply(sendMsg)
        this.log.debug(`Send message: ${sendMsg}`)
    }
};
