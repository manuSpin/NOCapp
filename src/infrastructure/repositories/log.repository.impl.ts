// import { LogRepository } from '../../domain/repository/log.repository';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities';
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