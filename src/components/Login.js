import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

/* img */
import banner from '../img/banner.png';

/* CSS */
import '../style/Login.css';

/* Component AuthContext */
import AuthContext from "./AuthContext";

function Login() {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        email: '',
        passwords: ''
    })

    const { setAuth } = useContext(AuthContext);

    const handleLogInSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8081/api/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(inputs),
            });

            if (response.ok) {
                const { message, user, token } = await response.json();
                console.log(message);
                console.log(user);

                if (user) {
                    setAuth(user, token);
                    setInputs({ email: '', passwords: '', });
                    navigate('/')
                }
            } else {
                const errorResponse = await response.json();
                console.error("Error:", errorResponse.message);
                alert("Invalid email or password. Please try again.");
            }
        } catch (error) {
            console.error("Error During Login:", error);
        }
    };

    const renderForm = (
        <>
            <div className="form">
                <form onSubmit={handleLogInSubmit}>

                    <div className="description">
                        <label> อีเมล <span className="required"> * </span> </label>
                        <input
                            className="from-input-login"
                            name="email"
                            type="text"
                            placeholder="อีเมล"
                            value={inputs.email}
                            onChange={(e) => setInputs(prevInputs => ({ ...prevInputs, email: e.target.value }))}
                            required
                        />
                    </div>

                    <div className="description">
                        <label> รหัสผ่าน <span className="required"> * </span> </label>
                        <input
                            className="from-input-login"
                            name="passwords"
                            type="password"
                            placeholder="รหัสผ่าน"
                            value={inputs.passwords}
                            onChange={(e) => setInputs(prevInputs => ({ ...prevInputs, passwords: e.target.value }))}
                            required
                        />
                    </div>

                    <div className="description">
                        <label className="from-mode">
                            <a href="/forgot-password" className="forgot-link"> ลืมรหัสผ่าน ? </a>
                        </label>
                    </div>

                    <div className="button-container">
                        <button className="login-button"> เข้าสู่ระบบ </button>
                    </div>

                </form>
            </div>
        </>
    );

    return (
        <>
            <div className="Header">
                <div className="Container">

                    <div className="container-login">
                        <div className="name-login">

                            <div className="bar-login">
                                <a href="./Home.js" className="custom-button">
                                    <div className="button-content">
                                        <svg className="button-icon" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="16px" width="16px" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"></path>
                                        </svg>
                                        <span className="button-text"> กลับ </span>
                                    </div>
                                </a>

                                <div className="register-info">
                                    <b> ยังไม่มีบัญชีใช่หรือไม่ </b>
                                    <a href="./Register" className="register-button"> สร้างบัญชี </a>
                                </div>
                            </div>

                            <div className="form-login">
                                <div className="title-login"> <h2> สมัครสมาชิกฟรี! รับสิทธิประโยชน์และส่วนลดมากมาย </h2> </div>
                                {renderForm}
                            </div>

                        </div>
                    </div>

                    <div className="container-picture">
                        <img src={banner} className="banner" alt="banner.png" />
                    </div>

                </div>
            </div>
        </>
    );
}

export default Login;