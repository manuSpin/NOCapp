import { LogSeverityLevel } from "../domain/entities";
import { LogRepository } from "../domain/repository/log.repository";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infrastructure/datasource/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasource/mongo-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

// const fileSystemRepository = new LogRepositoryImpl(new FileSystemDataSource()); // En carpeta del proyecto
const logRepository = new LogRepositoryImpl(new MongoLogDatasource()); // En base de datos mongo
const emailService = new EmailService();

export class Server {
    public static async start() {
        console.log('Servidor arrancado...');


        // CronService.createJob('*/5 * * * * *', () => {
        //     // const url = 'http://localhost:3000';
        //     const url = 'http://www.google.es';
        //     new CheckService(
        //         logRepository,
        //         () => console.log(`${url} is ok`),
        //         (error) => console.log(error)
        //     ).execute(url);
        //     // new CheckService().execute('http://localhost:3000');
        // });

    }
}