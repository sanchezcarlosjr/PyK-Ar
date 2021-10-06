import * as React from "react";
import {Create, FileField, FileInput, FormDataConsumer, SimpleForm, useNotify, useRedirect,} from "react-admin";
import {useFormState} from 'react-final-form';
import {CartesianGrid, Line, LineChart, XAxis, YAxis} from 'recharts';
import {Spectrum} from "./services/Spectrum";
import {ascToExperimentPipe} from "./services/AscToJson";
import firebase from "gatsby-plugin-firebase";
import {Experiment} from "./services/Experiment";
import {readWebFilesPipe} from "./services/ReadWebFilesPipe";

const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, {name: 'Page B', uv: 300, pv: 2300, amt: 2800}];

const ChartPotassiumArgonAgeMeasurement = (props: JSX.IntrinsicAttributes) => {
    const {values} = useFormState();
    return (
        <LineChart width={700} height={300} data={data}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
            <Line type="monotone" dataKey="uv" stroke="#8884d8"/>
            <Line type="monotone" dataKey="pv" stroke="#82ca9d"/>
        </LineChart>

    );
};

const validateExperimentCreation = (values: { experiments: File[] }) => {
    const errors = {};
    if (values.experiments && values.experiments.length % 2 != 0) {
        // @ts-ignore
        errors.experiments = 'The number of experiments should be even.';
    }
    return errors;
};

export const PotassiumArgonAgeCalculationsCreate = (props: any) => {
    const redirect = useRedirect();
    const notify = useNotify();
    const spectrum = new Spectrum();
    const save = () => {
        spectrum.map(readWebFilesPipe, ascToExperimentPipe).subscribe({
            next: (experiments: Experiment[]) => {
                const functions = firebase.app().functions('us-west4');
                const calculateAgeByPotassiumArgon = functions.httpsCallable('calculate_age_by_potassium_argon');
                return calculateAgeByPotassiumArgon(experiments)
                    .then(() =>
                        redirect('/potassium-argon-age-calculations')
                    ).catch(() => notify("Oops! Something went wrong. Please try again later.", "error"));
            }
        });
        return (t: { experiments: { rawFile: File }[] }) => {
            return spectrum.next(...t.experiments);
        };
    };
    return (
        <Create {...props}>
            <SimpleForm save={save()} validate={validateExperimentCreation}>
                <FileInput accept=".asc" source="experiments" multiple label="Mass spectrometer measurements">
                    <FileField source="src" title="title"/>
                </FileInput>
                <FormDataConsumer>
                    {({
                          formData,
                          ...rest
                      }) => !!formData.experiments && formData.experiments.length > 0 && formData.experiments.length % 2 == 0 &&
                        <ChartPotassiumArgonAgeMeasurement/>
                    }
                </FormDataConsumer>
            </SimpleForm>
        </Create>
    )
};