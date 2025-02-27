import fs from "fs";
import path from "path";
import { FileSystemDataSource } from "./file-system.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities";

describe('FileSystemDataSource', () => {
    const logPath = path.join(__dirname, '../../../logs');
    const log = new LogEntity({
        origin: 'file-system.datasource.test.ts',
        message: 'Test message',
        level: LogSeverityLevel.low
    });


    beforeEach(() => {
        fs.rmSync(logPath, { recursive: true, force: true });
    });

    test('should create log files if the do no exists', () => {
        new FileSystemDataSource();

        const files = fs.readdirSync(logPath);

        expect(files).toEqual(['logs-all.log', 'logs-high.log', 'logs-medium.log']);
    });

    test('should save a log in log-all.log', () => {
        const logDataSource = new FileSystemDataSource();
        logDataSource.saveLog(log);
        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');

        expect(allLogs).toContain(JSON.stringify(log));
    });

    test('should save a log in log-medium.log and medium', () => {
        const logDataSource = new FileSystemDataSource();
        log.level = LogSeverityLevel.medium;
        logDataSource.saveLog(log);
        const allMediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');

        expect(allMediumLogs).toContain(JSON.stringify(log));
    });

    test('should save a log in log-high.log and medium', () => {
        const logDataSource = new FileSystemDataSource();
        log.level = LogSeverityLevel.high;
        logDataSource.saveLog(log);
        const allHighLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');

        expect(allHighLogs).toContain(JSON.stringify(log));
    });

    test('should return all logs', async () => {
        const logDataSource = new FileSystemDataSource();
        const logLow = new LogEntity(log);
        const logMedium = new LogEntity({ message: log.message, level: LogSeverityLevel.medium, origin: log.origin });
        const logHigh = new LogEntity({ message: log.message, level: LogSeverityLevel.high, origin: log.origin });

        await logDataSource.saveLog(logLow);
        await logDataSource.saveLog(logMedium);
        await logDataSource.saveLog(logHigh);

        const lowLogs = await logDataSource.getLogs(LogSeverityLevel.low);
        const mediumLogs = await logDataSource.getLogs(LogSeverityLevel.medium);
        const highLogs = await logDataSource.getLogs(LogSeverityLevel.high);

        expect(lowLogs).toEqual(expect.arrayContaining([logLow, logMedium, logHigh]));
        expect(mediumLogs).toEqual(expect.arrayContaining([logMedium]));
        expect(highLogs).toEqual(expect.arrayContaining([logHigh]));
    });

    test('should throw an eror if severity level do not exist', async() => {
        const logDataSource = new FileSystemDataSource();
        const customSeverityLevel = 'critic' as LogSeverityLevel;

        try {
            await logDataSource.getLogs(customSeverityLevel);
        } catch (error) {
            expect(`${error}`).toContain('Error: critic inexistente');
            
        }


    });
});