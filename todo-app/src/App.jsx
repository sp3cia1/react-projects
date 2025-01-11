import Tabs from './components/Tabs'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import Header from './components/Header'
import { useState, useEffect } from 'react'


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
    const updatedTodos = [...todos, {input: newTodo, complete: false}];
    setTodos(updatedTodos);
    handleSaveData(updatedTodos);
  }

  function handleCompleteTodo(index) {
    let newTodoList = [...todos]
    let completedTodo = newTodoList[index]
    completedTodo.complete = true
    newTodoList[index] = completedTodo
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }

  function handleDeleteTodo(index){
    let newTodoList = todos.filter((val, i) => i !== index)
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }

  function handleSaveData(currTodos){
    localStorage.setItem('todo-app', JSON.stringify({ todos:currTodos }))
  }

  useEffect(() => {
    if(!localStorage  || !localStorage.getItem('todo-app')) {return}
    let db = JSON.parse(localStorage.getItem('todo-app'))
    setTodos(db.todos)
  }, [])
 

  return (
    <>
        <Header todos = {todos}/>
        <Tabs todos = {todos} activeTab = {activeTab} setActiveTab = {setActiveTab}/>
        <TodoList todos = {todos} activeTab = {activeTab} handleDeleteTodo={handleDeleteTodo} handleCompleteTodo={handleCompleteTodo}/>
        <TodoInput handleAddTodo = {handleAddTodo}/>
    </>
  )
}

export default App
