import Tabs from './components/Tabs'
import TodoInput from './components/TodoInput'
import TodoList from './components/ToDoList'
import Header from './components/Header'
import { useState } from 'react'


function App() {

  // const todos = [
  // { input: 'Hello! Add your first todo!', complete: true },
  // { input: 'Get the groceries!', complete: false },
  // { input: 'Learn how to web design', complete: false },
  // { input: 'Say hi to gran gran', complete: true },
  // ]

  const [todos, setTodos] = useState([
    { input: 'Hello! Add your first todo!', complete: true }
  ])

  const [activeTab, setActiveTab] = useState('Open')

  function handleAddTodo(newTodo) {
    setTodos(prevItems => [...prevItems, {input: newTodo, complete: false}]);
  }

  function handleEditTodo() {
    
  }

  function handleDeleteTodo(index){
    setTodos(prevItems => prevItems.filter(
      (val, valIndex) => {
        return valIndex !== index
      }
    ))
  }
 

  return (
    <>
        <Header todos = {todos}/>
        <Tabs todos = {todos} activeTab = {activeTab} setActiveTab = {setActiveTab}/>
        <TodoList todos = {todos} activeTab = {activeTab} handleDeleteTodo={handleDeleteTodo}/>
        <TodoInput handleAddTodo = {handleAddTodo}/>
    </>
  )
}

export default App
