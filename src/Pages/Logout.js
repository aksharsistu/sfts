import React, {useContext} from "react";
import AuthContext from "../Components/AuthProvider";

// A transition page between login and logout page. Calls logout function form AuthContext
export default function Logout() {
    const {logout} = useContext(AuthContext)
    logout()
    return <h2>Please wait while you are logged out...</h2>
}