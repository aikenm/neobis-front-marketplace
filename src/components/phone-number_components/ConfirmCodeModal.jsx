import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { verifyCode } from '../../store/userSlice';
import confirmIcon from '../../images/confirm-number.svg' 

function ConfirmCodeModal({ onClose, onConfirm, enteredNumber }) {
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const dispatch = useDispatch();
  
  const checkCode = async (e) => {
    const value = e.target.value;
    if (value.length === 4) {
      const status = await dispatch(verifyCode(value, enteredNumber));
      if (status === 'CODE_VERIFIED') {
        onConfirm();
      }
    }
  };

  const handleResend = () => {
    setTimer(60);
    setCanResend(false);
  };

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainderSeconds.toString().padStart(2, '0')}`;
  }

  useEffect(() => {
    let interval;

    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      setCanResend(true);
    }

    return () => clearInterval(interval);
  }, [timer, canResend]);

  return (
    <div className="modal-overlay">
        <div className='modal-number-content-wrapper'>
            <h4 className='modal-number-title'>Изменить номер телефона</h4>
            <div className='modal-number-content'>
                <form>
                <img src={confirmIcon} alt='confirmIcon' />
                <h5 className='modal-number-subtitle'>Введите код из СМС</h5>
                    <input type="text" 
                    placeholder="0000" 
                    className='code-modal-input'
                    maxLength="4" 
                    onChange={checkCode}
                    />
                </form>
                <button disabled={!canResend} onClick={handleResend} className='confirm-resend-button'>
                    <div className="button-content">
                        {canResend ? 'Отправить код еще раз' : 'Повторный запрос'}
                        {!canResend && <div className="timer">{formatTime(timer)}</div>}
                    </div>
                </button>
                <button onClick={onClose} className='confirm-close-button'>✖</button>
            </div>
        </div>
    </div>
  );
}

export default ConfirmCodeModal;
