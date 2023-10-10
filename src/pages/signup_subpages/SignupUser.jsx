import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import arrow from '../../images/arrow.svg';
import warning from '../../images/warning.svg';

function SignupUsername({ 
    register, 
    errors, 
    isSubmitted, 
    showTooltip,
}) {

    const [isFormComplete, setFormComplete] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: ''
    });

    const [inputError, setInputError] = useState(false); 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setInputError(false); 
    };

    useEffect(() => {
        setFormComplete(formData.username !== '' && formData.email !== '');
    }, [formData]);

    useEffect(() => {
        if (showTooltip) {
            setInputError(true); 
            setTimeout(() => {
                if (!inputError) {  
                    setInputError(false);  
                }
            }, 4000);
        }
    }, [showTooltip]);

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
                    className={`input-field ${inputError ? 'input-error' : ''}`}
                    onChange={handleInputChange}
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
                    className={`input-field ${inputError ? 'input-error' : ''}`}
                    onChange={handleInputChange}
                />
                <label className="floating-label">Почта</label>
                {isSubmitted && errors.email && <p>{errors.email.message}</p>}
            </div>
            {showTooltip && <div className="user-exist-tooltip show"><img src={warning} alt='Warning sign' className='warning-icon'/>Данный пользователь уже зарегистрирован</div>}
            <button 
                type="submit" 
                className='form-button'
                disabled={!isFormComplete}  
            >
                Далее
            </button>
        </>
    );
}

export default SignupUsername;
