import TodoAddForm from './components/TodoAddForm'
import TodoList from './components/TodoList'
import TodoStatus from './components/TodoStatus'
import './App.css'
import Footer from './components/Footer'
import TodoSearch from './components/TodoSeach'
import { useContext } from 'react'
import { TodoContext } from './components/context/TodoContext'
import Modal from './components/Modal'
import ButtonOpenModal from './components/ButtonOpenModal'



function App() {

  const { openModal, isMobile } = useContext(TodoContext);

  return (
    <>
      <h1>Todo App 📝</h1>
      <TodoSearch />

      <section className='section-todo'>
        <TodoList />

        <article className='article-form'>
          <div>
            <TodoStatus />
          </div>
          
          {
            !isMobile && <TodoAddForm />
          }
          {
            isMobile && <ButtonOpenModal />
          }
        </article>    
      </section>

      {
        ( openModal && isMobile ) && <Modal>
          <TodoAddForm />
        </Modal>
      }
    
      <Footer />
    </>
  )
}

export default App
