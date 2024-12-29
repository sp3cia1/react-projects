import { useState } from "react"
import { first151Pokemon, getFullPokedexNumber } from "../utils"

export default function SideNav(props){
    const {selectedPokemon, setSelectedPokemon, handleToggleMenu, showSideMenu} = props
    const [searchValue, setSearchValue] = useState("")

    const filteredPokemon = first151Pokemon.filter((ele,eleIndex) => {
        //if full pokedex number includees the current search value, return true
        if (getFullPokedexNumber(eleIndex).includes(searchValue)) { return true }

        //if pokemon name includes the current search value return true
        if(ele.toLowerCase().includes(searchValue.toLowerCase())){ return true }

        //otherwise fillter the value out
        return false
    })

    return(
        
        <nav className={' ' + (!showSideMenu ? 'open' : '')}>
            <div className={"header " + (!showSideMenu ? 'open' : '')}>
                <button onClick = {() => handleToggleMenu()} className="open-nav-button">
                    <i className="fa-solid fa-arrow-left-long"></i>
                </button>
                <h1 className="text-gradient">Pokedex</h1>
            </div>
            <input placeholder = 'E.g 001 or Bulba...' value={searchValue} onChange={(e)=> {setSearchValue(e.target.value)}} />
            {
                filteredPokemon.map((pokemon) => {
                    const pokemonIndex = first151Pokemon.indexOf(pokemon)
                    return(
                        <button key={pokemonIndex} className={'nav-card ' + (selectedPokemon === pokemonIndex ? 'nav-card-selected':" ")} 
                        onClick = {() => {
                            setSelectedPokemon(pokemonIndex)
                        }}>
                            <p>{getFullPokedexNumber(pokemonIndex)}</p>
                            <p>{pokemon}</p>
                        </button>
                    )
                })
                    
            }
        </nav>
    )
}