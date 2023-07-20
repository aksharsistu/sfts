import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import AuthContext from "./AuthProvider";

/**
 *
 * @param processNo Process No.
 * @param BASE_URL Backend URL
 * @returns {JSX.Element} A table containing different sub-stages and checkboxes to show enabled/disabled status
 */
const StageCard = ({processNo, BASE_URL}) => {
    const [stageData, setStageData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(BASE_URL + 'process/card/', {processNo: processNo});
                setStageData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return <table>
        <thead>
        <tr>
            <th>Stage</th>
            <th>Start</th>
            <th>End</th>
            <th>QA</th>
            <th>Rework</th>
            <th>Final</th>
            <th>Quantity</th>
        </tr>
        </thead>
        <tbody>
        {stageData.map((item) => (
            <tr key={item.processCardNo}>
                <td>{item.processCardNo}</td>
                <td><input type="checkbox" disabled checked={item.start}/></td>
                <td><input type="checkbox" checked={item.end} disabled/></td>
                <td><input type="checkbox" checked={item.qa} disabled/></td>
                <td><input type="checkbox" checked={item.rework} disabled/></td>
                <td>{item.final}</td>
                <td>{item.quantity}</td>
            </tr>
        ))}
        </tbody>
    </table>
}


/**
 *
 * @returns {JSX.Element} A table containing details regarding all the processes in the database.
 */
const ProcessCard = () => {
    const {BASE_URL, processNos, fetchData} = useContext(AuthContext)

    // Sends request to delete an entry in the process database
    const deleteRow = async (processNo) => {
        try {
            await axios.post(BASE_URL + `process/delete/`, {processNo: processNo});
            fetchData();
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="process-card">
            <table>
                <thead>
                <tr>
                    <th>Process No</th>
                    <th>Date</th>
                    <th>Product Code</th>
                    <th>Max Quantity</th>
                    <th>Temp Sr. No.</th>
                    <th>Permanent Sr. No.</th>
                    <th>Stage Card</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {processNos.map((item) => (
                    <tr key={item.processNo}>
                        <td>{item.processNo}</td>
                        <td>{item.date}</td>
                        <td>{item.productCode_id}</td>
                        <td>{item.maxQuantity}</td>
                        <td>{item.tempStartingSno}</td>
                        <td>{item.permStartingSno}</td>
                        <td><StageCard processNo={item.processNo} BASE_URL={BASE_URL}/></td>
                        <td>
                            <button onClick={() => deleteRow(item.processNo)} className='delete-button'>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProcessCard;
