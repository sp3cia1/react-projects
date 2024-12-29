import { pokemonTypeColors } from "../utils"

export default function TypeCard(props){
    const {type} = props

    return(
        <div className="type-tile" style= {{color: pokemonTypeColors?.[type]?.color, background: pokemonTypeColors?.[type]?.background}}> 
        {/* Used [type] instead of just type because its a dynamic variable which can be used to access different keys in the pokemonTypeColorObject based on its value*/}
            <p>{type}</p>
        </div>
    )
}