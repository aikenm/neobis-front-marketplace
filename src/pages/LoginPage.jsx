import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../images/logo.svg';
import eyeOpen from '../images/eye-open.svg';
import eyeClosed from '../images/eye-closed.svg';
import warning from '../images/warning.svg';

function LoginPage() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [buttonText, setButtonText] = useState("Войти");
    const [showTooltip, setShowTooltip] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);
    const [disableLoginButton, setDisableLoginButton] = useState(false);

    const [inputValues, setInputValues] = useState({
        login: '',
        password: ''
    });

    const handleInputChange = (event, inputName) => {
        setInputValues({
            ...inputValues,
            [inputName]: event.target.value
        });
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(prev => !prev);
    };

    const handleLoginFailure = () => {
        setLoginFailed(true);
        setShowTooltip(true);

        setTimeout(() => {
            const tooltipElem = document.querySelector('.tooltip');
            if (tooltipElem) {
                tooltipElem.classList.remove('show');
                setTimeout(() => {
                    setShowTooltip(false); 
                }, 300);  
            }
        }, 5000);   
    
        setDisableLoginButton(true);  
        setButtonText("Повторите через 10");
    
        let seconds = 10;
        const interval = setInterval(() => {
            seconds--;
            setButtonText(`Повторите через ${seconds}`);
    
            if (seconds <= 0) {
                clearInterval(interval);
                setLoginFailed(false);
                setDisableLoginButton(false);  
                setButtonText("Войти");
            }
        }, 1000);
    };
    

    const isFormInvalid = !inputValues.login || !inputValues.password;

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("https://neobis-project.up.railway.app/api/auth/log", {
                login: data.login,
                password: data.password
            }, {
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json'
                }
            });

            if (response.data && response.data.token) {
                localStorage.setItem('authToken', response.data.token);
            }

            navigate('/profile');

        } catch (error) {
            console.error("Error during login:", error.message || error);
            if (error.response && error.response.status) {
                handleLoginFailure();
            }
        }
    };


    return (
        <div className='main' onSubmit={onSubmit}>
            <div className='image-block-wrapper'>
                <img src={logo} alt="" className='logo-image' />
                <h1 className='image-block-title'>MOBI MARKET</h1>
            </div>
            <div className='form-wrapper'>
                <form onSubmit={handleSubmit(onSubmit)} className='login-form'>
                    <div className="input-wrapper">
                        <input
                            {...register('login', { required: true })} 
                            type="text" 
                            className={`input-field ${loginFailed ? 'input-error' : ''}`}
                            onChange={(e) => {
                                handleInputChange(e, 'login');
                                if (loginFailed) setLoginFailed(false);
                            }}
                            value={inputValues.login}
                            placeholder=" " 
                        />
                        <label className="floating-label">Имя пользователя</label>
                    </div>

                    <div className="input-wrapper">
                        <input
                            {...register('password', { required: true })}
                            type={passwordVisible ? "text" : "password"}
                            className={`password-input-field input-field ${loginFailed ? 'input-error' : ''}`}
                            onChange={(e) => {
                                handleInputChange(e, 'password');
                                if (loginFailed) setLoginFailed(false);
                            }}
                            value={inputValues.password}
                            placeholder=" " 
                        />
                        <label className="floating-label">Пароль</label>
                        <img
                            onClick={togglePasswordVisibility}
                            src={passwordVisible ? eyeOpen : eyeClosed}
                            alt="Toggle Password"
                            className="toggle-password-visibility"
                        />
                    </div>
                    {showTooltip && <div className="tooltip show"><img src={warning} alt='Warning sign' className='warning-icon'/>Неверный логин или пароль</div>}
                    <button 
                        type="submit" 
                        className='login-form-button form-button' 
                        disabled={isFormInvalid || disableLoginButton}
                    >                            
                        {buttonText}
                    </button>
                    <Link to="/signup" className='signup-link'>У меня еще нет аккаунта</Link>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
