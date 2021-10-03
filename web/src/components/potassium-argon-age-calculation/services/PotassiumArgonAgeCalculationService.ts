export interface Experiment {
    measurements: string[];
}

export abstract class PotassiumArgonAgeCalculationService {
    abstract call(experiments: Experiment[]): Promise<{data: any}>;
}