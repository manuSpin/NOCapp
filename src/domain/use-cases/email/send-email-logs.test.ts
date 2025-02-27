import { LogEntity, LogSeverityLevel } from "../../entities";
import { SendEmailLogs } from "./send-email-logs";

describe('SendEmailLogs', () => {
    const mockService = { transporter: null, sendEmail: jest.fn(), sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true) };
    const mockRepository = { saveLog: jest.fn(), getLogs: jest.fn() };

    const sendEmailLogs = new SendEmailLogs(mockService as any, mockRepository);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should return true when try to sendEmail', async () => {
        const response = await sendEmailLogs.execute('mail@mail.com');

        expect(response).toBe(true);
        expect(mockService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepository.saveLog).toHaveBeenCalledWith({
            createdAt: expect.any(Date),
            level: LogSeverityLevel.low,
            message: 'Email sent',
            origin: 'send-email-logs.ts',
        });
    });

    test('should return false when try to sendEmail', async () => {
        mockService.sendEmailWithFileSystemLogs.mockResolvedValue(false);

        const response = await sendEmailLogs.execute('mail@mail.com');

        expect(response).toBe(false);
        expect(mockService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepository.saveLog).toHaveBeenCalledWith({
            createdAt: expect.any(Date),
            level: LogSeverityLevel.medium,
            message: 'Error. Email not sent. Reason: Error: Email log not sent',
            origin: 'send-email-logs.ts',
        });
    });
});

