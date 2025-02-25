import { LogSeverityLevel } from "./log-severity-level.enum";

export class LogEntity {
    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;

    constructor(message: string, level: LogSeverityLevel) {
        this.message = message;
        this.level = level;
        this.createdAt = new Date();
    }

    public static fromJson = (json: string): LogEntity => {
        const { message, level, createdAt } = JSON.parse(json);

        if(!message) {
            throw new Error();
        }

        const log = new LogEntity(message, level);
        log.createdAt = new Date(createdAt);

        return log;
    }
}