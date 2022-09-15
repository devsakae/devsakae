// Variáveis ajustadas no início do código

// Botão "CORRE PATINHO"
let botaoCorrida = document.getElementById('start-race-btn');

// Divs dos patinhos para facilitar a chamada
let p1 = document.querySelector('.car1');
let p2 = document.querySelector('.car2');

// Div do saco de grana para facilitar a chamada
let apostaNoPato = document.querySelector('.grana');

// Zera as apostas
let pato1 = false;

// Áudio de quack pra quando chegar no final
let quack = new Audio('quack.mp3');

// Bota os patinhos na linha de partida
function voltamOsPatos() {
  p1.style.marginLeft = '1px';
  p2.style.marginLeft = '1px';
}
// Executa a função pra colocar os bichinhos na posição
voltamOsPatos();

// Função que executa a corrida à base de cliques no botaoCorrida
botaoCorrida.addEventListener('click', function () {
  p1.style.marginLeft = parseInt(p1.style.marginLeft) + Math.random() * 50 + 'px';
  p2.style.marginLeft = parseInt(p2.style.marginLeft) + Math.random() * 50 + 'px';

  // Condição a executar quando o p1 chegar no saco de grana
  if (parseInt(p1.style.marginLeft) > (window.innerWidth - 435)) {
    // Toca o tema da vitória! :)
    quack.play();
    // Se o p1 era o apostado, você paga o pato
    if (pato1) {
      alert('Você GANHOU com o AZUL! Pagou o pato QUÁ QUÁ');
    } else {
    // Se o p1 era o apostado, você perdeu a aposta
      alert('O patinho AZUL foi o vencedor!');
    }
    // Coloca os patinhos de volta
    voltamOsPatos();
  }
  // Condição a executar quando o p2 chegar no saco de grana
  if (parseInt(p2.style.marginLeft) > (window.innerWidth - 435)) {
    quack.play();
    if (pato1) {
      alert('O patinho AMARELO foi o vencedor!');
    } else {
      alert('Você GANHOU com o AMARELO! Pagou o pato QUÁ QUÁ');
    } voltamOsPatos();
  }
});

// Função de aposta no pato vencedor
let botoMinhaGranaNoPato = function () {
  // Seta o pato1 pra true e crava amarelo no saco
  if (pato1) {
    pato1 = false;
    apostaNoPato.style.backgroundColor = '#cdaf16';
  }
  // Seta o pato1 pra true e crava azul no saco
  else {
    pato1 = true;
    apostaNoPato.style.backgroundColor = 'dodgerblue';
  }
}
// Aguarda o clique em cima da grana
apostaNoPato.addEventListener('click', botoMinhaGranaNoPato);