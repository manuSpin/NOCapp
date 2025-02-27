import nodemailer from 'nodemailer';
import { Attachement, SendMailOptions } from '../../domain/entities';
import { envs } from '../../config/plugins/envs.plugin';

export class EmailService {

    private transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    constructor() { }

    public async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments } = options;

        try {
            // TODO: Revisar mañana por si es verdad que gmail se toma su tiempo antes de poder empezar a usarlo
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments,
            });

            console.log(sentInformation);

            return true;
        } catch (error) {
            console.log('Error', error);

            return false;
        }
    }

    public async sendEmailWithFileSystemLogs(to: string | string[]) {
        const subject = 'Logs del servidor';
        const htmlBody = `
            <h3>Logs de sistema - NOC</h3>
            <p>Esto es una prueba de envio de emails de mi aplicación</p>
            <p>Ver logs adjuntos</p>
            `;
        const attachments: Attachement[] = [
            { filename: 'logs-all.log', path: './logs/logs-low.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
            { filename: 'logs-high.log', path: './logs/logs-high.log' },
        ];

        return this.sendEmail({ to, subject, attachments, htmlBody });
    }
}