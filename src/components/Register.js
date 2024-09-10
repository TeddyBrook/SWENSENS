import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* img */
import banner from '../img/banner.png';

/* CSS */
import '../style/Register.css';

import axios from 'axios';

function Register() {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        first_name: '',
        last_name: '',
        email: '',
        passwords: '',
        date_of_birth: '',
        phone_number: '',
        role_Name: [],
    })

    const handleChange = (e) => {
        const { value } = e.target;

        setInputs((prevInputs) => ({
            ...prevInputs,
            role_Name: value
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    }

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        try {
            const userResponse = await axios.post('http://localhost:8081/api/register', {
                first_name: inputs.first_name,
                last_name: inputs.last_name,
                email: inputs.email,
                passwords: inputs.passwords,
                date_of_birth: inputs.date_of_birth,
                phone_number: inputs.phone_number,
                role_Name: inputs.role_Name,
            });

            const user_Id = userResponse.data.user_Id;

            if (inputs.role_Name.length > 0) {
                await axios.post('http://localhost:8081/api/role', {
                    role_Name: inputs.role_Name,
                    user_Id,
                });
            }

            await axios.put(`http://localhost:8081/api/update-user-role/${user_Id}`, {
                role_Name: inputs.role_Name,
            });

            setInputs({
                first_name: '',
                last_name: '',
                email: '',
                passwords: '',
                date_of_birth: '',
                phone_number: '',
                role_Name: [],
            });

            navigate('Login');

            console.log(userResponse.data);

        } catch (error) {
            console.error('Register Failed !', error);
        }
    };

    const renderForm = (
        <div className="form">
            <form onSubmit={handleRegisterSubmit}>

                <div className="name-container">
                    <label className="title1-name"> ชื่อ <span className="required"> * </span> </label>
                    <label className="title2-name"> นามสกุล <span className="required"> * </span> </label>
                </div>

                <div className="input-container">
                    <input
                        className="from-input-register"
                        name="first_name"
                        type="text"
                        id="firstName"
                        placeholder="ชื่อ"
                        value={inputs.first_name || ""}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        className="from-input-register"
                        name="last_name"
                        type="text"
                        id="lastName"
                        placeholder="นามสกุล"
                        value={inputs.last_name || ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="name-container">
                    <label className="title1-name"> อีเมล <span className="required"> * </span> </label>
                    <label className="title2-name"> รหัสผ่าน <span className="required"> * </span> </label>
                </div>

                <div className="input-container">
                    <input
                        className="from-input-register"
                        name="email"
                        type="text"
                        id="email"
                        placeholder="อีเมล"
                        value={inputs.email || ""}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        className="from-input-register"
                        name="passwords"
                        type="password"
                        id="password"
                        placeholder="รหัสผ่าน"
                        value={inputs.passwords || ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="name-container">
                    <label className="title1-name"> วันเกิด <span className="required"> * </span> </label>
                    <label className="title2-name"> เบอร์โทรศัพท์ <span className="required"> * </span> </label>
                </div>

                <div className="input-container">
                    <input
                        className="from-input-register"
                        name="date_of_birth"
                        type="date"
                        id="date_of_birth"
                        placeholder="date_of_birth"
                        value={inputs.date_of_birth || ""}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        className="from-input-register"
                        name="phone_number"
                        type="tel"
                        placeholder="เบอร์โทรศัพท์"
                        value={inputs.phone_number || ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="name-container">
                    <label className="title1-name"> เพศ <span className="required"> * </span> </label>
                </div>

                <div className="checkbox-container">
                    <div className="checkbox-item">
                        <input
                            className="checkbox-form"
                            name="role_Name"
                            type="radio"
                            id="male"
                            value="male"
                            checked={inputs.role_Name === 'male'}
                            onChange={handleChange}
                        />
                        <label htmlFor="male" className="checkbox-circle"></label>
                        <label className="checkbox-name" htmlFor="male"> ชาย </label>
                    </div>

                    <div className="checkbox-item">
                        <input
                            className="checkbox-form"
                            name="role_Name"
                            type="radio"
                            id="female"
                            value="female"
                            checked={inputs.role_Name === 'female'}
                            onChange={handleChange}
                        />
                        <label htmlFor="female" className="checkbox-circle"></label>
                        <label className="checkbox-name" htmlFor="female"> หญิง </label>
                    </div>

                    <div className="checkbox-item">
                        <input
                            className="checkbox-form"
                            name="role_Name"
                            type="radio"
                            id="other"
                            value="other"
                            checked={inputs.role_Name === 'other'}
                            onChange={handleChange}
                        />
                        <label htmlFor="other" className="checkbox-circle"></label>
                        <label className="checkbox-name" htmlFor="other"> ไม่ระบุ </label>
                    </div>
                </div>

                <div class="container">
                    <div class="black-line"></div>
                </div>

                <div className="position-contain">
                    <input
                        className="position-form"
                        type="checkbox"
                        required
                    />
                    <label className="position-name"> ฉันได้อ่านและยอมรับ ข้อกำหนดการใช้งาน และ นโยบายความเป็นส่วนตัว ของสเวนเซ่นส์ </label>
                </div>

                <div className="position-contain">
                    <input
                        className="position-form"
                        type="checkbox"
                    />
                    <label className="position-name"> ฉันยินยอมรับข้อมูลข่าวสาร กิจกรรมส่งเสริมการขายต่างๆ จากสเวนเซ่นส์และบริษัทในเครือ โดยเราจะเก็บข้อมูลของท่านไว้เป็นความลับ สามารถศึกษาเงื่อนไขหรือข้อตกลง นโยบายความเป็นส่วนตัว เพิ่มเติมได้ที่เว็บไซต์ของบริษัทฯ </label>
                </div>

                <div className="button-container">
                    <button className="register-user"> สร้างบัญชี </button>
                </div>

            </form>
        </div>
    );

    return (
        <div className="Header">

            <div className="Container">

                <div className="Container-Register">
                    <div className="name-register">

                        <div className="bar-register">
                            <a href="./Home.js" className="custom-button">
                                <div className="button-content">
                                    <svg className="button-icon" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="16px" width="16px" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"></path>
                                    </svg>
                                    <span className="button-text"> กลับ </span>
                                </div>
                            </a>

                            <div className="login-info">
                                <b> มีบัญชีสมาชิกอยู่แล้วใช่หรือไม่ </b>
                                <a href="./Login" className="login-button-info"> เข้าสู่ระบบ </a>
                            </div>
                        </div>

                        <div className="form-register">
                            <div className="title-regis"> <h2> สมัครสมาชิกฟรี! รับสิทธิประโยชน์และส่วนลดมากมาย </h2> </div>
                            {renderForm}
                        </div>

                    </div>
                </div>

                <div className="Container-Picture">
                    <img src={banner} className="banner" alt="banner.png" />
                </div>

            </div>

        </div>
    );
}

export default Register;