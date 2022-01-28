import fs from 'fs';
import path from 'path';
import {Spectrum} from "../services/Spectrum";
import {ascToExperimentPipe} from "../services/AscToJson";
import {Experiment} from "../services/Experiment";
import {flatCycles} from "../services/FlatCycles";
import {ignoreRawData} from "../services/IgnoreRawData";
import {makeChart} from "../services/MakeChart";

export abstract class File {
    constructor(protected file: string) {
    }
    abstract read(): Promise<string>;
    abstract write(data: any): Promise<boolean>;
}

export class NodeFile extends File {
    write(data: any): Promise<boolean> {
        return new Promise((resolve, reject) => {
            fs.writeFile(this.file, JSON.stringify(data), (err: any) => {
                if (err) {
                    return reject(err);
                }
                resolve(true);
            });
        });
    }
    read(): Promise<string> {
        return new Promise((resolve, reject) => {
            let data: Buffer;
            fs.createReadStream(path.resolve(__dirname, this.file))
                .on('data', async (row: Buffer| string) => {
                    data = <Buffer>row;
                })
                .on('end', () => {
                    resolve(data.toString());
                });
        });
    }
}

test('it should be transform from ASC to Json as subscriber', async () => {
    const spectrum = new Spectrum();
    spectrum.subscribe({
        next: async (experiments: Experiment[]) => {
            const expectedFile = new NodeFile(__dirname+"/experiment7A.json");
            const expectedExperiment = await expectedFile.read().then((file) => JSON.parse(file));
            expect(experiments[0]).toEqual(expectedExperiment);
        }
    });
    await spectrum.map(
        (files: File[]) => files.map((file: NodeFile) => file.read()),
        ascToExperimentPipe
    ).next(new NodeFile("7A.asc"));
});

test('it should be transform from ASC to Json as function', async () => {
    const spectrum = new Spectrum();
    const experiments = await spectrum.map(
        (files: File[]) => files.map((file: NodeFile) => file.read()),
        ascToExperimentPipe
    ).execute<Experiment[]>(new NodeFile("7A.asc"));
    const expectedFile = new NodeFile(__dirname+"/experiment7A.json");
    const expectedExperiment = await expectedFile.read().then((file) => JSON.parse(file));
    expect(experiments[0]).toEqual(expectedExperiment);
});


test('it should be transform to chart', async () => {
    const spectrum = new Spectrum();
    const timeline = (await spectrum.map(
        (files: File[]) => files.map((file: NodeFile) => file.read()),
        ascToExperimentPipe,
        flatCycles,
        ignoreRawData,
        makeChart
    ).execute<any>(new NodeFile("7A.asc")))[0];
    const expectedFile = new NodeFile(__dirname+"/experiment7A.json");
    const experiment: Experiment = await expectedFile.read().then((file) => JSON.parse(file));
    expect(timeline[0].time).toEqual(Number(experiment.cycles[9].time));
    expect(timeline[0].M36).toEqual(Number(experiment.cycles[9].intensity));
    expect(timeline[1].time).toEqual(Number(experiment.cycles[10].intensity));
    expect(timeline[1].M38).toEqual(Number(experiment.cycles[10].intensity));
    expect(timeline[2].time).toEqual(Number(experiment.cycles[11].time));
    expect(timeline[2].M40).toEqual(Number(experiment.cycles[11].intensity));
    expect(timeline[45].time).toEqual(Number(experiment.cycles[189].time));
    expect(timeline[45].M36).toEqual(Number(experiment.cycles[189].intensity));
    expect(timeline[46].time).toEqual(Number(experiment.cycles[190].time));
    expect(timeline[46].M38).toEqual(Number(experiment.cycles[190].intensity));
    expect(timeline[47].time).toEqual(Number(experiment.cycles[191].time));
    expect(timeline[47].M40).toEqual(Number(experiment.cycles[191].intensity));
});
