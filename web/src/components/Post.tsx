// in src/posts.js
import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
    Datagrid,
    List,
    Show,
    Create,
    Edit,
    Filter,
    // DisabledInput,
    SimpleShowLayout,
    SimpleForm,
    TextField,
    TextInput,
    ShowButton,
    EditButton,
    DeleteButton,
    RichTextField,
    SelectInput,
    FileField,
    FileInput
} from "react-admin";

const PostFilter = (props: any) => {
    return (<Filter {...props}>
        <TextInput label="Search" source="title" alwaysOn />
    </Filter>);
};

export const PostList = (props: any) => (
    <List {...props} filters={<PostFilter />}>
        <Datagrid>
            <TextField source="title" />
            <RichTextField source="body" />
            <ShowButton label="" />
            <EditButton label="" />
            <DeleteButton label="" />
        </Datagrid>
    </List>
);

export const PostShow = (props: any) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="title" />
            <RichTextField source="description" />
        </SimpleShowLayout>
    </Show>
);

export const PostCreate = (props: any) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" />
        </SimpleForm>
    </Create>
);

export const PostEdit = (props: any) => (
    <Edit {...props}>
        <SimpleForm>
            {/* <DisabledInput source="id" /> */}
            <TextInput source="title" />
        </SimpleForm>
    </Edit>
);