import * as React from "react";
import {Create, FileField, FileInput, FormDataConsumer, SimpleForm, useNotify, useRedirect} from "react-admin";
import {Spectrum} from "../services/Spectrum";
import {ascToExperimentPipe} from "../services/AscToJson";
import {FileInputFormat, readWebFilesPipe} from "../services/ReadWebFilesPipe";
import {ChartPotassiumArgonAgeMeasurement} from "./ChartPotassiumArgonAgeMeasurement";
import {PotassiumArgonAgeCalculationCloudFunctionService} from "../services/PotassiumArgonAgeCalculationCloudFunctionService";
import {Experiment} from "../services/Experiment";
import Box from '@material-ui/core/Box';

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
    const save = async (t: { experiments: { rawFile: File }[] }) => {
        const experiments = await new Spectrum().map(readWebFilesPipe, ascToExperimentPipe).execute<Experiment[]>(...t.experiments);
        const service = new PotassiumArgonAgeCalculationCloudFunctionService();
        return service.call(experiments)
            .then(() => redirect('/potassium-argon-age-calculations')
            ).catch(() => notify("Oops! Something went wrong. Please try again later.", "error"));
    };
    return (
        <Create {...props}>
            <SimpleForm save={save} validate={validateExperimentCreation}>
                <FileInput accept=".asc" source="experiments" multiple label="Mass spectrometer measurements">
                    <FileField source="src" title="title"/>
                </FileInput>
                <FormDataConsumer>
                    {({
                          formData
                      }) => !!formData.experiments && formData.experiments.length > 0 && formData.experiments.length % 2 == 0 &&
                        formData.experiments.map((experiment: FileInputFormat) =>
                            <Box css={{ m: "2rem" }}>
                                <ChartPotassiumArgonAgeMeasurement experiment={experiment}/>
                            </Box>
                        )
                    }
                </FormDataConsumer>
            </SimpleForm>
        </Create>
    )
};