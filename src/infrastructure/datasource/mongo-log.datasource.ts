import { LogModel } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities";

export class MongoLogDatasource implements LogDatasource {
    public async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log);
        await newLog.save();

        console.log('Log creado en Mongo con el id: ', newLog.id);
    }
    public async getLogs(severyLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({ level: severyLevel });

        // return logs.map(LogEntity.fromObject);
        return logs.map(mongoLog => LogEntity.fromObject(mongoLog));
    }

}