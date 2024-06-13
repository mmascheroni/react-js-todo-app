import React, { useContext } from 'react'
import { TodoContext } from './context/TodoContext';

const TodoSearch = () => {

    const { onChangeSearchValue } = useContext(TodoContext);

    return (
        <input 
            type="text" 
            placeholder='Busca tu/s Todos' 
            onChange={ (e) => onChangeSearchValue(e) } 
        />
    )
}

export default TodoSearch