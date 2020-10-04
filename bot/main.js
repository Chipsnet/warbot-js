const Discord = require("discord.js");
const client = new Discord.Client();
const PACKAGE_JSON = require("../package.json");
const genkaijs = require("./genkai.js")
const os = require("os");

module.exports = class {
    constructor(log, config) {
        this.log = log;
        this.config = config;
        this.version = PACKAGE_JSON.version
        this.genkai = new genkaijs(this.log, this.config)

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
                        timestamp: new Date(),
                        footer: {
                            text: "WARbot developed with ❤ by 巳波みなと"
                        },
                        fields: [
                            {
                                name: "一般コマンド",
                                value: '```'+
                                `${this.config.prefix}about: このBotに関する情報を表示します\n`+
                                `${this.config.prefix}help: コマンド一覧を表示します`+
                                '```'
                            },
                            {
                                name: "限界大会関連コマンド",
                                value: '```'+
                                this.config.prefix+'genkai help: 限界大会関連コマンドの一覧を表示します'+
                                '```'
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

                if (commands[0] === 'about') {
                    this.replyMessage({embed: {
                        title: "💻 WARBot About",
                        description: "WARBotをご利用頂きありがとうございます！\nWARBotは[巳波みなと](https://minato86.me)により運営されているDiscordBotです！",
                        timestamp: new Date(),
                        footer: {
                            text: "WARbot developed with ❤ by 巳波みなと"
                        },
                        fields: [
                            {
                                name: "Version",
                                value: `WARBot v${this.version}`,
                                inline: true
                            },
                            {
                                name: "Prefix",
                                value: `${this.config.prefix}`,
                                inline: true
                            },
                            {
                                name: "ServerOS",
                                value: `${os.type()} ${os.release()}`,
                                inline: true
                            },
                            {
                                name: "ServerCPU",
                                value: `${os.cpus()[0]["model"]}`
                            },
                            {
                                name: "Node.js Version",
                                value: `${process.versions.node}`
                            },
                            {
                                name: "Host",
                                value: `${os.hostname()}`
                            },
                            {
                                name: "Source",
                                value: 'このBotはオープンソースソフトウェアです\n'+
                                'https://github.com/Chipsnet/warbot-js'
                            },
                            {
                                name: "Changelog",
                                value: 'https://github.com/Chipsnet/warbot-js/releases'
                            }
                        ]
                    }})
                }

                if (commands[0] === "genkai") {
                    if (commands[1] === "help") {
                        this.replyMessage({embed: {
                            title: "📌 限界大会 Help",
                            description: "限界大会関連のコマンド一覧です。限界大会サーバーでのみ使用できるコマンドもあります。",
                            timestamp: new Date(),
                            footer: {
                                text: "WARbot developed with ❤ by 巳波みなと"
                            },
                            fields: [
                                {
                                    name: "コマンド一覧",
                                    value: '```\n'+
                                    `${this.config.prefix}genkai help: コマンド一覧を表示します\n`+
                                    '```',
                                }
                            ]
                        }})
                    }
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
