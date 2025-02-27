// import { SendMailOptions } from "../../domain/entities";
// import { EmailService } from "./email.service";
// import nodemailer from 'nodemailer';

// describe('EmailService', () => {

//     //TODO revisar tests
//     const emailService = new EmailService();
//     const mockSendMail = jest.fn();

//     nodemailer.createTransport = jest.fn().mockReturnValue({ sendMail: mockSendMail });

//     beforeEach(() => {
//         jest.clearAllMocks();
//     });

//     test('sould send email', async () => {

//         const options: SendMailOptions = {
//             to: 'mail@mail.com',
//             subject: 'Test mail',
//             htmlBody: '<h1>Test</h1>'
//         };

//         await emailService.sendEmail(options);

//         expect(mockSendMail).toHaveBeenCalledWith({
//             to: 'mail@mail.com',
//             subject: 'Test mail',
//             html: '<h1>Test</h1>',
//             attachments: expect.any(Array),
//         });
//     });

//     test('send email with attachments', async () => {
//         await emailService.sendEmailWithFileSystemLogs('mail@mail.com');

//         expect(mockSendMail).toHaveBeenCalledWith({
//             to: 'mail@mail.com',
//             subject: 'Logs del servidor',
//             html: `<h3>Logs de sistema - NOC</h3>
//             <p>Esto es una prueba de envio de emails de mi aplicación</p>
//             <p>Ver logs adjuntos</p>`,
//             attachments: expect.arrayContaining([{ filename: 'logs-all.log', path: './logs/logs-low.log' },
//             { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
//             { filename: 'logs-high.log', path: './logs/logs-high.log' }]),
//         });
//     });
// });