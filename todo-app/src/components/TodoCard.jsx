function TodoCard(props) {
    // console.log(props)
    const {todo,todoIndex,handleDeleteTodo, handleCompleteTodo} = props
    console.log(todoIndex)
    return (
        <div className="card todo-item">
            <p>{todo.input}</p>
            <div className="todo-buttons">
                <button disabled={todo.complete} onClick = {()=>{handleCompleteTodo(todoIndex); console.log("Completed" + todoIndex)}}>
                    <h6>Done</h6>
                </button>
                <button onClick={() => {handleDeleteTodo(todoIndex); console.log("Deleting" + todoIndex)}}>
                    <h6>Delete</h6>
                </button>

            </div>
        </div>
    )
}

export default TodoCard;