let numeroSecreto;
let vidas;
let tentativas = [];

const txtStatus = document.getElementById("status");
const btnIniciar = document.getElementById("btIniciar");
const numeroChute = document.getElementById("num1");
const btnChutar = document.getElementById("btChutar");
const resultado = document.getElementById("txtResultado");
const mensagem = document.getElementById("mensagem");
const btnReiniciar = document.getElementById("btReiniciar");

btnIniciar.addEventListener("click", novoJogo);
btnChutar.addEventListener("click", chutar);
btnReiniciar.addEventListener("click", resetarJogo);

numeroChute.addEventListener("keydown", (event) => {
  if (event.key === "Enter") chutar();
});

numeroChute.disabled = true;
btnChutar.disabled = true;

function novoJogo() {
  numeroSecreto = Math.floor(Math.random() * 100) + 1;
  vidas = 10;
  tentativas = [];

  numeroChute.disabled = false;
  btnChutar.disabled = false;
  btnIniciar.style.display = "none";
  btnReiniciar.style.display = "inline-block";

  atualizarVidas();
  resultado.innerHTML = "---";
  mensagem.innerHTML = "O número está entre <strong>1 e 100</strong>.<br>Boa sorte!";
  numeroChute.value = "";
  numeroChute.focus();
}

function chutar() {
  let num = parseInt(numeroChute.value);
  if (isNaN(num)) return alert("Digite um número válido!");

  if (num < 1 || num > 100) {
    alert("O número deve estar entre 1 e 100! Perdeu uma vida!");
    vidas--;
  } else if (num === numeroSecreto) {
    mensagem.innerHTML = `🎉 <strong>Parabéns!</strong> Você acertou o número <strong>${numeroSecreto}</strong>!`;
    fimDeJogo(true);
    return;
  } else if (num > numeroSecreto) {
    resultado.innerHTML += `➡️ ${num} — O número é menor.<br>`;
    vidas--;
  } else {
    resultado.innerHTML += `⬅️ ${num} — O número é maior.<br>`;
    vidas--;
  }

  tentativas.push(num);
  atualizarVidas();

  if (vidas === 0) {
    mensagem.innerHTML = `💀 Você perdeu! O número era <strong>${numeroSecreto}</strong>.`;
    fimDeJogo(false);
  }

  numeroChute.value = "";
  numeroChute.focus();
}

function atualizarVidas() {
  txtStatus.innerHTML = "";
  for (let i = 0; i < vidas; i++) {
    txtStatus.innerHTML += "❤️ ";
  }
}

function fimDeJogo(vitoria) {
  numeroChute.disabled = true;
  btnChutar.disabled = true;
  if (vitoria) {
    document.querySelector(".card").style.backgroundColor = "#d4edda";
  } else {
    document.querySelector(".card").style.backgroundColor = "#f8d7da";
  }
}

function resetarJogo() {
  document.querySelector(".card").style.backgroundColor = "#fffaf2";
  btnIniciar.style.display = "inline-block";
  btnReiniciar.style.display = "none";
  numeroChute.disabled = true;
  btnChutar.disabled = true;
  txtStatus.innerHTML = "+ + + + + + + + + +";
  resultado.innerHTML = "---";
  mensagem.innerHTML = "Clique em <strong>Iniciar</strong> para começar!";
}
