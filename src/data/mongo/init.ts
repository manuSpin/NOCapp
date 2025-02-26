import { ConnectionOptions } from "../../domain/entities";
import mongoose from 'mongoose';

export class MongoDatabase {
    public static async connect(options: ConnectionOptions) {
        const { mongoUrl, dbName } = options;

        try {
            await mongoose.connect(mongoUrl, { dbName: dbName });

            console.log('Conectado a Mongo!');

        } catch (error) {
            console.log('Error de conexión a Mongo. Error:' + error);
            throw error;
        }

    }
}