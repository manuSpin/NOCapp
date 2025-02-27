import { LogSeverityLevel } from "./log-severity-level.enum";
import { LogEntity } from "./log.entity";

describe('LogEntity', () => {
    const dataObj = {
        origin: 'log.entity.test.ts',
        message: 'Test message',
        level: LogSeverityLevel.low
    };

    test('should create a LogEntity instance', () => {
        const log = new LogEntity(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.level).toBe(dataObj.level);
        expect(log.createdAt).toBeInstanceOf(Date);
    });

    test('should create a LogEntity instance from JSON', () => {
        const json = `{"message":"Service http://www.google.es working","level":"low","createdAt":"2025-02-27T07:43:50.181Z","origin":"check-service.ts"}`;

        const log = LogEntity.fromJson(json);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe('Service http://www.google.es working');
        expect(log.origin).toBe('check-service.ts');
        expect(log.level).toBe('low');
        expect(log.createdAt).toBeInstanceOf(Date);
    });

    test('should create a LogEntity instance from an Object', () => {
        const log = LogEntity.fromObject(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.level).toBe(dataObj.level);
        expect(log.createdAt).toBeInstanceOf(Date);
    });
});