import {File} from "./File";

interface Subscriber {
    next: (t: any) => any
}

interface MapFunction {
    (t: any): any;
}

export class Spectrum {
    private subscribers: Subscriber[] = [];
    private mapFunctions: MapFunction[] = [];

    async next(...files: File[]) {
        let acc: any = files;
        for (const mapFunctions of this.mapFunctions) {
            acc = mapFunctions(acc);
        }
        acc = await Promise.all(acc);
        this.subscribers.forEach((subscriber) => subscriber.next(acc))
    }

    map(...f: MapFunction[]) {
        this.mapFunctions = f;
        return this;
    }

    subscribe(subscriber: Subscriber) {
        this.subscribers.push(subscriber);
    }
}