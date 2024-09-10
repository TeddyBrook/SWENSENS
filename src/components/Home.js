import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';

/* img */
import swensens from '../img/swensens.svg';
import cart from '../img/cart.svg';
import language from '../img/language.svg';

import swbanner from '../img/swbanner.png';

import promotion1 from '../img/promotion1.png';
import promotion2 from '../img/promotion2.png';

/* CSS */
import '../style/Home.css';

/* Component AuthContext */
import AuthContext from './AuthContext';

function Home() {

    /* Open Pop up Log In */
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    /* Open Pop up Cart */
    const [isOpenCart, setIsOpenCart] = useState(false);
    const openCart = () => setIsOpenCart(true);
    const closeCart = () => setIsOpenCart(false);

    const { user, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        email: '',
        passwords: ''
    })

    const { setAuth } = useContext(AuthContext);

    const handleSubmit = async (e) => {
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
                    closeModal();
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

    const handleFillOutDocumentClick = (path) => {
        if (user) {
            navigate(path);
        } else {
            alert('Please Login First');
            setTimeout(() => {
                navigate('Login');
            }, 0);
        }
    };

    const handleWhenLogoutClick = () => {
        logout();
        navigate('/');
    }

    const handleUserActionChange = (event) => {
        const selectedAction = event.target.value;

        switch (selectedAction) {
            case 'logout':
                handleWhenLogoutClick();
                break;
            default:
                break;
        }
    }

    return (
        <>
            <div className="Header">

                <div className="Header-Main">
                    <a href="/"> <img src={swensens} className="swensens" alt="swensens.svg" /> </a>

                    <div className="Header-Right">
                        <img src={cart} className="cart" alt="cart.svg" onClick={openCart} />
                        {isOpenCart && (
                            <div className="pop-login">
                                <div className="pop-content">
                                    <span className="pop-close" onClick={closeCart}> &times;</span>

                                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M30.736 22.1667C32.0193 22.1667 33.0693 21.1167 33.0693 19.8333V15.1667H37.736C39.0193 15.1667 40.0693 14.1167 40.0693 12.8333C40.0693 11.55 39.0193 10.5 37.736 10.5H33.0693V5.83333C33.0693 4.55 32.0193 3.5 30.736 3.5C29.4527 3.5 28.4027 4.55 28.4027 5.83333V10.5H23.736C22.4527 10.5 21.4027 11.55 21.4027 12.8333C21.4027 14.1167 22.4527 15.1667 23.736 15.1667H28.4027V19.8333C28.4027 21.1167 29.4527 22.1667 30.736 22.1667ZM19.0693 43.1667C16.5027 43.1667 14.426 45.2667 14.426 47.8333C14.426 50.4 16.5027 52.5 19.0693 52.5C21.636 52.5 23.736 50.4 23.736 47.8333C23.736 45.2667 21.636 43.1667 19.0693 43.1667ZM42.4027 43.1667C39.836 43.1667 37.7593 45.2667 37.7593 47.8333C37.7593 50.4 39.836 52.5 42.4027 52.5C44.9693 52.5 47.0693 50.4 47.0693 47.8333C47.0693 45.2667 44.9693 43.1667 42.4027 43.1667ZM21.636 31.5H39.0193C40.7693 31.5 42.3093 30.5433 43.1027 29.0967L50.6627 14.77C51.246 13.65 50.8493 12.25 49.7293 11.6433C48.586 11.0133 47.1627 11.4567 46.556 12.6L39.0193 26.8333H22.6393L12.6993 5.83333H7.40267C6.11934 5.83333 5.06934 6.88333 5.06934 8.16667C5.06934 9.45 6.11934 10.5 7.40267 10.5H9.736L18.136 28.21L14.986 33.9033C13.2827 37.03 15.5227 40.8333 19.0693 40.8333H44.736C46.0193 40.8333 47.0693 39.7833 47.0693 38.5C47.0693 37.2167 46.0193 36.1667 44.736 36.1667H19.0693L21.636 31.5Z" fill="currentColor"></path>
                                    </svg>
                                    <p className="pop-cart"> เริ่มเพิ่มสินค้าลงในรถเข็นของคุณ </p>
                                </div>
                            </div>
                        )}

                        {user ? (
                            <>
                                <div className="user-dropdown">
                                    <button className="user-button"> {user.email} </button>
                                    <div className="user-content">
                                        <a href="Admin"> Admin </a>
                                        <button onClick={handleWhenLogoutClick}> ออกจากระบบ </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <button className="Login" onClick={openModal}> เข้าสู่ระบบ / ลงทะเบียน </button>
                        )}

                        {isOpen && (
                            <div className="pop-login">
                                <div className="pop-content">
                                    <span className="pop-close" onClick={closeModal}> &times; </span>

                                    <h2 className="pop-title"> ยินดีต้อนรับสมาชิก Swensen's เข้าสู่ระบบแล้วเริ่มสั่งไอศกรีมกันเลย! </h2>

                                    <form onSubmit={handleSubmit}>
                                        <div className="description">
                                            <label> อีเมล <span className="required-asterisk"> * </span> </label>
                                            <input
                                                className="from-input-pop"
                                                name="email"
                                                type="text"
                                                placeholder="อีเมล"
                                                value={inputs.email}
                                                onChange={(e) => setInputs(prevInputs => ({ ...prevInputs, email: e.target.value }))}
                                                required
                                            />
                                        </div>

                                        <div className="description">
                                            <label> รหัสผ่าน <span className="required-asterisk"> * </span> </label>
                                            <input
                                                className="from-input-pop"
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
                                            <button className="Login-user"> เข้าสู่ระบบ </button>
                                        </div>

                                        <div className="button-container">
                                            <label className="from-mode">
                                                ยังไม่มีบัญชีใช่หรือไม่ <a href="/Register" className="register-link"> สร้างบัญชี ? </a>
                                            </label>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        )}

                        <div className="language-dropdown">
                            <img src={language} className="language" alt="language.svg" />

                            <button className="language-button"> TH </button>
                            <div className="language-content">
                                <a href="#"> TH </a>
                                <a href="#"> EN </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="containerAddress">
                    <b className="addressText"> ไปส่งที่ : </b>
                    <div className="addressSelector">
                        <button className="addressBox"> เลือกที่อยู่สำหรับจัดส่ง </button>
                    </div>
                </div>
                <img src={swbanner} className="swbanner" alt="swbanner.png" />

                <div className="promotion-container">
                    <b className="addressText"> โปรโมชั่น </b>

                    <div className="promotion-content">
                        <div className="promotion">
                            <div className="image-container">
                                <img
                                    alt="card image"
                                    loading="lazy"
                                    decoding="async"
                                    src={promotion2}
                                    className="image"
                                />
                            </div>
                            <div className="text-container">
                                <span className="price">
                                    <div className="price-wrapper">
                                        <span className="price-amount">฿ 449</span>
                                    </div>
                                </span>
                                <span className="product-description"> ไอศกรีม 2 ควอท 449 บาท </span>
                            </div>
                        </div>
                        <div className="promotion">
                            <div className="image-container">
                                <img
                                    alt="card image"
                                    loading="lazy"
                                    decoding="async"
                                    src={promotion1}
                                    className="image"
                                />
                            </div>
                            <div className="text-container">
                                <span className="price">
                                    <div className="price-wrapper">
                                        <span className="price-amount">฿ 379</span>
                                    </div>
                                </span>
                                <span className="product-description"> ไอศกรีม 2 มินิ ควอท 379 บาท </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="promotion-container">
                    <b className="addressText"> เมนูจัดส่ง </b>

                    <div className="promotion-content">
                        <div className="promotion">
                            <div className="image-container">
                                <img
                                    alt="card image"
                                    loading="lazy"
                                    decoding="async"
                                    src={promotion2}
                                    className="image"
                                />
                            </div>
                            <div className="text-container">
                                <span className="price">
                                    <div className="price-wrapper">
                                        <span className="price-amount">฿ 449</span>
                                    </div>
                                </span>
                                <span className="product-description"> ไอศกรีม 2 ควอท 449 บาท </span>
                            </div>
                        </div>
                        <div className="promotion">
                            <div className="image-container">
                                <img
                                    alt="card image"
                                    loading="lazy"
                                    decoding="async"
                                    src={promotion1}
                                    className="image"
                                />
                            </div>
                            <div className="text-container">
                                <span className="price">
                                    <div className="price-wrapper">
                                        <span className="price-amount">฿ 379</span>
                                    </div>
                                </span>
                                <span className="product-description"> ไอศกรีม 2 มินิ ควอท 379 บาท </span>
                            </div>
                        </div>
                    </div>
                </div>
                </div>

            <div className="Footer">
            </div>
        </>
    );
}

export default Home;