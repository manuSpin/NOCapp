import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infrastructure/datasource/file-system.datasoruce";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fileSystemRepository = new LogRepositoryImpl(new FileSystemDataSource());

export class Server {
    public static start() {
        console.log('Servidor arrancado...');

        CronService.createJob('*/5 * * * * *', () => {
            // const url = 'http://localhost:3000';
            const url = 'http://www.google.es';
            new CheckService(
                fileSystemRepository,
                () => console.log(`${url} is ok`),
                (error) => console.log(error)
            ).execute(url);
            // new CheckService().execute('http://localhost:3000');
        });
    }
}