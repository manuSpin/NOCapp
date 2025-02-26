import { LogModel } from './../src/data/mongo/models/log.model';
import { ConnectionOptions } from './../src/domain/entities/connection-options.entity';
import { MongoDatabase } from './../src/data/mongo/init';
import { envs } from './../src/plugins/envs.plugin';

(async() => {
    main();
})();

async function main() {
    const options: ConnectionOptions = {
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    };

    await MongoDatabase.connect(options);

    // Crear una collecion = tables, documento = registro/row
    const newLog = await LogModel.create({
        message: 'Mensaje test número 2 desde Mongo',
        origin: 'App.ts',
        level: 'low'
    });
    await newLog.save();
    console.log(newLog);

    // Obtener un registro
    const logs = await LogModel.find();
    console.log(logs);


}