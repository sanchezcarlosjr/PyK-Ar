import {PotassiumArgonAgeParameter} from "./Experiment";

export abstract class PotassiumArgonAgeCalculationService {
    abstract call(potassiumArgonAgeParameter: PotassiumArgonAgeParameter): Promise<{ data: any }>;
}