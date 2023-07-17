import React, {createContext, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({children}) => {
    const [backendIp, setBackendIp] = useState('localhost')
    const [username, setUsername] = useState('')
    const [access, setAccess] = useState('000000000')
    const [stageName, setStageName] = useState('')
    const [placeName, setPlaceName] = useState('')
    const [jsonData, setJsonData] = useState([]);
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
            setJsonData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

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

    const logout = () => {
        setUsername('')
        setAccess('000000000')
    }



    // Backend sends 9 digit access code with the following information:
    const parseAccess = {
        logout: parseInt(access[0]),
        start: parseInt(access[1]),
        end: parseInt(access[2]),
        qa: parseInt(access[3]),
        rework: parseInt(access[4]),
        stageAllocation: parseInt(access[5]),
        userCreation: parseInt(access[6]),
        processCreation: parseInt(access[7]),
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
        jsonData: jsonData,
        fetchData: fetchData
    }

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}
