import { envs } from "./envs.plugin";

describe('envs.plugin.ts', () => {
    test('should return envs options', () => {
        expect(envs).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'manuel.fcarmona.91@gmail.com',
            MAILER_SECRET_KEY: 'faza mctt mits glol',
            PROD: false,
            MONGO_URL: 'mongodb+srv://admin:admin@cluster0.xgofadg.mongodb.net/cursos',
            MONGO_DB_NAME: 'NOC_TEST',
            MONGO_USER: 'manuSpin',
            MONGO_PASS: 'M4n0lin@123'
          });
    });

    test('should return error if not found env', async() => {
        jest.resetModules();
        process.env.PORT === 'ABC';

        try {
            await import('./envs.plugin');
            
        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer'); 
        }
    });
});