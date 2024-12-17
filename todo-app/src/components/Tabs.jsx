function Tabs(props) {
    const { todos } = props;


    const tabs = ["All", "Open", "Completed"]
    return (
        <nav className = "tab-container"> 

            {tabs.map((tab, tabIndex) => {

                const tabCount = tab === "All" ? todos.length :
                    tab === "Open" ?
                        todos.filter(todo=>!todo.complete).length :
                        todos.filter(todo => todo.complete).length
                    
                return (
                    <button key={tabIndex} className = "tab-button">
                        <h4>{tab}<span> ({tabCount})</span></h4>
                    </button>
                )
            })}
            
        </nav>
    )
}

export default Tabs;