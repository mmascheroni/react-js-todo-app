import React, { useContext } from 'react'
import { TodoContext } from './context/TodoContext'

const TodoCard = ({ id, title, done }) => {

    const { handleDeleteTodo, handleToggleCompleteTodo } = useContext(TodoContext);

    return (
        <div className='card-todo'>
            <div className='card-todo--left'>
                <input type='checkbox' className='input-checkbox' checked={ done } onChange={ () => handleToggleCompleteTodo(id) } />
                <p className={done ? 'p-complete' : undefined}>{ title } </p>
            </div>
            
            
    
            <button 
                className='btn-delete' 
                onClick={ () => handleDeleteTodo(id) } 
            >❌</button>

        </div>
    )
}

export default TodoCard