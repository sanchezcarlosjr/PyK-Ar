import * as React from "react";
import {
    Create,
    Datagrid,
    DeleteButton,
    Edit,
    List,
    Show,
    FileField,
    SimpleForm,
    SimpleShowLayout,
    TextField,
    FileInput,
    TextInput,
} from "react-admin";


const PotassiumArgonAgeCalculationFilters = [
    <TextInput source="age" label="Search" alwaysOn />,
    <TextInput source="uncertainty" label="Uncertainty"  />
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

export const PotassiumArgonAgeCalculationsCreate = (props: any) => (
    <Create {...props}>
        <SimpleForm>
            <FileInput accept=".csv" source="files_multiple" multiple label="Mass spectrometer measurements">
                <FileField source="src" title="title" />
            </FileInput>
        </SimpleForm>
    </Create>
);

export const PotassiumArgonCalculationsEdit = (props: any) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="age"/>
            <TextInput source="uncertainty"/>
        </SimpleForm>
    </Edit>
);