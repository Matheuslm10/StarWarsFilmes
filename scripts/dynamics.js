let btn_curiosidades = document.querySelector("#texto_botao");
btn_curiosidades.innerText = "+ Ver curiosidades";


function abreFechaDiv(id) {
  var x = document.getElementById(id).style;
  if (x.display == "none" || x.display == '') {
    x.display = "block";
    btn_curiosidades.innerText = "- Ver curiosidades";
  } else {
    x.display = "none";
    btn_curiosidades.innerText = "+ Ver curiosidades";
  }
}

function lerMais(id) {
  var x = document.getElementById(id).style;
  var botao = document.getElementById("lermais").style;
  if (x.height == "70px" || x.height == '') {
    x.height = "auto";
    botao.visibility = "hidden";
  } 
}

