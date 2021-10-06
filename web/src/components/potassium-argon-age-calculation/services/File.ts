export abstract class File {
    constructor(protected file: string) {
    }

    abstract read(): Promise<string>;
}