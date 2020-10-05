module.exports = class {
    constructor(log, database) {
        this.database = database;
        this.log = log;
    }

    async checkPoint(msg) {
        let result;

        try {
            result = await this.database.client.query(
                `SELECT * FROM users WHERE discord_id='${msg.author.id}'`
            );
        } catch (error) {
            this.log.error(error);
            return "⚠ エラーが発生しました。詳しくは管理者にお問い合わせください。";
        }

        if (result.rowCount === 0) {
            return "🥺 データが見つかりませんでした。ポイントを取得したことが無いかもしれません...";
        } else {
            return `💰 あなたの総WARPointは ${result.rows[0].points} です！`;
        }
    }

    async addPoints(msg) {
        let queryResult;

        try {
            queryResult = await this.database.client.query(
                `SELECT * FROM users WHERE discord_id='${msg.author.id}'`
            );
        } catch (error) {
            this.log.error(error);
            return "⚠ エラーが発生しました。詳しくは管理者にお問い合わせください。";
        }

        if (queryResult.rowCount === 0) {
            try {
                await this.database.client.query(
                    `INSERT INTO users VALUES (${msg.author.id}, 1, default)`
                );
            } catch (error) {
                return "⚠ エラーが発生しました。詳しくは管理者にお問い合わせください。";
            }
            return `🎉 おめでとう！あなたの総WARPointは 1 です！`;
        } else {
            try {
                await this.database.client.query(
                    `UPDATE users SET points=points+1 WHERE discord_id='${msg.author.id}'`
                );
            } catch (error) {
                return "⚠ エラーが発生しました。詳しくは管理者にお問い合わせください。";
            }
            return `🎉 おめでとう！あなたの総WARPointは ${parseInt(queryResult.rows[0].points) + 1} です！`;
        }
    }
};
