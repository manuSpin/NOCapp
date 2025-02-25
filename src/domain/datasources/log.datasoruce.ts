import { LogSeverityLevel } from "../entities/log-severity-level.enum";
import { LogEntity } from "../entities/log.entity";

export abstract class LogDatasource {
    abstract saveLog(log: LogEntity): Promise<void>;
    abstract getLogs(severyLevel: LogSeverityLevel): Promise<LogEntity[]>;
}