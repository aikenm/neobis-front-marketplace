import React from 'react';
import { Link } from 'react-router-dom';
import arrow from '../../images/arrow.svg';
import passwordIcon from '../../images/password-icon.svg';
import eyeOpen from '../../images/eye-open.svg';
import eyeClosed from '../../images/eye-closed.svg';

function SignupPasswordConfirm({
    register, 
    errors, 
    watchedPasswordRepeat,
    password, 
    togglePasswordVisibility, 
    passwordVisible, 
    handleGoBack 
}) {

    return (
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
    );
}

export default SignupPasswordConfirm;
