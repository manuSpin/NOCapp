interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {

    constructor(private readonly successCallBack: SuccessCallback,
        private readonly errorCallback: ErrorCallback) { }


    async execute(url: string): Promise<boolean> {

        try {
            const requ = await fetch(url);
            if (!requ.ok) {
                throw new Error(`Error on chec service ${url}`);

            }

            this.successCallBack();
            return true;

        } catch (error) {
            console.log('Error:', { error });
            this.errorCallback(`${error}`);
            return false;
        }


    }
}