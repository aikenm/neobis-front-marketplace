import React from 'react';
import { useForm } from 'react-hook-form';

function AddNumberModal({ onClose, onNext }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // dispatch(asyncCheckNumber(data.modalNumber));
    onNext(data);
  };

  return (
    <div className="modal-overlay">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register('modalNumber')} placeholder="0(000)000 000" />
        <button type="submit">Next</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default AddNumberModal;
