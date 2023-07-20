import React, {useEffect, useState} from 'react';
import axios from 'axios';

/**
 *
 * @param apiUrl Backend base URl
 * @param formName Title of the form
 * @param fields Fields along with labels. Field name will be used to parse backend data sent by the server.
 * So it should be same as the Model field names in Django
 * @param tableHeaders Headers of the table
 * @returns {JSX.Element} A Form with a table on the side.
 */
const FormComponent = ({apiUrl, formName, fields, tableHeaders}) => {
    const [formData, setFormData] = useState({});
    const [data, setData] = useState([]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevFormData) => ({...prevFormData, [name]: value.toUpperCase()}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${apiUrl}set/`, formData)
            .then(() => {
                fetchFormData();
                setFormData({});
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleDelete = (id) => {
        axios.post(`${apiUrl}delete/`, {line_code: id})
            .then(() => {
                fetchFormData();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const fetchFormData = () => {
        axios.get(`${apiUrl}get/`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        fetchFormData();
    }, []);

    return (<>
            <h2>{formName}</h2>
            <div className='list-container'>
                <form onSubmit={handleSubmit} className='list-form'>
                    {fields.map((field) => (
                        <div key={field.name}>
                            <label htmlFor={field.name}>{field.label}:</label>
                            <input
                                type={field.type}
                                id={field.name}
                                name={field.name}
                                value={formData[field.name] || ''}
                                onChange={handleChange}
                                className='list-input'
                                required
                            />
                        </div>
                    ))}
                    <div>
                        <button type="submit" className='list-button'>Submit</button>
                    </div>
                </form>
                <div className="list-table-container">
                    <table className='list-table'>
                        <thead>
                        <tr>
                            {tableHeaders.map((header) => (
                                <th key={header}>{header}</th>
                            ))}
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((item) => (
                            <tr key={item[fields[0].name]}>
                                {fields.map((field) => (
                                    <td key={`${item[field.name]}`}>{item[field.name]}</td>
                                ))}
                                <td>
                                    <button type="button" onClick={() => handleDelete(item[fields[0].name])}
                                            className='list-button'
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    );
};

export default FormComponent;
