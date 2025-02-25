import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infrastructure/datasource/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fileSystemRepository = new LogRepositoryImpl(new FileSystemDataSource());
const emailService = new EmailService();

export class Server {
    public static start() {
        console.log('Servidor arrancado...');

        // CronService.createJob('*/5 * * * * *', () => {
        //     // const url = 'http://localhost:3000';
        //     const url = 'http://www.google.es';
        //     new CheckService(
        //         fileSystemRepository,
        //         () => console.log(`${url} is ok`),
        //         (error) => console.log(error)
        //     ).execute(url);
        //     // new CheckService().execute('http://localhost:3000');
        // });

        // Send Email
        // const emailService = new EmailService();
        // emailService.sendEmail({
        //     to: 'themasterofwindy@gmail.com',
        //     subject: 'Logs de sistema',
        //     htmlBody: `
        //     <h3>Logs de sistema - NOC</h3>
        //     <p>Esto es una prueba de envio de emails de mi aplicación</p>
        //     <p>Ver logs adjuntos</p>
        //     `
        // });
        // emailService.sendEmailWithFileSystemLogs('themasterofwindy@gmail.com');
        // new SendEmailLogs(emailService, fileSystemRepository).execute('themasterofwindy@gmail.com');
    }
}