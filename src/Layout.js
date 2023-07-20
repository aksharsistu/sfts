import React from "react";
import {Outlet} from "react-router-dom";
import NavBar from './Components/NavBar'

// Layout to combine NavBar and the rendered components in App.js
export default function Layout() {
    return <div>
        <NavBar/>
        <Outlet/>
    </div>
}

