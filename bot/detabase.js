const { Client } = require("pg");

module.exports = class {
    constructor(log, config) {
        this.config = config;
        this.log = log;
    }

    connect() {
        this.client = new Client({
            host: this.config.db.host,
            port: this.config.db.port,
            database: this.config.db.db,
            user: this.config.db.user,
            password: this.config.db.pass,
        });

        this.log.info("Connecting database...");

        this.client.connect((err) => {
            if (err) {
                this.log.fatal(`Database connection error ${err.stack}`);
                process.exit(1);
            } else {
                this.log.info("Database connect successfully.");
            }
        });
    }
};
