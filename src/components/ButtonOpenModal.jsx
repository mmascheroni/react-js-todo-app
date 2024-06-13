import React, { useContext } from 'react'
import { TodoContext } from './context/TodoContext'

const ButtonOpenModal = () => {

    const { onOpenModal, openModal } = useContext(TodoContext);

    return (
        <button className='open-modal' onClick={ onOpenModal }>
            {
                !openModal 
                ? '➕'
                : '❌'
            }
        </button>
    )
}

export default ButtonOpenModal