import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setEmail, setLogin, setPassword, nextStep, prevStep } from '../store/signupSlice';
import { setUser } from '../store/userSlice';
import logo from '../images/logo.svg';
import SignupUser from '../components/signup_components/SignupUser';
import SignupPassword from '../components/signup_components/SignupPassword';
import SignupPasswordRepeat from '../components/signup_components/SignupPasswordRepeat';

function SignupPage() {
    const dispatch = useDispatch();
    const [passwordVisible, setPasswordVisible] = useState(true);
    const { register, handleSubmit, watch, setError, setValue, formState: { errors, isSubmitted } } = useForm();
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
                dispatch(setUser({ email: watchedEmail, login: watchedLogin }));
                navigate('/profile');          
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
    }, [dispatch]);

    return (
        <form className='main' onSubmit={handleSubmit(handleNextStep)}>
            <div className='image-block-wrapper'>
                <img src={logo} alt="" className='logo-image' />
                <h1 className='image-block-title'>MOBI MARKET</h1>
            </div>
            <div className='signup-form-wrapper form-wrapper'>
                <h2 className='signup-title'>Регистрация</h2>
                {step === 1 && <SignupUser 
                    register={register}
                    errors={errors}
                    isSubmitted={isSubmitted}
                    watchedLogin={watchedLogin}
                    watchedEmail={watchedEmail}
                />}
                {step === 2 && <SignupPassword 
                    register={register}
                    errors={errors}
                    togglePasswordVisibility={togglePasswordVisibility}
                    passwordVisible={passwordVisible}
                    watchedPassword={watchedPassword}
                    handleGoBack={handleGoBack}
                />}
                {step === 3 && <SignupPasswordRepeat 
                    register={register}
                    errors={errors}
                    togglePasswordVisibility={togglePasswordVisibility}
                    passwordVisible={passwordVisible}
                    password={password}
                    watchedPasswordRepeat={watchedPasswordRepeat}
                    handleGoBack={handleGoBack}
                />}
                {userExists && <p>User already exists!</p>}
            </div>
        </form>
    );
}

export default SignupPage;
