import React from 'react';

function DeletePopup(props) {

    return(
        <PopupWithForm name="delete" title="Вы уверены?" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
        </PopupWithForm>
    )
}

export default DeletePopup;