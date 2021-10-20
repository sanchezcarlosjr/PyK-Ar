import {Experiment} from "./Experiment";

export const flatCycles = async (experiments: Promise<Experiment>[]) => experiments.map(async (promise: Promise<Experiment>) => {
    const experiment = await promise;
    return experiment.cycles;
});