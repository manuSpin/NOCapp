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
        json = (json === '') ? '{}' : json;

        const { message, level, createdAt, origin } = JSON.parse(json);

        console.log(json);

        const options = {
            message: message,
            level: level,
            createdAt: new Date(createdAt),
            origin: origin
        }

        const log = new LogEntity(options);

        return log;
    }

    public static fromObject = (object: { [key: string]: any }): LogEntity => {
        const { message, level, createdAt, origin } = object;

        const log = new LogEntity({ message, level, createdAt, origin });

        return log;
    }
}