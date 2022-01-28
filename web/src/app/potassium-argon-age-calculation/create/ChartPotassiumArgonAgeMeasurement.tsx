import {FileInputFormat, readWebFilesPipe} from "../services/ReadWebFilesPipe";
import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import {useVersion} from "react-admin";
import {Spectrum} from "../services/Spectrum";
import {ascToExperimentPipe} from "../services/AscToJson";
import {flatCycles} from "../services/FlatCycles";
import {ignoreRawData} from "../services/IgnoreRawData";
import {makeChart} from "../services/MakeChart";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line} from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: false
        },
    },
};


export const ChartPotassiumArgonAgeMeasurement = ({experiment}: { experiment: FileInputFormat }) => {
    const [state, setState] = useState({
        labels: ['M36', 'M38', 'M40'],
        datasets: [
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
                label: 'M38',
                data: [],
                borderColor: '#af3c0b',
                backgroundColor: '#2a5578',
            }
        ],
    });
    const version = useVersion();
    const mapFiles = useCallback(async () => {
        const spectrum = new Spectrum();
        const timeline = (await spectrum.map(
            readWebFilesPipe,
            ascToExperimentPipe,
            flatCycles,
            ignoreRawData,
            makeChart).execute<{labels: any[], datasets: any[]}[]>(experiment));
        setState(timeline[0]);
    }, [experiment]);
    useEffect(() => {
        mapFiles();
    }, [version]);
    return (
        <div>
            <h3>{experiment.rawFile.name}</h3>
            <Line options={options} data={state} />
        </div>
    );
};