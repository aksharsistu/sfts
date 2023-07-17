import React, {useContext, useState} from 'react';
import './Styles/registeruser.css';
import axios from "axios";
import AuthContext from "../Components/AuthProvider";

const RegisterUser = () => {
    const {BASE_URL} = useContext(AuthContext)
    const [username, setUsername] = useState('');
    const [userCode, setUserCode] = useState('');
    const [password, setPassword] = useState('');
    const [permissions, setPermissions] = useState([1, 0, 0, 0, 0, 0, 0, 0, 0]);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleUserCodeChange = (e) => {
        setUserCode(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handlePermissionChange = (e) => {
        const { name, checked } = e.target;
        let newPermission = permissions.slice()
        newPermission[parseInt(name)] = checked ? 1 : 0
        setPermissions(newPermission)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            username: username,
            password: password,
            userCode: userCode,
            access: permissions.join('')
        }
        try {
            const response = await axios.post(BASE_URL + 'auth/register/', data)
            alert(response.data)
            setUsername('')
            setUserCode('')
            setPassword('')
            setPermissions([1, 0, 0, 0, 0, 0, 0, 0, 0])
        } catch (err) {
            console.error(err)
            alert(err)
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.post(BASE_URL + 'auth/delete/', {username: username})
            alert(response.data)
        } catch (err) {
            console.error(err)
            alert(err)
        }
    };

    return (
        <div className="user-form-container">
            <h2>User Registration Form</h2>
            <form className="user-form" onSubmit={handleSubmit}>
                <div className="user-form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                        maxLength={10}
                        required
                    />
                </div>
                <div className="user-form-group">
                    <label htmlFor="user-code">User Code:</label>
                    <input
                        type="text"
                        id="user-code"
                        value={userCode}
                        onChange={handleUserCodeChange}
                        maxLength={10}
                        required
                    />
                </div>
                <div className="user-form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        maxLength={10}
                        required
                    />
                </div>
                <div className="user-form-group">
                    <label>Permissions:</label>
                    <div className="checkbox-group">
                        <span>General:</span>
                        <label className='checkbox'>
                            <input
                                type="checkbox"
                                name="1"
                                checked={!!permissions[1]}
                                onChange={handlePermissionChange}
                            />
                            Start
                        </label>
                        <label className='checkbox'>
                            <input
                                type="checkbox"
                                name="2"
                                checked={!!permissions[2]}
                                onChange={handlePermissionChange}
                            />
                            End
                        </label>
                        <label className='checkbox'>
                            <input
                                type="checkbox"
                                name="3"
                                checked={!!permissions[3]}
                                onChange={handlePermissionChange}
                            />
                            QA
                        </label>
                        <label className='checkbox'>
                            <input
                                type="checkbox"
                                name="4"
                                checked={!!permissions[4]}
                                onChange={handlePermissionChange}
                            />
                            Rework
                        </label>
                    </div>
                    <div className="checkbox-group">
                        <span>Admin: </span>
                        <label className='checkbox'>
                            <input
                                type="checkbox"
                                name="5"
                                checked={!!permissions[5]}
                                onChange={handlePermissionChange}
                            />
                            Modify Stages
                        </label>
                        <label className='checkbox'>
                            <input
                                type="checkbox"
                                name="6"
                                checked={!!permissions[6]}
                                onChange={handlePermissionChange}
                            />
                            Modify Users
                        </label>
                        <label className='checkbox'>
                            <input
                                type="checkbox"
                                name="7"
                                checked={!!permissions[7]}
                                onChange={handlePermissionChange}
                            />
                            Modify Processes
                        </label>
                        <label className='checkbox'>
                            <input
                                type="checkbox"
                                name="8"
                                checked={!!permissions[8]}
                                onChange={handlePermissionChange}
                            />
                            Change Data
                        </label>
                    </div>
                </div>
                <div className="button-group">
                    <button type="submit" className='register-button'>Submit</button>
                    <button type="button" onClick={handleDelete} className='register-button'>
                        Delete
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterUser;
