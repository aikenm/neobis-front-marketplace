import React from 'react';
import { useForm } from 'react-hook-form';
import addNumberIcon from '../../images/add-number.svg'

function AddNumberModal({ onClose, onNext }) {
  const { register, handleSubmit, watch } = useForm();
  const number = watch('number', '');

  const onSubmit = (data) => {
    // dispatch(asyncCheckNumber(data.modalNumber));
    onNext(data);
  };

  return (
    <div className="modal-number-overlay">
      <div className='modal-number-content-wrapper'>
      <h4 className='modal-number-title'>Изменить номер телефона</h4>
        <div className='modal-number-content'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <img src={addNumberIcon} alt='numberIcon' />
            <h5 className='modal-number-subtitle'>Введите номер телефона</h5>
            <h6 className='modal-number-subsubtitle'>Мы отправим вам СМС с кодом подтверждения</h6>
            <input type="text" {...register('number')} placeholder="0(000)000 000" className='number-modal-input'/>
            <button type="submit" disabled={!number} className='number-modal-button'>Далее</button>
          </form>
          <button onClick={onClose} className='add-number-close-button'>✖</button>
        </div>
      </div>
    </div>
  );
}

export default AddNumberModal;
