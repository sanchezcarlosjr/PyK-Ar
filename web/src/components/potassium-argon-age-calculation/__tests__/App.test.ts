import fs from 'fs';
import path from 'path';
import {Spectrum} from "../services/Spectrum";
import {File} from "../services/File";
import {ascToExperimentPipe} from "../services/AscToJson";

export class NodeFile extends File {
    read(): Promise<string> {
        return new Promise((resolve, reject) => {
            let data: Buffer;
            fs.createReadStream(path.resolve(__dirname, this.file))
                .on('data', async (row) => {
                    data = <Buffer>row;
                })
                .on('end', () => {
                    resolve(data.toString());
                });
        });
    }
}

test('it should map new files', async () => {
    const spectrum = new Spectrum();
    spectrum.subscribe({
        next: (files: any[]) => files.forEach((file) => expect(file).toMatch(/MCAT 5400/))
    });
    await spectrum.map(
        (files) => files.map((file: NodeFile) => file.read())
    ).next(new NodeFile("7A.asc"), new NodeFile("7B.asc"));
});

interface Cycle {
    cycle: string;
    mass: string;
    peak: string;
    measure: string;
    inty: string;
    time: string;
}

interface Experiment {
    cycles: Cycle[];
    analysis_date: string;
    spectrum: string;
    sample_id: string;
    type: string;
    spectrum_user_name: string;
    file_name: string;
}

test('it should be transform from ASC to Json', async () => {
    const spectrum = new Spectrum();
    spectrum.subscribe({
        next: (experiments: Experiment[]) => {
            const experiment = experiments[0];
            expect(experiment.spectrum).toBe("MCAT 5400 ");
            expect(experiment.type).toBe("Sample Analysis");
            expect(experiment.file_name).toBe("7A");
            expect(experiment.sample_id).toBe("BCO AIRE ");
            expect(experiment.analysis_date).toStrictEqual(new Date(2019, 0, 8));
            expect(experiment.cycles[0].cycle).toBe("1");
            expect(experiment.cycles[0].mass).toBe("3.54675500E+001");
            expect(experiment.cycles[0].peak).toBe("ZERO1");
            expect(experiment.cycles[0].measure).toBe("RawData");
            expect(experiment.cycles[0].time).toBe("1.73016000E-006");
        }
    });
    await spectrum.map(
        (files: File[]) => files.map((file: NodeFile) => file.read()),
        ascToExperimentPipe
    ).next(new NodeFile("7A.asc"));
});