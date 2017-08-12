var formPrescricao = document.querySelector(".form-prescricao");
var autoComplete = document.querySelector("#autocomplete-container");

//sempre que iniciar da o focus no campo
(function(){
  formPrescricao.prescricao.focus();
}())
/*
 * Função que verifica irá buscar ou se será um texto simples
 *
*/
function buscarOuTextoLivre(){
  var campo = this;
  posicaoIcone(campo);
  var value = campo.value;
  if(value  == 0){
    autoComplete.classList.remove("is-show");
    formPrescricao.classList.remove("texto-livre");
    formPrescricao.classList.add("busca");
  }else{
    buscar(campo);
  }
  verificaQuebraLinha(campo);
}
//verifica quebra de linhas
function verificaQuebraLinha(campo){
  var linha = 1;
  var coluna = 1;
  var value = campo.value;
  for(var i = 0; i < value.length; i++){
    var caracter = value.charAt(i);
    if(caracter == "\n"){
      linha++;
      coluna = 1;
      var linhasConteudo = value.split('\n');
      //verifica se a linha anterior está vazia
      if(linhasConteudo[(linha-2)].length == 0){
        formPrescricao.classList.remove("texto-livre");
        formPrescricao.classList.add("busca");
        if(linhasConteudo[(linha-1)].length > 0){
          buscar(campo, linhasConteudo, linha);
        }
      }else{
        apenasTexto();
        mostrarTodosMedicamentos();
      }
    }else{
      coluna++
    }
  }
}
//faz a busca do medicamento
function buscar(campo, linhasConteudo = false, linha = 1){
  autoComplete.classList.add("is-show");
  posicaoAutoComplete(campo);
  if(typeof linhasConteudo == "object"){
    filtrarMedicamentos(linhasConteudo[(linha-1)]);
  }else{
    filtrarMedicamentos(campo);
  }
  eventoAddMedicamento(campo, linhasConteudo, linha);
}
//mostra todos os medicamentos
function mostrarTodosMedicamentos(){
  var medicamentos = document.querySelectorAll(".medicamento");
  for (var i = 0; i < medicamentos.length; i++) {
    medicamentos[i].classList.remove("is-hidden");
  }
}
//quando é apenas texto
function apenasTexto(){
  formPrescricao.classList.remove("busca");
  formPrescricao.classList.add("texto-livre");
  autoComplete.classList.remove("is-show");
}
//posicao do icone na textarea
function posicaoIcone(campo){
  var cordenadasCaret = getCaretCoordinates(campo, campo.selectionEnd, { debug: false });
  var style = document.querySelector("style");
  style.innerHTML = ".form-prescricao::before{top: "+ (cordenadasCaret.top - 10) + "px}";
  formPrescricao.prescricao.style.height = formPrescricao.prescricao.scrollHeight + "px";
}
//posicao  do autoComplete
function posicaoAutoComplete(campo){
  var cordenadasCaret = getCaretCoordinates(campo, campo.selectionEnd, { debug: false });
  autoComplete.style.top = (cordenadasCaret.top + 100) + "px";
  formPrescricao.prescricao.style.height = formPrescricao.prescricao.scrollHeight + "px";
}

formPrescricao.prescricao.addEventListener("keyup", buscarOuTextoLivre);
