import React from 'react';
import logoutIcon from '../../images/logout.svg'

function ModalLogOutMessage({ show, onConfirm, onCancel }) {

    const handleConfirm = () => {
        if (onConfirm) onConfirm();
    };

    const handleClose = () => {
        if (onCancel) onCancel();
    };

    if (!show) return null;

    return (
        <div className='modal-overlay'>
            <div className='modal-log-out-content'>
                <img src={logoutIcon} alt=''/>
                <h5 className='modal-log-out-subtitle'>Вы действительно хотите выйти с приложения?</h5>
                <div className='modal-log-out-buttons'>
                    <button className='modal-button confirm' onClick={handleConfirm}>Выйти</button>
                    <button className='modal-button cancel' onClick={handleClose}>Отмена</button>
                </div>
            </div>
        </div>
    );
}

export default ModalLogOutMessage;
