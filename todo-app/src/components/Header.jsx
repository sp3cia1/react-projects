function Header(props) {

    const { todos } = props;
    const todosLength = todos.length;

    const isTasksPlural = todosLength !== 1 ? 'tasks' : 'task';
    
    return (
        
        <header>
            <h1 className ="text-gradient">
                You have {todosLength} {isTasksPlural}
            </h1>
        </header>
    )
}

export default Header;