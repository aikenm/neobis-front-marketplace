import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/userSlice';
import logo from '../images/logo.svg';
import eyeOpen from '../images/eye-open.svg';
import eyeClosed from '../images/eye-closed.svg';
import warning from '../images/warning.svg';

function LoginPage() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [buttonText, setButtonText] = useState("Войти");
    const [showTooltip, setShowTooltip] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);
    const [disableLoginButton, setDisableLoginButton] = useState(false);

    const [showSignupSuccess, setShowSignupSuccess] = useState(false);

    const [inputValues, setInputValues] = useState({
        username: '',
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
        }, 4000);   
    
        setDisableLoginButton(true);  
        setButtonText("Повторите через 10");

        let seconds = 10;
        localStorage.setItem('disableUntil', Date.now() + seconds * 1000); 
        const interval = setInterval(() => {
            seconds--;
            setButtonText(`Повторите через ${seconds}`);

            if (seconds <= 0) {
                localStorage.removeItem('disableUntil');
                clearInterval(interval);
                    setLoginFailed(false);
                    setDisableLoginButton(false);  
                    setButtonText("Войти");
            }
        }, 1000);
    };
    

    const isFormInvalid = !inputValues.username || !inputValues.password;

   const onSubmit = async (data) => {
    const result = await dispatch(loginUser(data));
    if (result === 'LOGIN_SUCCESSFUL') {
        navigate('/profile');
    } else {
        handleLoginFailure();
    }
    };

    useEffect(() => {
        const disableUntil = localStorage.getItem('disableUntil');
        if (disableUntil) {
            const remainingTime = disableUntil - Date.now();
            if (remainingTime > 0) {
                handleLoginFailure(); 
            }
        }
    }, []);

    useEffect(() => {
        if (location.state && location.state.signedUp) {
          setShowSignupSuccess(true);
          setTimeout(() => {
            setShowSignupSuccess(false);
          }, 4000);
        }
      }, [location]);

    return (
        <div className='main'>
            <div className='image-block-wrapper'>
                <img src={logo} alt="" className='logo-image' />
                <h1 className='image-block-title'>MOBI MARKET</h1>
            </div>
            <div className='form-wrapper'>
                <form onSubmit={handleSubmit(onSubmit)} className='login-form'>
                    <div className="input-wrapper">
                        <input
                            {...register('username', { required: true })} 
                            type="text" 
                            className={`input-field ${loginFailed ? 'input-error' : ''}`}
                            onChange={(e) => {
                                handleInputChange(e, 'username');
                                if (loginFailed) setLoginFailed(false);
                            }}
                            value={inputValues.username}
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
                    {showTooltip && 
                        <div className="tooltip show">
                            <img src={warning} alt='Warning sign' className='warning-icon'/>
                            Неверный логин или пароль
                        </div>
                    }
                    {showSignupSuccess && 
                        <div className="registration-success-tooltip show">
                            <img src={warning} alt='Warning sign' className='warning-icon'/> 
                            Вы успешно зарегистрировались!
                        </div>
                    }
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
