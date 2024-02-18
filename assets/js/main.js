const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const modal = document.querySelector('.modal')
const btn = document.querySelector('.modalBtn')
const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="modalBtn name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}



function convertCardDetail(pokemon) {
  return `
      
        <div class="modal-dialog" role="document">
          <div class="modal-content color-card ">
            <div class="modal-header">
              <h5 class="modal-title name">${pokemon.name}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
              <div class="pokedex-img ${pokemon.type}">
                <img class="card-img-top  style="width: 50%;""  src="${pokemon.photo}" alt="${pokemon.name}">
              </div>

              <ul class="list-group list-group-flush">
                ${pokemon.status.map((st) => `
                  <li class="row status">
                      <div class="col-4 font-status">
                        ${st.name}:
                      </div>
                      <div class="col-8 progress">
                        <div class="progress-bar" style="width: ${st.value}%; font-size: 0.8rem"  role="progressbar" aria-valuenow="${st.value}" aria-valuemin="0" aria-valuemax="150">${st.value}</div>
                      </div>
                  </li>
                `).join('')}
              </ul>
          </div>
        </div>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

const switchModal = (opc) => {
  if(opc == 1) {
    modal.style.display = 'block'
  }
  else {
    modal.style.display = 'none'
  }
}

window.onclick = function (event, field) {
  if (event.target.classList[0]
    == 'modalBtn') {
    switchModal(1);
    openCardDetails(event.target.innerHTML);
  } else {
    switchModal(0);
  }
}

function openCardDetails(poke) {
  pokeApi.getPokemonCard(poke).then((poke = {}) => {
    debugger
    const newHtml = convertCardDetail(poke);
        modal.innerHTML = newHtml
  })
}

// https://pokeapi.co/api/v2/pokemon/{id or name}/