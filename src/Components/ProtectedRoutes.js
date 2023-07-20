import React, {useContext} from "react";
import AuthContext from "./AuthProvider";
import {Navigate} from "react-router-dom";
import Home from "../Pages/Home";
import RegisterUser from "../Pages/RegisterUser";
import StageAssign from "../Pages/StageAssign";
import Lists from "../Pages/Lists";
import Process from "../Pages/Process";

/**
 *
 * @param children
 * @returns {JSX.Element|*} Child if access else Redirects to Login component.
 * @description Checks for access to child components using the access key and redirects to login page if no access found.
 */
const ProtectedRoutes = ({children}) => {
    // Obtains access key from AuthContext
    const {access} = useContext(AuthContext)

    /** @type boolean
     * @description True if access to the child is granted by the backend through access key
     * */
    const check = (!access.logout) || (children === <Home process='start'/> && !access.start()) || (children ===
            <Home process='end'/> && !access.end) || (children === <Home process='qa'/> && !access.qa) || (children ===
            <Home process='rework'/> && !access.rework) || (children === <Home process=''/> && !access.logout)
        || (children === <RegisterUser/> && !access.userCreation) || (children ===
            <StageAssign/> && !access.stageAllocation)
        || (children === <Lists/> && !access.dataAccess) || (children === <Process/> && !access.processCreation)

    return check ? <Navigate to='/login'/> : children

}

export default ProtectedRoutes