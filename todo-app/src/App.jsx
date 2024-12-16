import Tabs from '../components/Tabs'
import TodoInput from '../components/TodoInput'
import TodoList from '../components/ToDoList'
import Header from '../components/Header'


function App() {

  return (
    <>
        <Header />
        <Tabs />
        <TodoInput/>
        <TodoList/>
    </>
  )
}

export default App
