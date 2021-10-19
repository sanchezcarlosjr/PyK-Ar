import {Experiment} from "./Experiment";

export abstract class PotassiumArgonAgeCalculationService {
    abstract call(experiments: Experiment[]): Promise<{data: any}>;
}