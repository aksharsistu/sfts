import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {AuthProvider} from "./Components/AuthProvider";
import Layout from "./Layout";
import Login from "./Pages/Login";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import NoPage from "./Pages/NoPage";
import Home from "./Pages/Home";
import Logout from "./Pages/Logout";
import RegisterUser from "./Pages/RegisterUser";
import StageAssign from "./Pages/StageAssign";
import Lists from "./Pages/Lists";
import Process from "./Pages/Process";

function App() {
    return <BrowserRouter>
        <AuthProvider>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<ProtectedRoutes><Home process=''/></ProtectedRoutes>}/>}
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/start' element={<ProtectedRoutes><Home process='start'/></ProtectedRoutes>}/>
                    <Route path='/end' element={<ProtectedRoutes><Home process='end'/></ProtectedRoutes>}/>
                    <Route path='/qa' element={<ProtectedRoutes><Home process='qa'/></ProtectedRoutes>}/>
                    <Route path='/rework' element={<ProtectedRoutes><Home process='rework'/></ProtectedRoutes>}/>
                    <Route path='/logout' element={<ProtectedRoutes><Logout/></ProtectedRoutes>}/>
                    <Route path='/users' element={<ProtectedRoutes><RegisterUser/></ProtectedRoutes>}/>
                    <Route path='/stages' element={<ProtectedRoutes><StageAssign/></ProtectedRoutes>}/>
                    <Route path='/lists' element={<ProtectedRoutes><Lists/></ProtectedRoutes>}/>
                    <Route path='/processes' element={<ProtectedRoutes><Process/></ProtectedRoutes>}/>
                    <Route path='*' element={<NoPage/>}/>
                </Route>
    </Routes>
    </AuthProvider>
  </BrowserRouter>
}

export default App;
