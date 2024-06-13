import React, { useContext } from 'react'
import TodoCard from './TodoCard'
import { TodoContext } from './context/TodoContext'

const TodoList = () => {

    const { todos, searchTodos  } = useContext(TodoContext);

    const todoSearchFilter = searchTodos();

    return (
        <section className='section-card'>
            {
                todos.length < 1 && <p className='p-no--todos'>🫣No hay todos... crea tu primer todo</p>
            }

            {
                ( todoSearchFilter.length < 1 && todos.length > 0 ) && <p className='p-no--todos'>🫣No hay todos con ese titulo... crea el todo que deseas</p>
            }

            {
                todos.length > 0 &&
                todoSearchFilter.map(todo => (
                    <TodoCard key={todo.id} id={todo.id} title={todo.title} done={todo.done} />
                )  
            )
            }
        </section>
    )
}

export default TodoList