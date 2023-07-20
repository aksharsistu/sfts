import React, {createContext, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

/**
 * @description
 * Used to retrieve one time information and pass it to all the children components
 * encased in AuthProvider component. One time information includes:
 * Authentication info containing username and access key, List of processes,
 * Stage and Place Names associated with the IP.
 */


const AuthContext = createContext()

export default AuthContext

/**
 *
 * @param children
 * @returns {JSX.Element} Children with context data
 */
export const AuthProvider = ({children}) => {
    const [backendIp, setBackendIp] = useState('localhost')
    const [username, setUsername] = useState('')
    const [access, setAccess] = useState('000000000')
    const [stageName, setStageName] = useState('')
    const [placeName, setPlaceName] = useState('')
    const [processNos, setProcessNos] = useState([]);
    const navigate = useNavigate()
    const BASE_URL = 'http://' + backendIp + ':8000/'

    useEffect(() => {
        getStage()
        fetchData()
    }, [])

    const getStage = async () => {
        try {
            const response = await axios.get(BASE_URL + 'stage/get/')
            const {stageName, placeName} = response.data
            setStageName(stageName)
            setPlaceName(placeName)
        } catch (err) {
            console.error(err)
        }
    }
    const fetchData = async () => {
        try {
            const response = await axios.get(BASE_URL + 'process/get/');
            setProcessNos(response.data);
        } catch (error) {
            console.log(error);
        }
    };


    /**
     *
     * @param e Form Submit event
     * @returns {Promise<void>}
     * @description Sends POST request with username and password and the backend responds with username and
     * access key which is then parsed and set as context for the entire session. For login on refresh, localStorage
     * can be used.
     */
    const login = async (e) => {
        e.preventDefault()
        const data = {
            username: e.currentTarget.elements.username.value,
            password: e.currentTarget.elements.password.value,
        }
        try {
            const response = await axios.post(BASE_URL + 'auth/login/', data)
            const {username, access} = response.data
            setUsername(username)
            setAccess(access)
            navigate('/')
        } catch (err) {
            console.error(err)
            alert(err.response.data)
        }
    }

    // Clears the username and resets the access key to log out.
    const logout = () => {
        setUsername('')
        setAccess('000000000')
    }



    // Backend sends 9 digit access code with the following information:
    const parseAccess = {
        // Permission to logout (informs that login was successful)
        logout: parseInt(access[0]),
        // Permission to access start process
        start: parseInt(access[1]),
        // Permission to access end process
        end: parseInt(access[2]),
        // Permission to access QA module
        qa: parseInt(access[3]),
        // Permission to access Rework module
        rework: parseInt(access[4]),
        // Permission to Modify Stages
        stageAllocation: parseInt(access[5]),
        // Permission to Modify Users
        userCreation: parseInt(access[6]),
        // Permission to create/delete Processes
        processCreation: parseInt(access[7]),
        // Permission to Modify data related to products and other functioning.
        dataAccess: parseInt(access[8])
    }

    const data = {
        username: username,
        access: parseAccess,
        login: login,
        logout: logout,
        setBackendIp: setBackendIp,
        backendIp: backendIp,
        BASE_URL: BASE_URL,
        stageName: stageName,
        placeName: placeName,
        processNos: processNos,
        fetchData: fetchData
    }

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}
