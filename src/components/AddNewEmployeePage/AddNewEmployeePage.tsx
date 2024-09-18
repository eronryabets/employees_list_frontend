import React from "react";
import {FormNewEmployee} from "../FormNewEmployee";
import {Helmet} from "react-helmet-async";



export const AddNewEmployeePage = () => {


    return (
        <div>
            <Helmet>
                <title>Add New Employee</title>
            </Helmet>
            <FormNewEmployee/>
        </div>
    );

};
