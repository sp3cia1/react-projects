import TodoCard from "./TodoCard";

function TodoList(props) {
    const {todos,activeTab} = props

    const  tab = activeTab
    const filteredTodos = tab === "All" ? todos :
        tab === "Open" ? todos.filter(todo => !todo.complete) : todos.filter(todo => todo.complete)
    return (
        <>
            {
                filteredTodos.map((todo, todoIndex) => {
                    return (
                        <TodoCard 
                            key = {todoIndex} 
                            todo = {todo}
                        />
                    )
                })
            }
        </>
    )
}

export default TodoList;