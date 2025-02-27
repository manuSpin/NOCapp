import { LogDatasource } from '../../domain/datasources/log.datasource';
import fs from 'fs';
import { LogEntity, LogSeverityLevel } from "../../domain/entities";

export class FileSystemDataSource implements LogDatasource {

    private readonly logPath = 'logs/';
    private readonly allLongsPath = 'logs/logs-all.log';
    private readonly mediumLongsPath = 'logs/logs-medium.log';
    private readonly highLongsPath = 'logs/logs-high.log';

    constructor() {
        this.createLogFiles();
    }

    private createLogFiles = () => {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }

        [this.allLongsPath,
        this.mediumLongsPath,
        this.highLongsPath].forEach(path => {
            if (!fs.existsSync(path)) {
                fs.writeFileSync(path, '');
            }
        });
    }

    public async saveLog(newLog: LogEntity): Promise<void> {
        const logAsJson = `${JSON.stringify(newLog)}\n`;

        if (newLog.level === LogSeverityLevel.medium) {
            fs.appendFileSync(this.mediumLongsPath, logAsJson);

        } else if (newLog.level === LogSeverityLevel.high) {
            fs.appendFileSync(this.highLongsPath, logAsJson);
        }
        
        fs.appendFileSync(this.allLongsPath, logAsJson);
    }

    private getLogFromFile = (path: string): LogEntity[] => {
        const content = fs.readFileSync(path, 'utf-8');

        if (content === '') {
            return [];
        }
        
        const logs = content.split('\n').map(log => LogEntity.fromJson(log));
        
        return logs;
    }

    public async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch (severityLevel) {
            case LogSeverityLevel.low:
                return this.getLogFromFile(this.allLongsPath);

            case LogSeverityLevel.medium:
                return this.getLogFromFile(this.mediumLongsPath);

            case LogSeverityLevel.high:
                return this.getLogFromFile(this.highLongsPath);

            default:
                throw Error(`${severityLevel} inexistente`);
        }
    }
}