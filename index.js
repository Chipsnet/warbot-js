const yaml = require("js-yaml");
const fs = require("fs");
const bunyan = require("bunyan");
const os = require("os");
require("colors");
const Main = require("./bot/main.js");

const PACKAGE_JSON = require("./package.json");

const getConfig = async () => {
    let config = yaml.safeLoad(
        fs.readFileSync("./default.yml", "utf-8")
    );

    return config;
};

// bootlog
const bLog = (message) => {
    console.log(`[Boot]: ` + message);
};

console.log(
    ` _       _____    ____  ____        __      _     
| |     / /   |  / __ \\/ __ )____  / /_    (_)____
| | /| / / /| | / /_/ / __  / __ \\/ __/   / / ___/
| |/ |/ / ___ |/ _, _/ /_/ / /_/ / /__   / (__  ) 
|__/|__/_/  |_/_/ |_/_____/\\____/\\__(_)_/ /____/  
                                     /___/        
v${PACKAGE_JSON.version}
Developed by Minato Minami

If you like this bot, please donate me on ko-fi!
https://ko-fi.com/minato86\n`.yellow
);

bLog("Checking log dir...".cyan);

try {
    fs.statSync("./log");
    bLog("Log dir found.".cyan);
} catch (error) {
    if (error.code === "ENOENT") {
        bLog("Log dir not found. Create a dir.".cyan);
        try {
            fs.mkdirSync("log");
            bLog("Log dir create success.".cyan);
        } catch (error) {
            bLog(`An exception has occurred.\n${error}`.brightRed);
        }
    } else {
        bLog(`An exception has occurred.\n${error}`.brightRed);
    }
}

bLog("Logging start.".cyan);

// ログの設定
const log = bunyan.createLogger({
    name: "warbot",
    level: "debug",
    streams: [
        {
            level: "debug",
            stream: process.stdout,
        },
        {
            level: "debug",
            path: "./log/app.log",
        },
    ],
});

log.info("Starting bots...");
log.debug("Getting system info...");
log.debug(`Version: ${PACKAGE_JSON.version}`);
log.debug(`Node.js Version: ${process.versions.node}`);
log.debug(`OS: ${os.type()} ${os.release()}`);
log.debug(`Arch: ${os.arch()}`);
log.debug(`RAM(Free/Total): ${os.freemem()}/${os.totalmem()}`);
log.debug(`CPU: ${os.cpus()[0]["model"]}`);

getConfig().then((config) => {
    log.info('Config load successfully. Starting bot system.')
    log.debug(`Prefix: ${config.prefix}`);
    new Main(log, config)
});