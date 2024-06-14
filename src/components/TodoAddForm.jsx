import React, { useContext } from 'react'
import { TodoContext } from './context/TodoContext'

const TodoAddForm = () => {

    const { onFormSubmit, onChange, title, formMessage, showErrorMessage, showAddMessage } = useContext(TodoContext);

    return (  
        <form className='form-agregar' onSubmit={ onFormSubmit }>
            <h3>Agregar Todo</h3>
            <input
                className='input-add--todo'
                type='text'
                placeholder='Titulo del Todo'
                name='title'
                value={title}
                onChange={ onChange }
            />
            <button className='btn btn-agregar'>Agregar</button>

            {
                showErrorMessage && <p className='p-form--error'>  {formMessage.message}</p>
            }

            {
                showAddMessage && <p className='p-form--add'>  {formMessage.message}</p>
            }
        </form>
    )
}

export default TodoAddForm