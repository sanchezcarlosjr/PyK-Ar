import {Experiment} from "./Experiment";

export const ascToExperimentPipe = (files: Promise<string>[]) => files.map(async (promise) => {
    const file = await promise;
    let csvLine = 0;
    let matcher = "-\r";
    const tokens = file.split("\n").map((line, index) => {
        if (line == matcher) {
            csvLine = index;
        }
        return line.replaceAll("\r", "").split('"').filter(t => t != "" && t != " ") ;
    })
    let csv = tokens.slice(csvLine+2, tokens.length-2);
    const [spectrum, type] = tokens[0];
    const [, analysis_date] = tokens[1];
    const [, file_name] = tokens[2];
    const [, sample_id] = tokens[3];
    const spectrum_user_name = (tokens[6] as string[]).join(" ");
    return {
        analysis_date: new Date(analysis_date).toISOString(),
        spectrum,
        file_name,
        sample_id,
        type,
        spectrum_user_name,
        cycles: csv.filter((t) => t.length > 0).map((t) => {
            const [,inty, ,time] = t[4].split(" ");
            return {
                cycle: t[0].replaceAll(" ", ""),
                mass: t[1].replaceAll(" ", ""),
                peak: t[2].replaceAll(" ", ""),
                measure: t[3].replaceAll(" ", ""),
                intensity: inty,
                time
            }
        })
    } as Experiment;
});