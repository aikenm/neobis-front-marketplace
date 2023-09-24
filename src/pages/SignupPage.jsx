import React, { useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setEmail, setLogin, setPassword, setPasswordRepeat, nextStep, prevStep } from '../store/signupSlice';
import logo from '../images/logo.svg';
import arrow from '../images/arrow.svg';
import passwordIcon from '../images/password-icon.svg';
import eyeOpen from '../images/eye-open.svg';
import eyeClosed from '../images/eye-closed.svg';


function SignupPage() {
    const dispatch = useDispatch();
    const [passwordVisible, setPasswordVisible] = useState(true);
    const { register, handleSubmit, watch, formState: { errors, isSubmitted }, setError, setValue } = useForm();
    const { password, step, userExists } = useSelector(state => state.signup);
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&=-])[A-Za-z\d@$!%*?&=-]{8,15}$/;
    
    const watchedEmail = watch("email");
    const watchedLogin = watch("login");
    const watchedPassword = watch("password");
    const watchedPasswordRepeat = watch("password_repeat");

    const navigate = useNavigate();

    const handleNextStep = async (data) => {
        if (step === 1) {
            if (!errors.email && !errors.login) {
                dispatch(setEmail(data.email));
                dispatch(setLogin(data.login));
                dispatch(nextStep());
            }
            // dispatch(checkUserExists({ email: data.email, login: data.login }));
        } else if (step === 2) {
            if (data.password && passwordPattern.test(data.password)) {
                dispatch(setPassword(data.password));
                dispatch(nextStep());
            } else {
                setError('password', {
                    type: 'manual',
                    message: 'Пароль не соответсвует критериям'
                });
            }
        } else if (step === 3) {
            if (data.password_repeat !== data.password) {
                setError('password_repeat', {
                    type: 'manual',
                    message: 'Пароли не совпадают'
                });
            } else {
                navigate('/profile'); 
                dispatch(re)           
            }
        }
    };

    const handleGoBack = () => {
        if (step === 3) {
            setValue('password_repeat', '');
        }
        dispatch(prevStep());
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(prev => !prev);
    };

    useEffect(() => {
        dispatch(setEmail(''));
        dispatch(setLogin(''));
        dispatch(setPassword(''));
        dispatch(setPasswordRepeat(''));
    }, [dispatch]);    

    return (
        <form className='main' onSubmit={handleSubmit(handleNextStep)}>
            <div className='image-block-wrapper'>
                <img src={logo} alt="" className='logo-image' />
                <h1 className='image-block-title'>MOBI MARKET</h1>
            </div>
            <div className='signup-form-wrapper form-wrapper'>
            <h2 className='signup-title'>Регистрация</h2>
                {step === 1 && (
                    <>
                        <Link to="/" className='back-button'>
                            <img src={arrow} alt="back" className='arrow-icon'/>
                            <span className='arrow-text'>Назад</span>
                        </Link>
                        <div className="input-wrapper">
                            <input 
                                {...register('login', { required: true })}
                                type="text" 
                                placeholder=" "
                                className="input-field"
                            />
                            <label className="floating-label">Имя пользователя</label>
                        </div>
                        <div className="input-wrapper">
                            <input 
                                {...register('email', {
                                    required: true,
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: "Неправильный email"
                                    }
                                })}
                                type="email" 
                                placeholder=" "
                                className="input-field"
                            />
                            <label className="floating-label">Почта</label>
                            {isSubmitted && errors.email && <p>{errors.email.message}</p>}
                        </div>
                        <button type="submit" className='form-button' disabled={!watchedLogin || !watchedEmail || errors.email}>Далее</button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <Link onClick={handleGoBack} className='back-button'>
                            <img src={arrow} alt="back" className='arrow-icon'/>
                            <span className='arrow-text'>Назад</span>
                        </Link>
                        <img
                            onClick={togglePasswordVisibility}
                            src={passwordVisible ? eyeOpen : eyeClosed}
                            alt="Toggle Password"
                            className="password-visibility-btn"
                        />
                        <img src={passwordIcon} alt="password icon" className='password-icon'/>
                        <span className='pass-title'>Придумайте пароль</span>
                        <span className='pass-subtitle'>Минимальная длина — 8 символов. Для надежности пароль должен содержать буквы и цифры.</span>
                        <input 
                            {...register('password', {
                                required: true,
                            })}
                            type={passwordVisible ? "text" : "password"}  
                            placeholder="••••••••"
                            className="password-field"
                        />
                        {errors.password && <p className="password-error">{errors.password.message}</p>}
                        <button type="submit" className='form-button' disabled={!watchedPassword}>Далее</button>
                    </>
                )}

                {step === 3 && (
                    <>
                        <Link onClick={handleGoBack} className='back-button'>
                            <img src={arrow} alt="back" className='arrow-icon'/>
                            <span className='arrow-text'>Назад</span>
                        </Link>
                        <img
                            onClick={togglePasswordVisibility}
                            src={passwordVisible ? eyeOpen : eyeClosed}
                            alt="Toggle Password"
                            className="password-visibility-btn"
                        />
                        <img src={passwordIcon} alt="password icon" className='password-icon'/>
                        <span className='pass-title'>Повторите пароль</span>
                        <span className='pass-subtitle'>Минимальная длина — 8 символов. Для надежности пароль должен содержать буквы и цифры.</span>
                        <input 
                            type={passwordVisible ? "text" : "password"}  
                            placeholder={password}
                            value={password}
                            className="password-field disabled"
                            disabled
                        />
                        <input 
                            {...register('password_repeat', {
                                required: "Повторите пароль"
                            })}
                            type={passwordVisible ? "text" : "password"}  
                            placeholder="••••••••"
                            className="password-field"
                        />
                        {errors.password_repeat && <p className="password-error">{errors.password_repeat.message}</p>}
                        <button type="submit" className='form-button' disabled={!watchedPasswordRepeat}>Далее</button>
                    </>
                )}
                {userExists && <p>User already exists!</p>}
            </div>
        </form>
    );
}

export default SignupPage;
