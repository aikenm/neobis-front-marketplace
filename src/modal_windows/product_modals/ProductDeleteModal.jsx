import React from 'react';
import deleteIcon from '../../images/delete.svg'

function ProductDeleteModal({ show, onConfirm, onCancel }) {

    const stopPropagation = (event) => {
        event.stopPropagation();
      };

    const handleConfirm = () => {
        if (onConfirm) onConfirm();
    };

    const handleClose = () => {
        if (onCancel) onCancel();
    };

    if (!show) return null;

    return (
        <div className='modal-overlay' onClick={stopPropagation}>
            <div className='modal-log-out-content'>
                <img src={deleteIcon} alt='delete icon'/>
                <h5 className='modal-log-out-subtitle'>Вы действительно хотите удалить данный товар?</h5>
                <div className='modal-log-out-buttons'>
                    <button className='modal-button confirm' onClick={(event) => { handleConfirm(); onConfirm(event); }}>Удалить</button>
                    <button className='modal-button cancel' onClick={(event) => { handleClose(); onCancel(event); }}>Отмена</button>
                </div>
            </div>
        </div>
    );
}

export default ProductDeleteModal;
