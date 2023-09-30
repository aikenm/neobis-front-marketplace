import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setEmail, setUsername, setPassword, nextStep, prevStep, registerUser, resetUserExists } from '../store/signupSlice';
import { setUser } from '../store/userSlice';
import logo from '../images/logo.svg';
import SignupUser from '../components/signup_components/SignupUser';
import SignupPassword from '../components/signup_components/SignupPassword';
import SignupPasswordRepeat from '../components/signup_components/SignupPasswordRepeat';

function SignupPage() {
    const dispatch = useDispatch();
    const [passwordVisible, setPasswordVisible] = useState(true);
    const { register, handleSubmit, watch, setError, setValue, formState: { errors, isSubmitted } } = useForm();
    const { password, step } = useSelector(state => state.signup);
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&=-])[A-Za-z\d@$!%*?&=-]{8,15}$/;

    const watchedEmail = watch("email");
    const watchedUsername = watch("username");
    const watchedPassword = watch("password");
    const watchedPasswordRepeat = watch("password_repeat");

    const [showTooltip, setShowTooltip] = useState(false);

    const navigate = useNavigate();
    const userExists = useSelector(state => state.signup.userExists);

    const handleUserExists = (reset = false) => {
        if (reset) {
            setShowTooltip(false);
        } else {
            setShowTooltip(true);
            setTimeout(() => {
                setShowTooltip(false);
            }, 5000);
        }
    };

    const handleNextStep = async (data) => {
        if (step === 1) {
            if (!errors.email && !errors.login) {
                const userExists = await dispatch(registerUser({ username: data.username, email: data.email }));
                if (!userExists) {
                    dispatch(setEmail(data.email));
                    dispatch(setUsername(data.username));
                    dispatch(nextStep());
                } else if (userExists) {
                    handleUserExists();
                    return;
                }
            }
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
                dispatch(registerUser({
                    username: watchedUsername,
                    email: watchedEmail,
                    password: watchedPassword,
                    password_confirm: watchedPasswordRepeat
                }));
                dispatch(setUser({ email: watchedEmail, username: watchedUsername }));
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
  if (userExists) {
    dispatch(resetUserExists());
  }
}, [watchedUsername, watchedEmail, dispatch]);

    useEffect(() => {
        dispatch(setEmail(''));
        dispatch(setUsername(''));
        dispatch(setPassword(''));
        dispatch(resetUserExists());
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
                    watchedUsername={watchedUsername}
                    watchedEmail={watchedEmail}
                    showTooltip={showTooltip} 
                    handleUserExists={handleUserExists} 
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
            </div>
        </form>
    );
}

export default SignupPage;
