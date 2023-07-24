import {createContext, useState} from 'react'

const ModalContext = createContext()

export default function ModalProvider({children}) {

    const [modal, setModal] = useState({
        isOpen: false,
        type: null
    })

    function openModal(type) {
        setModal({isOpen: true, type})
    }
    
    function closeModal() {
        setModal({isOpen: false, type: null})
    }
    
  return (
    <ModalContext.Provider
        value={{
            modal,
            openModal,
            closeModal
        }}
    >
        {children}
    </ModalContext.Provider>
  )
}

export {ModalContext, ModalProvider}