import { CheckService } from "./check-service";
import { LogEntity } from "../../entities";

describe('CheckService UseCase', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should call successCallBack when fetch return true', async () => {
        const mockRepository = { saveLog: jest.fn(), getLogs: jest.fn() };
        const successCallBack = jest.fn();
        const errorCallBack = jest.fn();

        const checkService = new CheckService(mockRepository, successCallBack, errorCallBack);
        const wasOkay = await checkService.execute('http://www.google.es');

        expect(wasOkay).toBe(true);
        expect(successCallBack).toHaveBeenCalled();
        expect(errorCallBack).not.toHaveBeenCalled();

        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    });

    test('should call errorCallBack when fetch return true', async () => {
        const mockRepository = { saveLog: jest.fn(), getLogs: jest.fn() };
        const successCallBack = jest.fn();
        const errorCallBack = jest.fn();

        const checkService = new CheckService(mockRepository, successCallBack, errorCallBack);
        const wasOkay = await checkService.execute('http://www.fdgjksdfjksd52sdfj.es');

        expect(wasOkay).toBe(false);
        expect(successCallBack).not.toHaveBeenCalled();
        expect(errorCallBack).toHaveBeenCalled();

        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    });
});