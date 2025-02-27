import exp from "constants";
import { CheckServiceMultiple } from "./check-service-multiple";
import { LogEntity } from "../../entities";

describe('CheckServiceMultiple UseCase', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should call successCallBack when fetch return true', async () => {
        const mockLogRepositories = [
            { saveLog: jest.fn(), getLogs: jest.fn() },
            { saveLog: jest.fn(), getLogs: jest.fn() }
        ];
        const successCallBack = jest.fn();
        const errorCallBack = jest.fn();


        const checkService = new CheckServiceMultiple(mockLogRepositories, successCallBack, errorCallBack);
        const wasOkay = await checkService.execute('http://google.es');

        expect(wasOkay).toBe(true);
        expect(successCallBack).toHaveBeenCalled();
        expect(errorCallBack).not.toHaveBeenCalled();

        expect(mockLogRepositories[0].saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepositories[1].saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    });

    test('should call errorCallback when fetch return false', async () => {
        const mockLogRepositories = [
            { saveLog: jest.fn(), getLogs: jest.fn() },
            { saveLog: jest.fn(), getLogs: jest.fn() }
        ];
        const successCallBack = jest.fn();
        const errorCallBack = jest.fn();


        const checkService = new CheckServiceMultiple(mockLogRepositories, successCallBack, errorCallBack);
        const wasOkay = await checkService.execute('http://weasfsds44fdaa.es');

        expect(wasOkay).toBe(false);
        expect(successCallBack).not.toHaveBeenCalled();
        expect(errorCallBack).toHaveBeenCalled();

        expect(mockLogRepositories[0].saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepositories[1].saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    });
});