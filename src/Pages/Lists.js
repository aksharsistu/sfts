import React, {useContext} from 'react';
import FormComponent from '../Components/FormComponent';
import AuthContext from "../Components/AuthProvider";
import './Styles/lists.css'

/**
 * @description Collection of 4 FormComponent s to make a webpage for editing data.
 * @returns {JSX.Element}
 * @constructor
 */
const Lists = () => {
    const {BASE_URL} = useContext(AuthContext)

    return (
        <div>
            <FormComponent
                apiUrl={BASE_URL + "data/line/"}
                formName="Line Form"
                fields={[
                    {name: 'line_code', label: 'Line Code', type: 'text'},
                    {name: 'line_description', label: 'Line Description', type: 'text'},
                ]}
                tableHeaders={['Line_Code', 'Line_Description']}
            />
            <FormComponent
                apiUrl={BASE_URL + "data/product/"}
                formName="Product Form"
                fields={[
                    {name: 'productCode', label: 'Product Code', type: 'text'},
                    {name: 'FgCode', label: 'FG Code', type: 'text'},
                    {name: 'productDesc', label: 'Product Description', type: 'text'},
                    {name: 'processId', label: 'Stages', type: 'text'}
                ]}
                tableHeaders={['Product_Code', 'FG_Code', 'Product_Description', 'Stages']}
            />
            <FormComponent
                apiUrl={BASE_URL + "data/rejection/"}
                formName="Rejection Form"
                fields={[
                    {name: 'rejection_code', label: 'Rejection Code', type: 'text'},
                    {name: 'rejection_description', label: 'Rejection Description', type: 'text'},
                ]}
                tableHeaders={['Rejection_Code', 'Rejection_Description']}
            />
            <FormComponent
                apiUrl={BASE_URL + "data/rework/"}
                formName="Rework Form"
                fields={[
                    {name: 'rework_code', label: 'Rework Code', type: 'text'},
                    {name: 'rework_description', label: 'Rework Description', type: 'text'},
                ]}
                tableHeaders={['Rework_Code', 'Rework_Description']}
            />
        </div>
    );
};

export default Lists;
