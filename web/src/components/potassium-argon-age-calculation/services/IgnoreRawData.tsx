import {Cycle} from "./Experiment";

export const ignoreRawData = async (experiments: Promise<Cycle[]>[]) => experiments.map(async (promise: Promise<Cycle[]>) => {
    const cycles: Cycle[] = await promise;
    return cycles.filter((cycle) => cycle.measure == "Corrected");
});