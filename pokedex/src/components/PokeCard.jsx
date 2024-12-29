import { useEffect, useState } from "react"
import { getFullPokedexNumber, getPokedexNumber } from "../utils"
import TypeCard from "./TypeCard"
import Modal from "./Modal"

export default function PokeCard(props){
    const {selectedPokemon} = props
    const [data, setData] = useState(null)
    const [loading,setLoading] = useState(false)
    const [skill, setSkill] = useState(null)
    const [loadingSkill, setLoadingSkill] = useState(false)


    const {name, height, abilities, stats, types, moves, sprites} = data || {}
    
    if(moves){
        moves.sort((a,b) => {
            const nameA = a.move.name.toLowerCase()
            const nameB = b.move.name.toLowerCase()
    
            if (nameA > nameB) { return 1}
            if (nameA < nameB) { return -1}
            return 0
        })
    }
    
    console.log(moves)
    //create an array with keys in sprites
    const imgList = Object.keys(sprites || {}).filter(val => {
        //filter all the keys whose value is null
        if (!sprites[val]) {return false}
        //filter the versions and other keys
        if(val === "versions" || val === "other") {return false}
        return true
        
    })
    
    async function fetchMoveData(move, moveUrl){
        if (loadingSkill || !localStorage || !moveUrl) { return }

        //check cache
        let c = {}
        if (localStorage.getItem('pokemon-moves')) {
            c = JSON.parse(localStorage.getItem('pokemon-moves'))
        }
        if(move in c) {
            setSkill(c[move])
            console.log('Found move in cache')
            return
        }
        try {
            setLoadingSkill(true)
            const res = await fetch(moveUrl)
            const moveData = await res.json()
            console.log('fetching ' + move + ' from Api')
            const description = moveData?.flavor_text_entries.filter(
                val => {
                    return val.version_group.name = 'firered-leafgreen'
                }
            )[0]?.flavor_text

            const skillData = {
                name: move,
                description
            }
            setSkill(skillData)
            c[move] = skillData
            localStorage.setItem('pokemon-moves', JSON.stringify(c))
        } catch(err){
            console.log(err)
        }finally{
            setLoadingSkill(false)
        }
    }

    useEffect(() => {
        // if loading or if local storage is null in the beggining, exit logic
        if (loading || !localStorage) { return }

        // check if the selected pokemon info is in the cache
        //1. define cache
        let cache = {}
        if (localStorage.getItem('pokedex')) {
            cache = JSON.parse(localStorage.getItem('pokedex'))
        }

        //2.check if the selcted pokemon is in the cache, otherwise fetch from teh api

        if(selectedPokemon in cache){
            //read from cache
            setData(cache[selectedPokemon])
            console.log("read from cache")
            return
        }

        //we passed all the cache stuff to no avail and now need to fetch from the api

        async function fetchPokemonData(){
            setLoading(prev => !prev)
            try{
                const baseUrl = 'https://pokeapi.co/api/v2/'
                const suffix = 'pokemon/' + getPokedexNumber(selectedPokemon)
                console.log('fetching' + suffix)
                const finalUrl = baseUrl + suffix
                const res = await fetch(finalUrl)
                const pokemonData = await res.json()
                setData(pokemonData)
                // since we are fetching from the api, make sure to save the information to the cache for next time.

                cache[selectedPokemon] = pokemonData
                localStorage.setItem('pokedex',JSON.stringify(cache))

            } catch (err) {
                console.log(err)
            } finally {
                setLoading(prev => !prev)
            }
        }

        fetchPokemonData()

        
    },[selectedPokemon])

    if(loading || !data) {
        return(
            <div>
                <h4>Loading...</h4>
            </div>
        )
    }
    
    return(
        <div className="poke-card">
            {skill && (
                <Modal handleCloseModal={() => { setSkill(null) }}>
                <div>
                    <h6>Name</h6>
                    <h2 className="skill-name">{skill.name.replaceAll('-', ' ')}</h2>
                </div>
                <div>
                    <h6>Description</h6>
                    <p>{skill.description}</p>
                </div>
            </Modal>
            )}
            <div>
                <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
                <h2>{name}</h2>

            </div>
            <div className="type-container">
                {types.map((typeObj, typeIndex) =>{
                    return(
                        <TypeCard key = {typeIndex} type= {typeObj?.type?.name}/>
                    )
                })}
            </div>
            <img className='default-img' src={'/pokemon/' + getFullPokedexNumber(selectedPokemon) + '.png'} alt = {`${name}-large-img`}/>
            <div className='img-container'>
                {imgList.map((spriteUrl, spriteIndex) => {
                    const imgUrl = sprites[spriteUrl]
                    return(
                        <img key = {spriteIndex} src= {imgUrl} alt = {`${name}-img-${spriteUrl}`} />
                    )
                })}
            </div>
            <h3>Stats</h3>
            <div className="stats-card">
                {stats.map ((statObj, statIndex) => {
                    const { stat, base_stat } = statObj
                    return (
                        <div key = {statIndex} className='stat-item'>
                            <p>{stat?.name.replaceAll('-', " ")}</p>
                            <h4>{base_stat}</h4>
                        </div>
                    )
                })}
            </div>
            <div className="pokemon-move-grid">
                {
                moves.map((moveObj, moveIndex) => {
                    return(
                        <button className= 'button-card pokemon-move' key={moveIndex} 
                            onClick={() => {
                                console.log('Click registered')
                                fetchMoveData(moveObj?.move?.name, moveObj?.move?.url)
                            }}
                        >
                            <p>{moveObj?.move?.name?.replaceAll('-', ' ')}</p>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}