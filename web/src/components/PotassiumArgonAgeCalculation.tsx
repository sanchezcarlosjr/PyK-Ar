import * as React from "react";
import {
    Create,
    Datagrid,
    DeleteButton,
    Edit,
    Filter,
    List,
    Show,
    FileField,
    SimpleForm,
    SimpleShowLayout,
    TextField,
    FileInput,
    TextInput,
} from "react-admin";

const PotassiumArgonAgeCalculationFilter = (props: any) => {
    return (<Filter {...props}>
        <TextInput label="Search" source="title" alwaysOn/>
    </Filter>);
};

export const PotassiumArgonAgeCalculationList = (props: any) => (
    <List {...props} filters={<PotassiumArgonAgeCalculationFilter/>}>
        <Datagrid rowClick="edit">
            <TextField source="age"/>
            <TextField source="standard"/>
            <DeleteButton label=""/>
        </Datagrid>
    </List>
);

export const PotassiumArgonAgeCalculationShow = (props: any) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="age"/>
            <TextField source="standard"/>
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
            <TextInput source="standard"/>
        </SimpleForm>
    </Edit>
);