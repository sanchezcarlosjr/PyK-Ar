
interface Subscriber {
    next: (t: any) => any
}

interface MapFunction {
    (t: any): any;
}

export class Spectrum {
    private subscribers: Subscriber[] = [];
    private mapFunctions: MapFunction[] = [];

    async next(...acc: any) {
        acc = await this.execute(...acc);
        this.subscribers.forEach((subscriber) => subscriber.next(acc))
    }

    map(...f: MapFunction[]) {
        this.mapFunctions = f;
        return this;
    }

    async execute<T>(...acc: { rawFile: File }[]| any[]) {
        for (const mapFunctions of this.mapFunctions) {
            acc =  await mapFunctions(acc);
        }
        return Promise.all(acc) as unknown as Promise<T>;
    }

    subscribe(subscriber: Subscriber) {
        this.subscribers.push(subscriber);
    }
}