//Selectors

const pokemonCard = document.querySelector("#pokemon-card");
const bringMePokemon = document.querySelector("#bringMe")
const buscador = document.querySelector("#buscador")
const paginaDiv = document.querySelector("#paginacion")


let pokemonCollection = []
let listMap = []
let pokemonObject = {info: "", image:"", height:"",weight:"", type:""}

window.onload = () => {
    init()
}

buscador.addEventListener("click", (e) => {
    e.preventDefault()
       let input = document.querySelector("#input").value
       filteredPokemon(listMap, input)
   })

bringMePokemon.addEventListener("click", () => {
       pokemonCard.innerHTML = ""
       buildHtml(listMap)
       
   })


async function init()  {

    const array = await pokemonSearch()
    const pokemonesMapeados = pokemonMapped(array)
    const pokemonesPintados = buildHtml(pokemonesMapeados)

}

async function pokemonSearch (){
    
        for(let i=1; i <= 100; i++){
            const fetchApi = await fetch("https://pokeapi.co/api/v2/pokemon/"+i)
            const result = await fetchApi.json()
            pokemonCollection.push(result)
        }

        return pokemonCollection
        
}

function pokemonMapped(result){

    listMap = result.map((resultado) => {
               
                return {info: resultado.species.name,
                image: resultado.sprites.other.dream_world.front_default,
                height: resultado.height,
                weight: resultado.weight,
                type: resultado.types[0].type.name}
        
    })

    return listMap;

}


function filteredPokemon (listMap, input){


    listMap.filter(pokemon => {
        if(pokemon.info.includes(input)){
         let arraynuevo = []
         arraynuevo.push(pokemon)
         pokemonCard.innerHTML= ""
         buildHtml(arraynuevo)
        }
    })

}
    
function buildHtml (characters){


characters.map((character) => {
            
            pokemonCard.classList.add("flex-row")
            pokemonCard.innerHTML += `
            
            
            <li class="flex-row padding ">
            <div class="flex-column border padding bg-${character.type} hover shadow card">
            <h2 class="h2">${character.info}</h2>
            <img src="${character.image}" alt="${character.image}" width="150" height="150">
                <p>Altura: ${character.height}</p>
                <p>Peso: ${character.weight}</p>
                <p>tipo: ${character.type}</p>
            </div>
        //     </li>
            
            ` 
})

}