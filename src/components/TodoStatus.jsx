import React, { useContext } from 'react'
import { TodoContext } from './context/TodoContext'

const TodoStatus = () => {

    const { total, completed, pending, todos } = useContext(TodoContext);

    return (
        <div className='container-status'>
            <p>🎯 Total: { total(todos) }</p>
            <p>✅ Completados: { completed(todos) } </p>
            {
                ( todos.length > 0 && pending(todos) == 0 ) 
                ? <p>😎 Has completado tus todos</p>
                : <p>❌ Pendientes: { pending(todos) }</p>
            }           
        </div>
    )
}

export default TodoStatus