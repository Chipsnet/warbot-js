const Twitter = require("twitter");
const cron = require("node-cron");

module.exports = class {
    constructor(log, database, config) {
        this.log = log;
        this.database = database;
        this.config = config;

        this.client = new Twitter({
            consumer_key: this.config.twitter.consumer_key,
            consumer_secret: this.config.twitter.consumer_secret,
            access_token_key: this.config.twitter.access_key,
            access_token_secret: this.config.twitter.access_secret,
        });
    }

    schedule() {
        cron.schedule("0 0 18 * * Sun", () => {
            console.log("ジョタ");
        });


    }

    getNext() {
        
    }
};
