import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import AuthContext from "./AuthProvider";

const NavBar = () => {
    const {username, access} = useContext(AuthContext)

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-left">
                    {access.logout ? <div className="navbar-username">User: {username}</div> : null}
                </div>
                <div className="navbar-middle">
                    <div className="navbar-title">SFTS</div>
                </div>
                <div className="navbar-right">
                    <div className="navbar-dropdown">
                        {access.logout ? <div className="navbar-dropdown-toggle"><Link to='/'>Home</Link></div> : null}
                        <div className="navbar-dropdown-content">
                            {access.start ? <Link to="/start">Start</Link> : null}
                            {access.end ? <Link to="/end">End</Link> : null}
                            {access.qa ? <Link to="/qa">QA</Link> : null}
                            {access.rework ? <Link to="/rework">Rework</Link> : null}
                        </div>
                    </div>
                    {access.stageAllocation ? <Link to="/stages">Stages</Link> : null}
                    {access.userCreation ? <Link to="/users">Users</Link> : null}
                    {access.processCreation ? <Link to="/processes">Processes</Link> : null}
                    {access.dataAccess ? <Link to="/lists">Lists</Link> : null}
                    {access.logout ? <Link to="/logout">Logout</Link> : null}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
