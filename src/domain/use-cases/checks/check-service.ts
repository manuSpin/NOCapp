import { LogSeverityLevel } from "../../entities/log-severity-level.enum";
import { LogEntity } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallBack: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) { }

    private createLog(message: string, severityLevel: LogSeverityLevel): void {
        const log = new LogEntity(message, severityLevel);

        this.logRepository.saveLog(log);
    }

    public async execute(url: string): Promise<boolean> {
        try {
            const requ = await fetch(url);
            if (!requ.ok) {
                const errorMessage = `Error on check service ${url}`;
                this.createLog(errorMessage, LogSeverityLevel.medium);
                throw new Error(errorMessage);
            }

            this.createLog(`Service ${url} working`, LogSeverityLevel.low);
            this.successCallBack();
            return true;
            
        } catch (error) {
            const messageError = `${url} is not ok. Reason: ${error}`;
            this.createLog(messageError, LogSeverityLevel.high);
            this.errorCallback(messageError);
            return false;
        }
    }
}