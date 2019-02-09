var response
var selected;

//aqui verifica o estado do documento
document.onreadystatechange = function(){
	if (document.readyState == "complete") {
        carregar_filmes();
        
        document.querySelector('#filmes').onchange=mostrar_personagens;
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
                    option.setAttribute('characters',JSON.stringify(el.characters));
                    lista.appendChild(option);
                })
            
            }
            
            
        }
    }
    
    httpRequest.open('GET', 'https://swapi.co/api/films/');
	httpRequest.send();
}
//***********************************************************************************************
function mostrar_personagens(ev){
    //pega o filme selecionado
    selected = ev.target;
    console.log(selected.selectedOptions);
    //transforma string em objetos
    personagens = JSON.parse(selected.selectedOptions[0].getAttribute('characters'));
    console.log(personagens);
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