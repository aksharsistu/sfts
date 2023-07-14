import React, {useContext} from "react";
import AuthContext from "./AuthProvider";
import {Navigate} from "react-router-dom";
import Home from "../Pages/Home";
import RegisterUser from "../Pages/RegisterUser";

const ProtectedRoutes = ({children}) => {
    const {access} = useContext(AuthContext)
    const check = (!access.logout) || (children === <Home process='/start'/> && !access.start()) || (children ===
        <Home process='/end'/> && !access.end) || (children === <Home process='/qa'/> && !access.qa) || (children ===
        <Home process='rework'/> && !access.rework) || (children === <Home process=''/> && !access.logout )
        || (children === <RegisterUser /> && !access.userCreation)

    return check ? <Navigate to='/login'/> : children

}

export default ProtectedRoutes