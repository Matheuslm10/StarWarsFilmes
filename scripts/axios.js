let botao    = document.querySelector("#botao");
let btn_prox = document.querySelector("#prox");
let btn_ant  = document.querySelector("#ant");
let titulo   = document.querySelector("#titulo");
let ano      = document.querySelector("#ano_campo");
let diretor  = document.querySelector("#diretor_campo");
let sinopse  = document.querySelector("#sinopse_campo");
let sinopse2 = document.querySelector("#sinopse_2");
let poster   =document.querySelector("#img_poster");

let personagens = document.querySelector("#personagens_lista");
let planetas    = document.querySelector("#planetas_lista");
let especies    = document.querySelector("#especies_lista");
let naves       = document.querySelector("#naves_lista");

let apiUrl;
let numero;
carregarPrimeiroFilme();

function carregarPrimeiroFilme(){
    iconeCarregando();
    numero = Math.floor((Math.random() * 7) + 1);
    apiUrl = 'https://swapi.co/api/films/' + numero + "/";
    
    requisicaoNovoFilme(apiUrl);
}

function requisicaoNovoFilme(apiUrl){
    axios.get(apiUrl).then(function(response){
        atualizarTitulo(response.data);
        pegar_personagem(response.data);
    }); 
}

function acessarXFilme(x){
    iconeCarregando();
    if(x==="prox"){
        if(numero===7){
            numero = 1;
        }else{
            numero++;
        }
    }else if(x==="ant"){
        if(numero===1){
            numero = 7;
        }else{
            numero--;
        }
    }
    
    let linkApi = 'https://swapi.co/api/films/' + numero + "/";
    requisicaoNovoFilme(linkApi);
}

function acessarAntFilme(){
    iconeCarregando();
    if(numero===1){
        numero = 7;
    }else{
        numero--;
    }
    
    let linkApi = 'https://swapi.co/api/films/' + numero + "/";
    
    axios.get(linkApi).then(function(response){
        atualizarTitulo(response.data);
        pegar_personagem(response.data);
    });   
    
}

function atualizarTitulo(data){
    titulo.innerText  = data.title;
    ano.innerHTML     = "<b>Data de lançamento</b>: " + data.release_date ;
    diretor.innerHTML = "<b>Diretor:</b> " + data.director;
    poster.innerHTML  = "<center><img class='tamanho_img' src='imagens/" + data.episode_id + ".jpg'></center>" ;
    esconderSinopse();
    sinopse.innerHTML = "<h3>Sinopse:</h3>"; 
    sinopse2.innerText = data.opening_crawl; 
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
    poster.innerHTML  = '<i class="fa fa-spinner fa-pulse fa-fw"></i><span class="sr-only">Loading...</span>';
    ano.innerText     = "";
    diretor.innerText = "";
    sinopse.innerText = "";
    sinopse2.innerText = "";
    personagens.innerHTML = '<i class="fa fa-spinner fa-pulse fa-fw"></i><span class="sr-only">Loading...</span>';
    planetas.innerHTML    = '<i class="fa fa-spinner fa-pulse fa-fw"></i><span class="sr-only">Loading...</span>';
    especies.innerHTML    = '<i class="fa fa-spinner fa-pulse fa-fw"></i><span class="sr-only">Loading...</span>';
    naves.innerHTML       = '<i class="fa fa-spinner fa-pulse fa-fw"></i><span class="sr-only">Loading...</span>';
}

btn_prox.addEventListener('click', function(){acessarXFilme("prox")});
btn_ant.addEventListener('click', function(){acessarXFilme("ant")});

function esconderSinopse() {
    let x = document.getElementById("div_sinopse").style;
    var botao = document.getElementById("lermais").style;
    if (x.height == "auto" || x.height == '') {
        x.height = "70px";
        botao.visibility = "visible";
    } 
}