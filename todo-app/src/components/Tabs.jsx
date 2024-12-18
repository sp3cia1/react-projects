function Tabs(props) {
    const { todos, activeTab, setActiveTab} = props;


    const tabs = ["All", "Open", "Completed"]
    return (
        <nav className = "tab-container"> 

            {tabs.map((tab, tabIndex) => {

                const tabCount = tab === "All" ? todos.length :
                    tab === "Open" ?
                        todos.filter(todo=>!todo.complete).length :
                        todos.filter(todo => todo.complete).length
                    
                return (
                    <button key={tabIndex} 
                        className = {"tab-button" + (tab===activeTab ? 'selectedTab' : " ")} 
                        onClick = {() => setActiveTab(tab) }>
                            <h4>{tab}<span> ({tabCount})</span></h4>
                    </button>
                    
                )
            })}

            <hr />
            
        </nav>
    )
}

export default Tabs;