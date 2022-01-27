import {Experiment} from "./Experiment";

export interface PotassiumArgonAgeParameter {
    delta: number;
    gramsOfK: number;
    weight: number;
    ar40_divides_ar38_t: number;
    ar36_divides_ar38_t: number;
    experiments: { rawFile: File }| Experiment [];
}

export abstract class PotassiumArgonAgeCalculationService {
    abstract call(potassiumArgonAgeParameter: PotassiumArgonAgeParameter): Promise<{ data: any }>;
}