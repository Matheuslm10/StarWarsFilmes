var response
var selected;

//aqui verifica o estado do documento
document.onreadystatechange = function(){
	if (document.readyState == "complete") {
        carregar_filmes();
        
        document.querySelector('#filmes').onchange=mostrar_dados;
	}
}
//***********************************************************************************************
function carregar_filmes(){
    var httpRequest = new XMLHttpRequest();
    
    //aqui verifica o estado do request
    httpRequest.onreadystatechange = function(){
        if (httpRequest.readyState === 4){
            if (httpRequest.status === 200){
                
                //transforma string em objetos
                response = JSON.parse(httpRequest.responseText);
                
                //seleciona os filmes
                var lista = document.querySelector("#filmes");
                
                //limpa os nomes do html
                lista.innerHTML = "";
                
                //pega o titulo do filme de cada elemento
                response.results.forEach(function(el){
                    option = document.createElement("option");
                    option.innerHTML = el.title;
                    option.setAttribute('release_date',JSON.stringify(el.release_date));
                    option.setAttribute('director',JSON.stringify(el.director));
                    option.setAttribute('opening_crawl',JSON.stringify(el.opening_crawl));
                    option.setAttribute('characters',JSON.stringify(el.characters));
                    option.setAttribute('planets',JSON.stringify(el.planets));
                    option.setAttribute('species',JSON.stringify(el.species));
                    option.setAttribute('starships',JSON.stringify(el.starships));
                    lista.appendChild(option);
                })
            
            }
            
            
        }
    }
    
    httpRequest.open('GET', 'https://swapi.co/api/films/');
	httpRequest.send();
}
//***********************************************************************************************
function mostrar_dados(ev){
    mostrar_atributos(ev);
    mostrar_personagens(ev);
    mostrar_planetas(ev);
    mostrar_especies(ev);
    mostrar_naves(ev);
}
//***********************************************************************************************
function mostrar_atributos(ev){
    selected = ev.target;
    
    var ano_campo = document.querySelector("#ano_campo");
    var diretor_campo = document.querySelector("#diretor_campo");
    var sinopse_campo = document.querySelector("#sinopse_campo");
    
    ano_campo.innerHTML = JSON.parse(selected.selectedOptions[0].getAttribute('release_date'));
    diretor_campo.innerHTML = JSON.parse(selected.selectedOptions[0].getAttribute('director'));
    sinopse_campo.innerHTML = JSON.parse(selected.selectedOptions[0].getAttribute('opening_crawl'));

}
//***********************************************************************************************
function mostrar_personagens(ev){
    //pega o filme selecionado
    selected = ev.target;
    //console.log(selected.selectedOptions);
    //transforma string em objetos
    personagens = JSON.parse(selected.selectedOptions[0].getAttribute('characters'));
    //console.log(personagens);
    var lista = document.querySelector("#personagens_lista");
    lista.innerHTML = "";
    
    
    personagens.forEach(function(url){
        var httpRequest = new XMLHttpRequest();
        
        httpRequest.onreadystatechange = function(){        
            if (httpRequest.readyState === 4){
                if (httpRequest.status === 200){
                    
                    personagem = JSON.parse(httpRequest.responseText);

                    li = document.createElement("li");
                    li.innerHTML = personagem.name;
                    lista.appendChild(li);
                }

            }  
        }
    
        httpRequest.open('GET', url);
        httpRequest.send();
    
    
    }) 
    
}
//***********************************************************************************************
function mostrar_planetas(ev){
    //pega o filme selecionado
    selected = ev.target;
    
    //transforma string em objetos
    planetas = JSON.parse(selected.selectedOptions[0].getAttribute('planets'));
    
    var lista = document.querySelector("#planetas_lista");
    lista.innerHTML = "";
    
    
    planetas.forEach(function(url){
        var httpRequest = new XMLHttpRequest();
        
        httpRequest.onreadystatechange = function(){        
            if (httpRequest.readyState === 4){
                if (httpRequest.status === 200){
                    
                    planeta = JSON.parse(httpRequest.responseText);

                    li = document.createElement("li");
                    li.innerHTML = planeta.name;
                    lista.appendChild(li);
                }

            }  
        }
    
        httpRequest.open('GET', url);
        httpRequest.send();
    
    
    })
}
//***********************************************************************************************
function mostrar_especies(ev){
    //pega o filme selecionado
    selected = ev.target;

    //transforma string em objetos
    especies = JSON.parse(selected.selectedOptions[0].getAttribute('species'));
    var lista = document.querySelector("#especies_lista");
    lista.innerHTML = "";


    especies.forEach(function(url){
        var httpRequest = new XMLHttpRequest();

        httpRequest.onreadystatechange = function(){        
            if (httpRequest.readyState === 4){
                if (httpRequest.status === 200){

                    especie = JSON.parse(httpRequest.responseText);

                    li = document.createElement("li");
                    li.innerHTML = especie.name;
                    lista.appendChild(li);
                }

            }  
        }

        httpRequest.open('GET', url);
        httpRequest.send();


    })
}
//***********************************************************************************************
function mostrar_naves(ev){
    //pega o filme selecionado
    selected = ev.target;

    //transforma string em objetos
    naves = JSON.parse(selected.selectedOptions[0].getAttribute('starships'));
    
    var lista = document.querySelector("#naves_lista");
    lista.innerHTML = "";
    
    
    naves.forEach(function(url){
        var httpRequest = new XMLHttpRequest();
        
        httpRequest.onreadystatechange = function(){        
            if (httpRequest.readyState === 4){
                if (httpRequest.status === 200){
                    
                    nave = JSON.parse(httpRequest.responseText);

                    li = document.createElement("li");
                    li.innerHTML = nave.name;
                    lista.appendChild(li);
                }

            }  
        }
    
        httpRequest.open('GET', url);
        httpRequest.send();
    
    
    }) 
    
}