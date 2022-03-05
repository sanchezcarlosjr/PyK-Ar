import * as React from "react";
import {
    Create,
    FileField,
    FileInput,
    FormDataConsumer,
    NumberInput,
    RadioButtonGroupInput,
    SimpleForm,
    useNotify,
    useRedirect
} from "react-admin";
import {useForm} from 'react-final-form';
import {Spectrum} from "../services/Spectrum";
import {ascToExperimentPipe} from "../services/AscToJson";
import {FileInputFormat, readWebFilesPipe} from "../services/ReadWebFilesPipe";
import {ChartPotassiumArgonAgeMeasurement} from "./ChartPotassiumArgonAgeMeasurement";
import {
    PotassiumArgonAgeCalculationCloudFunctionService
} from "../services/PotassiumArgonAgeCalculationCloudFunctionService";
import {Experiment} from "../services/Experiment";
import Box from '@material-ui/core/Box';
import {useEffect} from "react";

const validateExperimentCreation = (values: { experiments: File[] }) => {
    const errors = {};
    if (values.experiments && values.experiments.length % 2 != 0) {
        // @ts-ignore
        errors.experiments = 'The number of experiments should be even.';
    }
    return errors;
};

function calculateGramsOfKFrom(K2O: number, W: number) {
    if (K2O == undefined || W == undefined) {
        return 0;
    }
    const gramsKDividesGramsK2O = 0.8301;
    return (K2O * gramsKDividesGramsK2O * W) / 100;
}

const GramsOfK = ({K20, weight}: { K20: number, weight: number }) => {
    const {change} = useForm();
    useEffect(() => {
        change("gramsOfK", calculateGramsOfKFrom(K20, weight));
    });
    return <NumberInput source="gramsOfK" label="Grams of K (potassium)" fullWidth disabled/>;
}

export const PotassiumArgonAgeCalculationsCreate = (props: any) => {
    const redirect = useRedirect();
    const notify = useNotify();
    const save = async (t: {
                            delta: number,
                            weight: number,
                            gramsOfK: number,
                            experiments: { rawFile: File }[]
                        }
    ) => {
        const experiments = await new Spectrum().map(readWebFilesPipe, ascToExperimentPipe).execute<Experiment[]>(...t.experiments);
        const service = new PotassiumArgonAgeCalculationCloudFunctionService();
        return service.call({
            delta: t.delta,
            weight: t.weight,
            gramsOfK: t.gramsOfK,
            experiments
        }).then(() => redirect('/potassium-argon-age-calculations')
        ).catch(() => notify("Oops! Something went wrong. Please try again later.", "error"));
    };
    return (
        <Create {...props}>
            <SimpleForm save={save} validate={validateExperimentCreation}>
                <NumberInput source="delta" label="Delta" fullWidth
                             helperText="If you need scientist notation, then you must use E notation"/>
                <NumberInput source="weight" label="Weight (Grams)" fullWidth
                             helperText="If you need scientist notation, then you must use E notation"/>
                <RadioButtonGroupInput source="k_type" defaultValue={"K"} choices={[
                    {id: 'K', name: 'Grams of K'},
                    {id: '%K2O', name: '%K2O'},
                ]} fullWidth/>
                <FormDataConsumer>
                    {({formData}) => {
                        if (formData.k_type === "K") {
                            return <NumberInput source="gramsOfK" label="Grams of K (potassium)" fullWidth
                                                helperText="If you need scientist notation, then you must use E notation"/>;
                        }
                        return (
                            <>
                                <NumberInput source="K2O" label="%K2O" fullWidth
                                             helperText="If you need scientist notation, then you must use E notation"/>
                                <GramsOfK K20={formData.K2O} weight={formData.weight}/>
                            </>
                        );
                    }}
                </FormDataConsumer>
                <FileInput accept=".asc" source="experiments" multiple label="Mass spectrometer measurements">
                    <FileField source="src" title="title"/>
                </FileInput>
                <FormDataConsumer>
                    {({
                          formData
                      }) => !!formData.experiments && formData.experiments.length > 0 && formData.experiments.length == 2 &&
                        formData.experiments.map((experiment: FileInputFormat) =>
                            <Box css={{m: "2rem"}}>
                                <ChartPotassiumArgonAgeMeasurement experiment={experiment}/>
                            </Box>
                        )
                    }
                </FormDataConsumer>
            </SimpleForm>
        </Create>
    )
};