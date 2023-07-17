import React, {useContext, useEffect, useState} from 'react'
import AuthContext from "../Components/AuthProvider";
import './Styles/process.css'
import axios from "axios";
import ProcessCard from "../Components/ProcessCard";

const Process = () => {
    const {BASE_URL, fetchData} = useContext(AuthContext)
    const [processId, setProcessId] = useState([]);
    const [lineNo, setLineNo] = useState([])
    const [start, setStart] = useState([false, false, false, false, false, false])
    const [end, setEnd] = useState([false, false, false, false, false, false])
    const [qa, setQa] = useState([false, false, false, false, false, false])
    const [rework, setRework] = useState([false, false, false, false, false, false])
    const [final, setFinal] = useState(['', '', '', '', '', ''])
    const [options, setOptions] = useState([])
    const [productCode, setProductCode] = useState('')
    const [productDesc, setProductDesc] = useState('')
    const [FgCode, setFgCode] = useState('')
    const [maxQuantity, setMaxQuantity] = useState(0)
    const [processNo, setProcessNo] = useState('')
    const [date, setDate] = useState(null)
    const m = '7', y = 'N'

    useEffect(() => {
        fetchOptions()
    }, [])

    useEffect(() => {
        fetchDetails()
    }, [productCode])

    const fetchOptions = async () => {
        try {
            const response = await axios.get(BASE_URL + 'data/product/get/')
            setOptions(response.data)
        } catch (err) {
            console.error(err)
        }
    }

    const fetchDetails = () => {
        try {
            let index = 0
            while (options[index].productCode !== productCode) {
                index++
            }
            setProductDesc(options[index].productDesc)
            setFgCode(options[index].FgCode)
            setProcessId(options[index].processId.toString().split('-'))
        } catch (err) {
            setFgCode('')
            setProductDesc('')
            setProcessId([])
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const mergedProcessId = processId.map((stage, index) => (stage + lineNo[index]))
        const data = {
            start: start, end: end, qa: qa, rework: rework, final: final,
            processNo: processNo,
            processId: mergedProcessId,
            productCode: productCode,
            maxQuantity: maxQuantity,
            date: date,
            tempStartingSno: processNo + '000001',
            tempEndingSno: (parseInt(processNo + '000001') + parseInt(maxQuantity - 1)).toString(),
            permStartingSno: FgCode + y + m + '000001',
            permEndingSno: FgCode + y + (parseInt(m + '00001') + parseInt(maxQuantity - 1)).toString()
        }
        try {
            const response = await axios.post(BASE_URL + 'process/create/', data)
            alert(response.data)
            setProcessNo('')
            setProcessId([])
            setProductCode('')
            setProductDesc('')
            setFgCode('')
            setDate(null)
            setStart([false, false, false, false, false, false])
            setEnd([false, false, false, false, false, false])
            setQa([false, false, false, false, false, false])
            setRework([false, false, false, false, false, false])
            setFinal(['', '', '', '', '', ''])
            await fetchData()
        } catch (err) {
            console.error(err)
            alert(err.response.data)
        }
    }

    return <div className="body">
        <div className="process-container">
            <h2>Process Creation</h2>
            <form onSubmit={handleSubmit} className="process-form">
                <div className="process-form-row">
                    <div className="process-group">
                        <span>Process No.:</span>
                        <input type="number"
                               name='processNo'
                               id='processNo'
                               className="input-field"
                               value={processNo}
                               onChange={e => setProcessNo(e.target.value)}
                               required
                        />
                    </div>
                </div>
                <div className="process-form-row">
                    <div className="process-group">
                        <span>Date</span>
                        <input
                            type="date"
                            name='date'
                            id='date'
                            className="input-field"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="process-group">
                        <span>Max. Quantity</span>
                        <input
                            type="number"
                            name='maxQuantity'
                            id='maxQuantity'
                            className="input-field"
                            value={maxQuantity}
                            onChange={e => setMaxQuantity(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="process-form-row">
                    <div className="process-group">
                        <span>Product code</span>
                        <select name="productCode"
                                id="productCode"
                                className="input-field"
                                value={productCode}
                                onChange={e => setProductCode(e.target.value)}
                                required
                        >
                            <option value=''>Select Product Code</option>
                            {options.map((option, index) => (<option value={option.productCode} key={index}
                            >{option.productCode}</option>))}
                        </select>
                    </div>

                </div>
                <div className="process-form-row">
                    <div className="process-group">
                        <span>Product Desc</span>
                        <input
                            type="text"
                            name={'productDesc'}
                            id={'productDesc'}
                            className="input-field"
                            value={productDesc}
                            disabled
                        />
                    </div>
                </div>
                <div className="process-form-row">
                    <div className="process-group">
                        <span>FG Code</span>
                        <input
                            type="text"
                            name='FgCode'
                            id='FgCode'
                            className="input-field"
                            value={FgCode}
                            disabled
                        />
                    </div>
                </div>
                <div className="process-form-row">
                    <label>Temp Sr. No.</label>
                    <div className="process-group">
                        <span>FROM</span>
                        <input type="text"
                               className="input-field"
                               value={processNo + '000001'}
                               disabled
                        />
                        <span>TO</span>
                        <input type="text"
                               className="input-field"
                               value={parseInt(processNo + '000001') + parseInt(maxQuantity - 1)}
                               disabled
                        />
                    </div>
                </div>
                <div className="process-form-row">
                    <label>Permanent Sr. No.</label>
                    <div className="process-group">
                        <span>FROM</span>
                        <input type="text"
                               className="input-field"
                               value={FgCode + y + m + '000001'}
                               disabled
                        />
                        <span>TO</span>
                        <input type="text"
                               className="input-field"
                               value={FgCode + y + (parseInt(m + '00001') + parseInt(maxQuantity - 1)).toString()}
                               disabled
                        />
                    </div>
                </div>
                <h2>Stage Selection</h2>
                <div className="process-form-row">
                    <table>
                        <thead>
                        <tr>
                            <th>Stage</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>QA</th>
                            <th>Rework</th>
                            <th>Final</th>
                        </tr>
                        </thead>
                        <tbody>
                        {processId.map((stage, index) => (
                            <tr key={index}>
                                <td>{stage}<input type="number" value={lineNo[index]} onChange={(e) => {
                                    let newLineNo = lineNo.slice()
                                    newLineNo[index] = e.target.value
                                    setLineNo(newLineNo)
                                }} className='lineNo' max={9} min={1} required
                                /></td>
                                <td><input
                                    type="checkbox"
                                    value={start[index]}
                                    onChange={(e) => {
                                        let newStart = start.slice()
                                        newStart[index] = e.target.checked
                                        setStart(newStart)
                                    }}
                                /></td>
                                <td><input
                                    type="checkbox"
                                    value={end[index]}
                                    onChange={(e) => {
                                        let newEnd = end.slice()
                                        newEnd[index] = e.target.checked
                                        setEnd(newEnd)
                                    }}
                                /></td>
                                <td><input
                                    type="checkbox"
                                    value={qa[index]}
                                    onChange={(e) => {
                                        let newQa = qa.slice()
                                        newQa[index] = e.target.checked
                                        setQa(newQa)
                                    }}
                                /></td>
                                <td><input
                                    type="checkbox"
                                    value={rework[index]}
                                    onChange={(e) => {
                                        let newRework = rework.slice()
                                        newRework[index] = e.target.checked
                                        setRework(newRework)
                                    }}
                                /></td>
                                <td><select
                                    name="final"
                                    id="final"
                                    value={final[index]}
                                    onChange={(e) => {
                                        let newFinal = final.slice()
                                        newFinal[index] = e.target.value
                                        setFinal(newFinal)
                                    }}
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="start" disabled={!start[index]}>Start</option>
                                    <option value="end" disabled={!end[index]}>End</option>
                                    <option value="qa" disabled={!qa[index]}>QA</option>
                                    <option value="rework" disabled={!rework[index]}>Rework</option>
                                </select></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="process-form-row">
                    <div className="process-group">
                        <button type='submit'>Create</button>
                    </div>
                </div>
            </form>
        </div>
        <ProcessCard/>
    </div>
}

export default Process