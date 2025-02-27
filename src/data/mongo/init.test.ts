import mongoose from "mongoose";
import { MongoDatabase } from "./init";

describe('MongoDatabase', () => {
    afterAll(() => {
        mongoose.connection.close();
    })


    test('should connect to MongoDB', async () => {
        const connected = await MongoDatabase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: process.env.MONGO_URL!
        });

        expect(connected).toBe(true);
    });

    test('should throw an error', async () => {
        try {
            const connected = await MongoDatabase.connect({
                dbName: process.env.MONGO_DB_NAME!,
                mongoUrl: 'mongodb://sdfgsdfgf'
            });

        } catch (error) {
            expect(`${error}`).toContain("Can't call `openUri()` on an active connection with different connection strings");
        }
    });
});