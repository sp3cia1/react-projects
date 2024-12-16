function Tabs() {
    const tabs = ["All", "Active", "Completed"]
    return (
        <nav>

            {tabs.map((tab, tabIndex) => {
                return (
                    <button key={tabIndex}>
                        <h4>{tab}</h4>
                    </button>
                )
            })}
            
        </nav>
    )
}

export default Tabs;