import React, { useContext } from 'react'
import { TodoContext } from './context/TodoContext'

const TodoCard = ({ id, title, done }) => {

    const { handleDeleteTodo, handleToggleCompleteTodo } = useContext(TodoContext);

    return (
        <div className='card-todo'>
            <div className={done ? 'p-complete' : undefined}>
                <p>{ title } </p>
            </div>
            
            
            <input type='checkbox' className='input-checkbox' checked={ done } onChange={ () => handleToggleCompleteTodo(id) } />
            <button 
                className='btn-delete' 
                onClick={ () => handleDeleteTodo(id) } 
            >❌</button>

        </div>
    )
}

export default TodoCard