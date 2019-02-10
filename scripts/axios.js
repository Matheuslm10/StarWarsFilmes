let botao   = document.querySelector("#botao");
let titulo  = document.querySelector("#titulo");
let ano     = document.querySelector("#ano_campo");
let diretor = document.querySelector("#diretor_campo");
let sinopse = document.querySelector("#sinopse_campo");

let personagens = document.querySelector("#personagens_lista");
let planetas    = document.querySelector("#planetas_lista");
let especies    = document.querySelector("#especies_lista");
let naves       = document.querySelector("#naves_lista");

function acessarFilmes(){
    iconeCarregando();
    let randomNumber = Math.floor((Math.random() * 7) + 1);
    let apiUrl = 'https://swapi.co/api/films/' + randomNumber + "/";
    
    axios.get(apiUrl).then(function(response){
        atualizarTitulo(response.data);
        pegar_personagem(response.data);
    });    
}

function atualizarTitulo(data){
    titulo.innerText  = data.title;
    ano.innerText     = "Ano de lançamento: " + data.release_date;
    diretor.innerText = "Diretor: " + data.director;
    sinopse.innerText = "Sinopse: " + data.opening_crawl;    
}

function pegar_personagem(data){
    personagens.innerHTML = "";
    planetas.innerHTML = "";
    especies.innerHTML = "";
    naves.innerHTML = "";
    for (i = 0; i < data.characters.length; i++) {
        acessarObjeto(data.characters[i], "personagem");
    }  
    for (i = 0; i < data.planets.length; i++) {
        acessarObjeto(data.planets[i], "planeta");
    }
    for (i = 0; i < data.species.length; i++) {
        acessarObjeto(data.species[i], "especie");
    }
    for (i = 0; i < data.starships.length; i++) {
        acessarObjeto(data.starships[i], "nave");
    }    
}

function acessarObjeto(apiURL, tipo){
    axios.get(apiURL).then(function(response){
        preencherLista(response.data, tipo);      
    });
}

function preencherLista(data, tipo){
    li = document.createElement("li");
    li.innerHTML = data.name;
    
    switch(tipo) {
          case "personagem":
            personagens.appendChild(li);
            break;
            
          case "planeta":
            planetas.appendChild(li);
            break;
            
          case "especie":
            especies.appendChild(li);
            break;
            
          case "nave":
            naves.appendChild(li);
            break;
            
          default:
            console.log("TIPO NAO CONHECIDO!")
    }    
}

function iconeCarregando(data){
    titulo.innerHTML  = '<i class="fa fa-spinner fa-pulse fa-fw"></i><span class="sr-only">Loading...</span>';
    ano.innerText     = "";
    diretor.innerText = "";
    sinopse.innerText = "";
    personagens.innerHTML = '<i class="fa fa-spinner fa-pulse fa-fw"></i><span class="sr-only">Loading...</span>';
    planetas.innerHTML    = '<i class="fa fa-spinner fa-pulse fa-fw"></i><span class="sr-only">Loading...</span>';
    especies.innerHTML    = '<i class="fa fa-spinner fa-pulse fa-fw"></i><span class="sr-only">Loading...</span>';
    naves.innerHTML       = '<i class="fa fa-spinner fa-pulse fa-fw"></i><span class="sr-only">Loading...</span>';
}

botao.addEventListener('click', acessarFilmes);