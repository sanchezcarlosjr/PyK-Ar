import * as React from "react";
import {
    Create,
    Datagrid,
    DeleteButton,
    Edit,
    FileField,
    FileInput,
    List,
    Show,
    useMutation,
    FormDataConsumer,
    SimpleForm,
    SimpleShowLayout,
    TextField,
    TextInput, useRecordContext, SelectInput,
} from "react-admin";
import {useCallback} from "react";
import { useFormState } from 'react-final-form';
import {LineChart, Line, XAxis, YAxis, CartesianGrid} from 'recharts';
import * as firebase from 'firebase';
import 'firebase/functions';
const PotassiumArgonAgeCalculationFilters = [
    <TextInput source="age" label="Search" alwaysOn/>,
    <TextInput source="uncertainty" label="Uncertainty"/>
];

export const PotassiumArgonAgeCalculationList = (props: any) => (
    <List {...props} filters={PotassiumArgonAgeCalculationFilters}>
        <Datagrid rowClick="edit">
            <TextField source="age"/>
            <TextField source="uncertainty"/>
            <DeleteButton label=""/>
        </Datagrid>
    </List>
);

export const PotassiumArgonAgeCalculationShow = (props: any) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="age"/>
            <TextField source="uncertainty"/>
        </SimpleShowLayout>
    </Show>
);

const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, {name: 'Page B', uv: 300, pv: 2300, amt: 2800}];

const ChartPotassiumArgonAgeMeasurement = (props: JSX.IntrinsicAttributes) => {
    const { values } = useFormState();
    return (
        <LineChart width={700} height={300} data={data}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
        </LineChart>

    );
};

export const PotassiumArgonAgeCalculationsCreate = (props: any) => {
    const [mutate] = useMutation();
    const save = useCallback(
        async (values) => {
            const calculateAgeByPotassiumArgon = firebase.functions().httpsCallable('calculateAgeByPotassiumArgon');
            calculateAgeByPotassiumArgon()
                .then((result) => {
                    const sanitizedMessage = result.data.text;
                });
           console.log(values);
           return true;
        },
        [mutate],
    );
    return (
    <Create {...props}>
        <SimpleForm save={save}>
            <FileInput accept=".csv" source="experiments" multiple label="Mass spectrometer measurements">
                <FileField source="src" title="title"/>
            </FileInput>
            <FormDataConsumer>
                {({ formData, ...rest }) => !!formData.experiments && formData.experiments.length > 0 && formData.experiments.length % 2 == 0 &&
                    <ChartPotassiumArgonAgeMeasurement />
                }
            </FormDataConsumer>

        </SimpleForm>
    </Create>
)};

export const PotassiumArgonCalculationsEdit = (props: any) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="age"/>
            <TextInput source="uncertainty"/>
        </SimpleForm>
    </Edit>
);