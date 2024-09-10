import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* img */
import banner from '../img/banner.png';

/* CSS */
import '../style/Admin.css';

import axios from 'axios';

function Admin() {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        item_name: '',
        item_price: '',
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    }

    const handleAdminSubmit = async (e) => {
        e.preventDefault();

        try {
            const adminResponse = await axios.post('http://localhost:8081/api/item', {
                item_name: inputs.item_name,
                item_price: inputs.item_price,
            });

            setInputs({
                item_name: '',
                item_price: '',
            });

            navigate('/');

            console.log(adminResponse.data);

        } catch (error) {
            console.error('Admin Add Items Failed !', error);
        }
    };

    const renderForm = (
        <div className="form">
            <form onSubmit={handleAdminSubmit}>

                <div className="name-container">
                    <label className="title1-name"> ชื่อสินค้า <span className="required"> * </span> </label>
                    <label className="title2-name"> ราคาสินค้า <span className="required"> * </span> </label>
                </div>

                <div className="input-container">
                    <input
                        className="from-input-register"
                        name="item_name"
                        type="text"
                        id="item_name"
                        placeholder="ชื่อสินค้า"
                        value={inputs.item_name || ""}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        className="from-input-register"
                        name="item_price"
                        type="text"
                        id="item_price"
                        placeholder="ราคาสินค้า"
                        value={inputs.item_price || ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="button-container">
                    <button className="register-user"> บันทึก </button>
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


                        </div>

                        <div className="form-register">
                            <p> ADMIN </p>
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

export default Admin;