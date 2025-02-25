import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities";
import { LogRepository } from "../../repository/log.repository";

interface SendLogEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailUseCase {

    private static readonly filename = 'send-email-logs.ts';

    constructor(private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ) { }


    public async execute(to: string | string[]): Promise<boolean> {
        try {
            const sent = await this.emailService.sendEmailWithFileSystemLogs(to);

            if (!sent) {
                throw new Error('Email log not sent');
            }

            this.createLog('Email sent', LogSeverityLevel.low);

            return true;

        } catch (error) {
            this.createLog(`Error. Email not sent. Reason: ${error}`, LogSeverityLevel.medium);

            return false;
        }
    }

    private createLog(message: string, severityLevel: LogSeverityLevel): void {
        const log = new LogEntity({message: message, level: severityLevel, origin: SendEmailLogs.filename});

        this.logRepository.saveLog(log);
    }

}