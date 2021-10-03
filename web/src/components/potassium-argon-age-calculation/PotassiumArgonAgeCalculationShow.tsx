import {Show, SimpleShowLayout, TextField} from "react-admin";
import * as React from "react";

export const PotassiumArgonAgeCalculationShow = (props: any) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="age"/>
            <TextField source="uncertainty"/>
        </SimpleShowLayout>
    </Show>
);