import { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export function ModalProvider({ children }) {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <ModalContext.Provider value={{ show, handleShow, handleClose }}>
            {children}
        </ModalContext.Provider>
    );
}

export function useModal() {
    return useContext(ModalContext);
}
