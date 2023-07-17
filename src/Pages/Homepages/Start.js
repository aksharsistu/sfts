import React, {useContext, useEffect, useState} from 'react';
import AuthContext from "../../Components/AuthProvider";

const App = () => {
    const {stageName, placeName, BASE_URL, jsonData} = useContext(AuthContext)

    const [selectedProcessNo, setSelectedProcessNo] = useState('');
    const [productCode, setProductCode] = useState('');
    const [barcode, setBarcode] = useState('');
    const [message, setMessage] = useState('')


    useEffect(() => {
        const fetchDetails = () => {
            try {
                let index = 0
                while (jsonData[index].processNo !== selectedProcessNo) {
                    index++
                }
                setProductCode(jsonData[index].productCode_id)
            } catch (err) {
                console.error(err)
            }
        }
        fetchDetails()
    }, [jsonData, selectedProcessNo])

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('success... or maybe not')
        // Process the form submission here
        // You can access the selectedProcessNo, productCode, stage, and barcode values
        // and send them to the backend or perform any other desired actions
    };

    return (
        <div>
            <h1>Start Process</h1>
            <form onSubmit={handleSubmit} className='home-form'>
                <span className="message">{message}</span>
                <div>
                    <label htmlFor="processNo">Process No:</label>
                    <select
                        id="processNo"
                        value={selectedProcessNo}
                        onChange={(e) => setSelectedProcessNo(e.target.value)}
                        className='home-select'
                        required
                    >
                        <option value="">Select a process number</option>
                        {jsonData.map((option) => (
                            <option key={option.processNo} value={option.processNo}>
                                {option.processNo}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="productCode">Product Code:</label>
                    <input
                        id="productCode"
                        type="text"
                        value={productCode}
                        className='home-text'
                        disabled
                    />
                </div>
                <div>
                    <label htmlFor="stage">Stage:</label>
                    <input
                        id="stage"
                        type="text"
                        value={stageName + ' - ' + placeName}
                        className='home-text'
                        disabled
                    />
                </div>
                <div>
                    <label htmlFor="barcode">Barcode:</label>
                    <input
                        id="barcode"
                        type="text"
                        value={barcode}
                        onChange={(e) => setBarcode(e.target.value)}
                        className='home-text'
                        maxLength={12}
                        required
                    />
                </div>
                <button type="submit" className='home-button'>Submit</button>
            </form>
        </div>
    );
};

export default App;
