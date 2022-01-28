import {FileInputFormat, readWebFilesPipe} from "../services/ReadWebFilesPipe";
import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import {useVersion} from "react-admin";
import {Spectrum} from "../services/Spectrum";
import {CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {ascToExperimentPipe} from "../services/AscToJson";
import {flatCycles} from "../services/FlatCycles";
import {ignoreRawData} from "../services/IgnoreRawData";
import {measureInTime, Timeline} from "../services/measureInTime";


export const ChartPotassiumArgonAgeMeasurement = ({experiment}: { experiment: FileInputFormat }) => {
    const [state, setState] = useState([{}]);
    const version = useVersion();
    const mapFiles = useCallback(async () => {
        const spectrum = new Spectrum();
        const timeline = (await spectrum.map(
            readWebFilesPipe,
            ascToExperimentPipe,
            flatCycles,
            ignoreRawData,
            measureInTime).execute<Timeline[][]>(experiment))[0];
        setState(timeline);
    }, [experiment]);
    useEffect(() => {
        mapFiles();
    }, [version]);
    return (
        <div style={{ display: 'flex' }}>
            <h3>{experiment.rawFile.name}</h3>
            <ResponsiveContainer width="90%" aspect={2}>
                <LineChart height={600} data={state}   margin={{
                    top: 5,
                    right: 30,
                    left: 70,
                    bottom: 5
                }}>
                    <Legend verticalAlign="top" height={36}/>
                    <Line connectNulls type="monotone" dataKey="M40" stroke="#DC143C" strokeWidth={3}/>
                    <Line connectNulls type="monotone" dataKey="M38" stroke="#8884d8" strokeWidth={3}/>
                    <Line connectNulls type="monotone" dataKey="M36" stroke="#82ca9d" strokeWidth={3}/>
                    <CartesianGrid strokeDasharray="2 2"/>
                    <XAxis dataKey="time" type='number' padding={{left: 30, right: 30}}>
                        <Label value="Time" offset={-5} position="insideBottom"/>
                    </XAxis>
                    <YAxis label={{value: 'Intensity', angle: -90, position: 'insideLeft', offset: -40}}/>
                    <Tooltip/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};