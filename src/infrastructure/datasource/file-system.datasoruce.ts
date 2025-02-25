import { LogDatasource } from "../../domain/datasources/log.datasoruce";
import { LogSeverityLevel } from "../../domain/entities/log-severity-level.enum";
import { LogEntity } from "../../domain/entities/log.entity";
import fs from 'fs';

export class FileSystemDataSource implements LogDatasource {

    private readonly logPath = 'logs/';
    private readonly allLongsPath = 'logs/logs-low.log';
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

        } else {
            fs.appendFileSync(this.allLongsPath, logAsJson);
        }
    }

    private getLogFromFile = (path: string): LogEntity[] => {
        const content = fs.readFileSync(path, 'utf-8');
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