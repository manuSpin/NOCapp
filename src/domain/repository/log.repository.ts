import { LogSeverityLevel } from "../entities/log-severity-level.enum";
import { LogEntity } from "../entities/log.entity";

export abstract class LogRepository {
    abstract saveLog(log: LogEntity): Promise<void>;
    abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}