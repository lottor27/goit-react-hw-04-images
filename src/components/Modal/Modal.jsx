
import { useEffect } from "react";

import PropTypes from 'prop-types';

const Modal = ({children, onBackdropClose, onKeydownClose})=> {
    

    useEffect(() =>{
        window.addEventListener('keydown', onKeydownClose);
    }, [onKeydownClose]);
    
    useEffect(() =>{
        window.removeEventListener('keydown', onKeydownClose);
    }, [onKeydownClose]);


    

        
        return (
            <div 
            id="modal-backdrop" className="Overlay" 
            onClick={onBackdropClose}>
                <div 
                id="modal-window" className="Modal">
                    {children}
                </div>
            </div>
        )
    }

export default Modal;

Modal.propTypes = {
    onSubmit: PropTypes.func,
}
