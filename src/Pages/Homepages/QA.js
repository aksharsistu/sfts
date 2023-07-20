import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../Components/AuthProvider";


const QA = () => {
    const {stageName, placeName, BASE_URL, processNos} = useContext(AuthContext);

    const [barcode, setBarcode] = useState('');
    const [message, setMessage] = useState('')
    const [selectedProcessNo, setSelectedProcessNo] = useState('');
    const [productCode, setProductCode] = useState('');
    const [status, setStatus] = useState('0')
    const [sampleSize, setSampleSize] = useState(0)
    const [rejectionLimit, setRejectionLimit] = useState(0)
    const [batchSize, setBatchSize] = useState(0)
    const [batchNo, setBatchNo] = useState('')
    const [batch, setBatch] = useState([])
    const [selected, setSelected] = useState([])
    const [scanned, setScanned] = useState([])
    const [lock, setLock] = useState(false)

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

    const fetchBatch = async (size) => {
        // get batch based on batch size
        setBatchSize(size)
        // setBatchNo() obtained from backend
        // setBatch() obtained from backed

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(scanned.length < sampleSize) {
            if(selected[barcode]) {
                setScanned((prevState) => ([...prevState, {[barcode]: status}]))
                setBarcode('')
            } else {
                alert('Please select the barcode before scanning')
            }
        } else { // Once QA batch is completed, send to backend
            if(scanned.map((barcode) => (barcode.status)).filter((x) => x === '0').length < rejectionLimit) {
                // Accept the set
            } else {
                // Reject with rejectionCode
            }
        }
        setMessage('success... or maybe not')

    };

    return (
        <div>
            <h2>QA Process</h2>
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
                    <label>Batch No.</label>
                    <input type="text" className='home-text' value={batchNo} disabled/>
                    <span>Batch Size</span>&ensp;
                    <input type="number" className='qa-input' value={batchSize} onChange={e => fetchBatch(e.target.value)} disabled={lock}/>
                    <span>&ensp;Sample Size</span>&ensp;
                    <input type="number" className='qa-input' value={sampleSize} onChange={e => setSampleSize(e.target.value)} disabled={lock}/>
                    <span>&ensp;Rejection limit</span>&ensp;
                    <input type="number" className='qa-input' value={rejectionLimit} onChange={e => setRejectionLimit(e.target.value)} disabled={lock}/>
                    <span><input type="checkbox" value={lock} onChange={e => setLock(e.target.checked)} className='home-checkbox'/>Lock</span><br/><br/>
                </div>
                <div className='group'>
                    <div className='batch'>
                        <label>Selected: {selected.length}/{sampleSize}</label>
                        {batch.map((barcode, index) => (<label>{barcode} <input type="checkbox"
                                                                                value={selected[index]}
                                                                                onChange={e => setSelected((prevState) =>(
                                                                                    {...prevState, [barcode]: e.target.checked}
                                                                                ))}
                                                                                disabled={selected.length === sampleSize}
                                                                                required={selected.length < sampleSize}
                        /></label>))}
                    </div>
                    <div className='batch'>
                        <label>Scanned: {scanned.length}/{sampleSize}</label>
                        {scanned}
                    </div>
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
                    <label>
                        Status:&ensp;
                        <select name="status" id="status" value={status} onChange={e => setStatus(e.target.value)}
                                required
                        >
                            <option value='0'>0</option>
                            <option value='1'>1</option>
                        </select>
                        &ensp;{status === '0' ? 'Reject' : 'OK'}
                    </label>

                </div>
                <button type="submit" className='home-button'>Submit</button>
            </form>
        </div>
    )
}

export default QA