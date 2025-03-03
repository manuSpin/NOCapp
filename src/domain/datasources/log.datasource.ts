import { LogEntity, LogSeverityLevel } from "../entities";


export abstract class LogDatasource {
    abstract saveLog(log: LogEntity): Promise<void>;
    abstract getLogs(severyLevel: LogSeverityLevel): Promise<LogEntity[]>;
}
