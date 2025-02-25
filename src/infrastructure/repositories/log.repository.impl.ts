// import { LogRepository } from '../../domain/repository/log.repository';
import { LogDatasource } from '../../domain/datasources/log.datasoruce';
import { LogSeverityLevel } from '../../domain/entities/log-severity-level.enum';
import { LogEntity } from '../../domain/entities/log.entity';
import { LogRepository } from '../../domain/repository/log.repository';


export class LogRepositoryImpl implements LogRepository {

    // private logDatasoure: LogDatasource;

    constructor(private logDatasoure: LogDatasource) { }


    public async saveLog(log: LogEntity): Promise<void> {
        return this.logDatasoure.saveLog(log)
    }

    public async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDatasoure.getLogs(severityLevel);
    }

}