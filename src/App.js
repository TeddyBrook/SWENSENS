import React from "react";
import { Routes, Route } from "react-router-dom";

/* CSS */
import './App.css';

/* Component Home */
import Home from './components/Home';

/* Component Register */
import Register from './components/Register';

/* Component Login */
import Login from './components/Login';

/* Component Admin */
import Admin from './components/Admin';

/* Component AuthContext */
import { AuthProvider } from "./components/AuthContext";

function App() {
    return (
        <>
            <AuthProvider>

                <Home />

                <Routes>
                    {/* Register */}
                    <Route path="/Register" element={<Register />} />

                    {/* Login */}
                    <Route path="/Login" element={<Login />} />

                    {/* Admin */}
                    <Route path="/Admin" element={<Admin />} />                    
                </Routes>

            </AuthProvider>

        </>
    );
}

export default App;