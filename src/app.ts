import { MongoDatabase } from "./data/mongo";
import { LogModel } from "./data/mongo/models/log.model";
import { ConnectionOptions } from "./domain/entities";
import { envs } from "./plugins/envs.plugin";
import { Server } from "./presentation/server";


(async () => {
    main();
})();

async function main() {
    const options: ConnectionOptions = {
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    };
    await MongoDatabase.connect(options);

    Server.start();
}