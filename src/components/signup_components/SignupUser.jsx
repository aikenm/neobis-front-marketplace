import React from 'react';
import { Link } from 'react-router-dom';
import arrow from '../../images/arrow.svg'

function SignupUsername({ 
    register, 
    errors, 
    isSubmitted, 
    watchedEmail, 
    watchedUsername 
}) {

    return (
        <>
            <Link to="/" className='back-button'>
                <img src={arrow} alt="back" className='arrow-icon'/>
                <span className='arrow-text'>Назад</span>
            </Link>
            <div className="input-wrapper">
                <input 
                    {...register('username', { required: true })}
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
            <button type="submit" className='form-button' disabled={!watchedUsername || !watchedEmail || errors.email}>Далее</button>
        </>
    );
}

export default SignupUsername;
