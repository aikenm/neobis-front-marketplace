import React from 'react';
import { useForm } from 'react-hook-form';
import { sendPhoneNumber } from '../../store/userSlice';
import { useDispatch } from 'react-redux';
import addNumberIcon from '../../images/add-number.svg'

function AddNumberModal({ onClose, onNext }) {

  const { register, handleSubmit, watch, reset } = useForm();
  const phone_number = watch('phone_number', '');
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const status = await dispatch(sendPhoneNumber(data.phone_number));
    if (status === 'CODE_SENT') {
      onNext(data);
    }
  };

  const handleClose = () => { 
    reset();  
    onClose();
  }

  return (
    <div className="modal-number-overlay">
      <div className='modal-number-content-wrapper'>
      <h4 className='modal-number-title'>Изменить номер телефона</h4>
        <div className='modal-number-content'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <img src={addNumberIcon} alt='numberIcon' />
            <h5 className='modal-number-subtitle'>Введите номер телефона</h5>
            <h6 className='modal-number-subsubtitle'>Мы отправим вам СМС с кодом подтверждения</h6>
            <input type="text" {...register('phone_number')} placeholder="0(000)000 000" className='number-modal-input'/>
            <button type="submit" disabled={!phone_number} className='number-modal-button'>Далее</button>
          </form>
          <button onClick={handleClose} className='add-number-close-button'>✖</button>
        </div>
      </div>
    </div>
  );
}

export default AddNumberModal;
