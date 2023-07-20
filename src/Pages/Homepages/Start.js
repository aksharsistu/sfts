import React, {useContext, useEffect, useState} from 'react';
import AuthContext from "../../Components/AuthProvider";

const App = () => {
    const {stageName, placeName, BASE_URL, processNos} = useContext(AuthContext)

    const [selectedProcessNo, setSelectedProcessNo] = useState('');
    const [productCode, setProductCode] = useState('');
    const [barcode, setBarcode] = useState('');
    const [permanentBarcode, setPermanentBarcode] = useState('')
    const [message, setMessage] = useState('')


    useEffect(() => {
        const fetchDetails = () => {
            try {
                let index = 0
                while (processNos[index].processNo !== selectedProcessNo) {
                    index++
                }
                setProductCode(processNos[index].productCode_id)
            } catch (err) {
                console.error(err)
            }
        }
        fetchDetails()
    }, [processNos, selectedProcessNo])

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('response from backend')
        // Send to backend for logging

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
                        {processNos.map((option) => (
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
                <div>
                    <label>Permanent Barcode: (for packaging)</label>
                    <input
                        id="barcode"
                        type="text"
                        value={permanentBarcode}
                        onChange={(e) => setPermanentBarcode(e.target.value)}
                        className='home-text'
                        maxLength={13}
                        disabled={!stageName.includes('PCK')}
                        required={stageName.includes('PCK')}
                    />
                </div>
                <button type="submit" className='home-button'>Submit</button>
            </form>
        </div>
    );
};

export default App;
