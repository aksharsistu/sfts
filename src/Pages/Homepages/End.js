import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../Components/AuthProvider";
import axios from "axios";


const End = () => {
    const {stageName, placeName, BASE_URL} = useContext(AuthContext)

    const [barcode, setBarcode] = useState('');
    const [message, setMessage] = useState('')
    const [processNoOptions, setProcessNoOptions] = useState([]);
    const [selectedProcessNo, setSelectedProcessNo] = useState('');
    const [productCode, setProductCode] = useState('');
    const [reject, setReject] = useState(false)
    const [rejectionCode, setRejectionCode] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(BASE_URL + 'process/get/');
                const options = await response.data;
                setProcessNoOptions(options);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [BASE_URL]);

    useEffect(() => {
        const fetchDetails = () => {
            try {
                let index = 0
                while (processNoOptions[index].processNo !== selectedProcessNo) {
                    index++
                }
                setProductCode(processNoOptions[index].productCode_id)
            } catch (err) {
                console.error(err)
            }
        }
        fetchDetails()
    }, [processNoOptions, selectedProcessNo])

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('success... or maybe not')

    };

    return (
        <div>
            <h1>End Process</h1>
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
                        {processNoOptions.map((option) => (
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
                    <label>Rejection code:</label>
                    <input type="checkbox"
                           value={reject}
                           onChange={e => setReject(e.target.checked)}
                           className='home-checkbox'
                    />
                    <span>Reject</span>
                    <input type="text"
                           maxLength={3}
                           disabled={!reject}
                           required={reject}
                           value={rejectionCode}
                           onChange={e => setRejectionCode(e.target.value)}
                           className='home-text'
                    />
                </div>
                <button type="submit" className='home-button'>Submit</button>
            </form>
        </div>
    )
}

export default End