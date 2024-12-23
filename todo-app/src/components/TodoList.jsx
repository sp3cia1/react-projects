import TodoCard from "./TodoCard";

function TodoList(props) {
    const {todos, activeTab, handleDeleteTodo, handleCompleteTodo} = props;

    const allTodos = todos.map((todo, index) => ({...todo, originalIndex: index}));
    
    const displayTodos = activeTab === "All" ? allTodos :
        activeTab === "Open" ? allTodos.filter(todo => !todo.complete) : 
        allTodos.filter(todo => todo.complete);

    return (
        <>
            {displayTodos.map((todo) => (
                <TodoCard 
                    key={todo.originalIndex}
                    todoIndex={todo.originalIndex}
                    handleDeleteTodo={handleDeleteTodo}
                    handleCompleteTodo = {handleCompleteTodo}
                    todo={todo}
                />
            ))}
        </>
    )
}

export default TodoList;