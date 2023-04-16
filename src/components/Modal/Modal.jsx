import React, {useContext} from 'react';
import classes from "./modal.module.css";



const Modal = ({children, isVisible, setIsVisible}) => {
    const rootClasses = [classes.modal]

    if (isVisible) {
        rootClasses.push(classes.active)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setIsVisible(false)}>
            <div className={classes.modalContent} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
