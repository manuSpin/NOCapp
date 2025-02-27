import mongoose from "mongoose";
import { envs } from "../../config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "../../data/mongo";
import { MongoLogDatasource } from "./mongo-log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities";
import exp from "constants";

describe('MongoLogDatasource', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const log = new LogEntity({
        origin: 'mongo-log.datasource.test.ts',
        message: 'Test message',
        level: LogSeverityLevel.low
    });

    const logDatasource = new MongoLogDatasource();

    beforeAll(async () => {
        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL
        });
    });

    beforeEach(() => {
        jest.clearAllMocks();
    })

    afterEach(async () => {
        await LogModel.deleteMany();
    });

    afterAll(async () => {
        mongoose.connection.close();
    });

    test('should create a log', async () => {

        const logSpy = jest.spyOn(console, 'log');

        await logDatasource.saveLog(log);

        expect(logSpy).toHaveBeenCalledWith('Log creado en Mongo con el id: ', expect.any(String));
    });

    test('should get logs', async () => {
        await logDatasource.saveLog(log);

        const logs = await logDatasource.getLogs(LogSeverityLevel.low);

        expect(logs.length).toBe(1);
        expect(logs[0].level).toBe(LogSeverityLevel.low);
    });
});