import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import arrow from '../../images/arrow.svg';
import warning from '../../images/warning.svg';

function SignupUsername({ 
    register, 
    errors, 
    isSubmitted, 
    showTooltip,
    handleUserExists
}) {

    const [isFormComplete, setFormComplete] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        handleUserExists(true);
    };

    useEffect(() => {
        setFormComplete(formData.username !== '' && formData.email !== '');
    }, [formData]);

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
                    className={`input-field ${showTooltip ? 'input-error' : ''}`}
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
                    className={`input-field ${showTooltip ? 'input-error' : ''}`}
                    onChange={handleInputChange}
                />
                <label className="floating-label">Почта</label>
                {isSubmitted && errors.email && <p>{errors.email.message}</p>}
            </div>
            {showTooltip && <div className="signup-tooltip show"><img src={warning} alt='Warning sign' className='warning-icon'/>Данный пользователь уже зарегистрирован</div>}
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
