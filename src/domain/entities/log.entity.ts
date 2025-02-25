import { LogEntityOptions } from "./log-option.entity";
import { LogSeverityLevel } from "./log-severity-level.enum";

export class LogEntity {
    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor(options: LogEntityOptions) {
        this.message = options.message;
        this.level = options.level;
        this.createdAt = options.createdAt ? options.createdAt : new Date();
        this.origin = options.origin;
    }

    public static fromJson = (json: string): LogEntity => {
        const { message, level, createdAt, origin } = JSON.parse(json);

        if (!message) {
            throw new Error('El mensaje es obligatorio');
        }

        if (!level) {
            throw new Error('El nivel de seguridad es obligatorio');
        }

        if (!origin) {
            throw new Error('El origen es obligatorio');
        }
       

        const options = {
            message: message,
            level: level,
            createdAt: new Date(createdAt),
            origin: origin
        }

        const log = new LogEntity(options);

        return log;
    }
}