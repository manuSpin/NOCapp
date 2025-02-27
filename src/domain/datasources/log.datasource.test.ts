import { LogEntity, LogSeverityLevel } from "../entities";
import { LogDatasource } from "./log.datasource";

describe('LogDatasource', () => {
    const newLog = new LogEntity({
        origin: 'log.datasource.test.ts',
        message: 'Test message',
        level: LogSeverityLevel.low
    });

    class MockLogDatasource implements LogDatasource {
        public async saveLog(log: LogEntity): Promise<void> {
            return;
        }
        public async getLogs(severyLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog];
        }
    }

    test('should test the abstract class', async() => {
        const mockLogDatasource = new MockLogDatasource();

        expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource);
        expect(mockLogDatasource).toHaveProperty('saveLog');
        expect(mockLogDatasource).toHaveProperty('getLogs');
        expect(typeof mockLogDatasource.saveLog).toBe('function');
        expect(typeof mockLogDatasource.getLogs).toBe('function');

        await mockLogDatasource.saveLog(newLog);

        const logs = await mockLogDatasource.getLogs(LogSeverityLevel.low);

        expect(logs).toHaveLength(1);
        expect(logs[0]).toBeInstanceOf(LogEntity);
    });
});