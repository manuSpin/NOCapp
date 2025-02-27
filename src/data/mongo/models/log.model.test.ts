import mongoose from "mongoose";
import { envs } from "../../../config/plugins/envs.plugin";
import { MongoDatabase } from "../init";
import { LogSeverityLevel } from "../../../domain/entities";
import { LogModel } from "./log.model";

describe('log.model.test.ts', () => {

    beforeAll(async () => {
        await MongoDatabase.connect({
            mongoUrl: envs.MONGO_URL,
            dbName: envs.MONGO_DB_NAME
        });
    });

    afterAll(() => {
        mongoose.connection.close();
    });

    test('should return LogModel', async () => {
        const logData = {
            origin: 'log.model.test.ts',
            message: 'test-message',
            level: LogSeverityLevel.low
        };

        const log = await LogModel.create(logData);

        expect(log).toEqual(expect.objectContaining({
            ...logData,
            createdAt: expect.any(Date),
            id: expect.any(String)
        }));

        await LogModel.findByIdAndDelete(log.id);
    });

    test('should return the scheme object', () => {
        const schema = LogModel.schema.obj;

        expect(schema).toEqual(expect.objectContaining(
            {
                message: expect.any(Object),
                level: expect.any(Object),
                createdAt: expect.any(Object),
                origin: expect.any(Object)
            }
        ));
    });
});