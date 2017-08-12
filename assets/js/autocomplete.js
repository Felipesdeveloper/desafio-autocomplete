//busca medicamentos e monta um JSON
function buscarMedicamentos(){
  const request = new XMLHttpRequest();
  request.open("GET", "/assets/js/lista-medicamentos.json");

  request.addEventListener("load", function(){
    if(request.status == 200){
      var requestJson = JSON.parse(request.responseText);

      //chamar função que irá montar a tabela com todos os medicamentos
      exibirMedicamentos(requestJson);
    }else{
      console.log("Erro na requisição")
    }
  });

  request.send();
}
//exibindo medicamentos
function exibirMedicamentos(medicamentos){
  medicamentos.forEach(function(medicamento){
    montarHTML(medicamento);
  });
}
//evento de escuta click
function eventoAddMedicamento(campo, linhasConteudo, linha){
  var listaMedicamentos = document.querySelectorAll(".medicamento");
  for (var i = 0; i < listaMedicamentos.length; i++) {
    listaMedicamentos[i].addEventListener("click", function(event){
      if(linhasConteudo){
        addFormPrescricao(campo,this, linhasConteudo, linha);
      }else{
        addFormPrescricao(campo,this);
      }
    });
  }
}
//montra html
function montarHTML(medicamento){
  var listaMedicamentos = document.querySelector("#lista-medicamentos");

  //criando HTML medicamentos
  var divMedicamento = criaNoHTML("section", "medicamento", "",  listaMedicamentos);
    //verifica titularidade Remedio
    if(medicamento.titularidade == "Referência"){
      var divIcone = criaNoHTML("div", ["icone", "referencia"], "",  divMedicamento);
    }else{
      var divIcone = criaNoHTML("div", ["icone", "generico"], "",  divMedicamento);
    }

    var divNome = criaNoHTML("div", "nome", "",  divMedicamento);
      var tituloNome = criaNoHTML("h2", "medicamento-nome", medicamento.nome,  divNome);
      var subTituloNome = criaNoHTML("h3", ["principio-ativo-medicamento", "sub-titulo"], medicamento.principioAtivo,  divNome);
    var divFabricante = criaNoHTML("div", "fabricante", "",  divMedicamento);
      var tituloFabricante = criaNoHTML("h3", "nome-fabricante", medicamento.fabricante,  divFabricante);
      var titularidadeFabricante = criaNoHTML("h4", ["titularidade-fabricante", "sub-titulo"], medicamento.titularidade,  divFabricante);
    var divPreco = criaNoHTML("div", "preco", "",  divMedicamento);

    //verificando precos
    if(medicamento.precoMax == medicamento.precoMin){
      var pPreco = criaNoHTML("p", "preco-medicamento", `R$${(medicamento.precoMax).toFixed(2)}`,  divPreco);
    }else{
      var pPrecoMinimo = criaNoHTML("p", "preco-minimo", `R$${(medicamento.precoMin).toFixed(2)}`,  divPreco);
      var pPrecoMaximo = criaNoHTML("p", ["preco-maximo", "sub-titulo"], `R$${(medicamento.precoMax).toFixed(2)}`,  divPreco);
    }
}

//Cria HTML
function criaNoHTML(no, classe, texto,  noPai){
  var noHTML = document.createElement(`${no}`);
  //verifica se temos mais de uma classe
  if((typeof classe) == "object"){
    for (var i = 0; i < classe.length; i++) {
      noHTML.classList.add(`${classe[i]}`);
    }
  }else{
    noHTML.classList.add(`${classe}`);
  }

  noHTML.innerHTML = texto;
  noPai.appendChild(noHTML);

  return noHTML;
}
//load autoComplete (com atraso de 700ms para sua saida)
function autoCompleteLoad(carregando){
  var loadAutoComplete = autoComplete.querySelector(".load");
  if(carregando){
    loadAutoComplete.classList.add("is-load");
  }else{
    setTimeout(function(){
      loadAutoComplete.classList.remove("is-load");
    }, 700);
  }
}
//filtrandoMedicamentos
function filtrarMedicamentos(campo){
  var medicamentos = document.querySelectorAll(".medicamento");
  if(typeof campo == "object"){
    campo = campo.value;
  }
  autoCompleteLoad(true);
  for (var i = 0; i < medicamentos.length; i++) {
    var nomeMedicamento = medicamentos[i].querySelector(".medicamento-nome").textContent;
    var filtro = new RegExp(campo, "i");
    if(!(filtro.test(nomeMedicamento))){
      medicamentos[i].classList.add("is-hidden");
    }else{
      medicamentos[i].classList.remove("is-hidden");
    }
  }
  autoCompleteLoad(false);
}

function addFormPrescricao(campo, medicamento, linhasConteudo = false, linha = false){
  var autocomplete = document.querySelector("#autocomplete-container");
  var nomeMedicamento = medicamento.querySelector(".medicamento-nome").textContent;
  var nomeFabricante = medicamento.querySelector(".nome-fabricante").textContent;
  if(linhasConteudo){
    linhasConteudo[linha-1] = nomeMedicamento + " " + nomeFabricante;
    string = linhasConteudo.join("\n");
    campo.value = string;
    campo.focus();
    autocomplete.classList.remove("is-show");
  }else{
    campo.value = nomeMedicamento + " " + nomeFabricante;
    campo.focus();
    autocomplete.classList.remove("is-show");
  }
}

buscarMedicamentos();
