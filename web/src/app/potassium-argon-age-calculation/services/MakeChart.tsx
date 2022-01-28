import {Cycle} from "./Experiment";

export function defaultChartState(cycles: Cycle[] = []) {
    return {
        labels: ['M36', 'M38', 'M40'],
        datasets: cycles.reduce((acc: any, cycle) => {
            if (cycle.peak == 'M36') {
                acc[0].data.push(cycle.intensity);
                return acc;
            }
            if (cycle.peak == 'M38') {
                acc[1].data.push(cycle.intensity);
                return acc;
            }
            if (cycle.peak == 'M40') {
                acc[2].data.push(cycle.intensity);
                return acc;
            }
            return acc;
        }, [
            {
                label: 'M36',
                data: [],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'M38',
                data: [],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'M40',
                data: [],
                borderColor: '#af3c0b',
                backgroundColor: '#2a5578',
            }
        ])
    };
}

export const makeChart = async (experiments: Promise<Cycle[]>[]) => experiments.map(async (promise: Promise<Cycle[]>) => {
    const cycles: Cycle[] = await promise;
    return defaultChartState(cycles) as { labels: any[], datasets: any[] };
});