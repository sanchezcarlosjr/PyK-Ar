import {Cycle} from "./Experiment";

export interface Timeline {
    time: number;
    M36?: number;
    M38?: number;
    M40?: number;
}

export const measureInTime = async (experiments: Promise<Cycle[]>[]) => experiments.map(async (promise: Promise<Cycle[]>) => {
    const cycles: Cycle[] = await promise;
    return cycles.map((cycle: Cycle) => {
        return {
            time: Number(cycle.time),
            [`${cycle.peak}`]: Number(cycle.intensity)
        } as Timeline
    });
});