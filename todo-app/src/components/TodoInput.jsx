import { useState } from 'react';

function TodoInput(props) {
    const { handleAddTodo } = props

    const [inputValue, setInputValue] = useState("")
    console.log(inputValue)

    return (
        <div className="input-container">
            <input value={inputValue} placeholder="Add Tasks" onChange={(e) => {
                setInputValue(e.target.value)
            }} />
            <button onClick={() => {
                if(!inputValue) {return}
                handleAddTodo(inputValue)
                setInputValue('')
            }}>
                <i className="fa-solid fa-plus"></i>
            </button>
        </div>
    )
}

export default TodoInput;
