//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'jogo do numero secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML= 'Escolha um numero entre 1 e 10';
let listaDeNumerosSorteados = [];
let numeroLimite = 50;
let numeroSecreto = gerarNumeroSecreto();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'jogo do numero secreto');
    exibirTextoNaTela('p', `Escolha um numero entre 1 e ${numeroLimite}`);
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if(chute == numeroSecreto){
        exibirTextoNaTela('h1', 'ACERTOUUUU');
        let palavraTentaviva = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `voce acertou o numero secreto com ${tentativas} ${palavraTentaviva}`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if(chute > numeroSecreto){
            exibirTextoNaTela('p', 'o numero secreto é menor');
        }else{
            exibirTextoNaTela('p', 'o numero secreto é maior');
        }
        tentativas++;
        limpaCampo();

    }
}

function gerarNumeroSecreto(){
   let numeroGerados = parseInt(Math.random() * numeroLimite + 1);
   let quantidadeDeNumeroNaLista = listaDeNumerosSorteados.length;

   if(quantidadeDeNumeroNaLista ==  numeroLimite){
    listaDeNumerosSorteados = [];
   }

   if(listaDeNumerosSorteados.includes(numeroGerados)){
    return gerarNumeroAleatorio();
   }else{
    listaDeNumerosSorteados.push(numeroGerados);
    console.log (listaDeNumerosSorteados);
    return numeroGerados;
   }
}

function limpaCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto= gerarNumeroSecreto();
    limpaCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);

}