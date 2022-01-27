import {DateInput, Edit, NumberInput, SimpleForm, TextInput} from "react-admin";
import * as React from "react";

export const PotassiumArgonCalculationsEdit = (props: any) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="id"/>
            <DateInput source="analysis_date" label="Analysis date"/>
            <TextInput source="spectrum_user_name"/>
            <NumberInput source="age" disabled/>
            <NumberInput source="age_standard_deviation" disabled/>
            <NumberInput source="ar36_divides_ar38_t" disabled/>
            <NumberInput source="Ar40_Ar38_ratio" disabled/>
            <NumberInput source="Ar38_Ar36_ratio" disabled/>
            <NumberInput source="Ar40_Ar38_ratios_in_the_gas_mixture" disabled/>
            <NumberInput source="Ar38_Ar36_ratios_in_the_gas_mixture" disabled/>
            <NumberInput source="Ar40" disabled/>
            <NumberInput source="Ar38" disabled/>
            <NumberInput source="Ar36" disabled/>
            <NumberInput source="ar40_divides_ar38_t" disabled/>
            <NumberInput source="moles_Ar38_in_tracer" disabled/>
            <NumberInput source="percentage_of_Ar40_rad_in_the_analysis" disabled/>
            <NumberInput source="delta" disabled/>
            <NumberInput source="spectrum" disabled/>
            <NumberInput source="total_Ar40" disabled/>
            <NumberInput source="moles_of_K40" disabled/>
            <NumberInput source="weight" disabled/>
            <TextInput source="updatedby" disabled/>
            <TextInput source="createdby" disabled/>
            <TextInput source="lastupdate" disabled/>
            <TextInput source="createdate" disabled/>
        </SimpleForm>
    </Edit>
);