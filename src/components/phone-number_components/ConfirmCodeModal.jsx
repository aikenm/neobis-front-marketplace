import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../store/userSlice'; // Import the updateUser action

function ConfirmCodeModal({ onClose, onConfirm, enteredNumber }) {
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  // Generate a temporary 4-digit code
  const generatedCode = 2222;

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

  const onSubmit = (data) => {
    const enteredCode = Number(data.confirmationCode); // Convert to number
    if (enteredCode === generatedCode) {
      dispatch(updateUser({ number: enteredNumber }));
      onConfirm();
    } else {
      console.log("Incorrect code");
    }
  };
  

  const handleResend = () => {
    setTimer(60);
    setCanResend(false);
  };

  return (
    <div className="modal-overlay">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="number" {...register('confirmationCode')} placeholder="0000" />
        <button type="submit">Confirm</button>
      </form>
      <button disabled={!canResend} onClick={handleResend}>
        {canResend ? 'Resend Code' : `Repeat request after ${timer}s`}
      </button>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default ConfirmCodeModal;
