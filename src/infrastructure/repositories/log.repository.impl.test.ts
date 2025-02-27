import { LogEntity, LogSeverityLevel } from "../../domain/entities";
import { LogRepositoryImpl } from "./log.repository.impl";

describe('LogRepositoryImpl', () => {
    const mockLogDatasource = { saveLog: jest.fn(), getLogs: jest.fn() };
    const logRepositoryImpl = new LogRepositoryImpl(mockLogDatasource);

    const log = new LogEntity({
        origin: 'log.entity.test.ts',
        message: 'Test message',
        level: LogSeverityLevel.low
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should call the datasource with arguments when saveLog is call', async () => {
        await logRepositoryImpl.saveLog(log);

        expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    });

    test('should call the datasource with arguments when getLogs is call', async () => {
        await logRepositoryImpl.getLogs(LogSeverityLevel.low);

        expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(LogSeverityLevel.low);
    });
});