// Função para atualizar o relógio
function atualizarRelogio() {
    var dataAtual = new Date();
    
    var horas = formatarNumero(dataAtual.getHours());
    var minutos = formatarNumero(dataAtual.getMinutes());
    var segundos = formatarNumero(dataAtual.getSeconds());

    var diaSemana = obterDiaSemana(dataAtual.getDay());
    var dia = formatarNumero(dataAtual.getDate());
    var mes = formatarNumero(dataAtual.getMonth() + 1); // +1 porque os meses são indexados de 0 a 11
    var ano = dataAtual.getFullYear();
    
    document.getElementById("horas").textContent = horas;
    document.getElementById("minutos").textContent = minutos;
    document.getElementById("segundos").textContent = segundos;

    document.getElementById("diaData").textContent = `${diaSemana}, ${dia}/${mes}/${ano}`;
  }
  
  // Função para formatar números menores que 10 adicionando um zero à esquerda
  function formatarNumero(numero) {
    if (numero < 10) {
      return "0" + numero;
    }
    return numero;
  }

  // Função para obter o nome do dia da semana
function obterDiaSemana(dia) {
  var diasSemana = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return diasSemana[dia];
}

// Chamar a função para atualizar o relógio e a data a cada segundo
  setInterval(atualizarRelogio, 1000);

  //Previsão do tempo

const apiKey = 'a84ead48d7a44fe47dc7fe7aecf614d8' // chave aprkey

async function obterPrevisaoTempo(cidade) {
  try {
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      const temperatura = Math.round(data.main.temp - 273.15); // Convertendo de Kelvin para Celsius
      const nomeCidade = data.name;

      const divCidade = document.getElementById('divCidade');
      const divPrevisao = document.getElementById('divPrevisao');

      divCidade.textContent = nomeCidade;
      divPrevisao.textContent = `${temperatura}°C`;
    } else {
      console.log('Não foi possível obter a previsão do tempo.');
    }
  } catch (error) {
    console.log('Ocorreu um erro ao buscar a previsão do tempo:', error);
  }
}

const inputPesquisa = document.getElementById('brPesquisa');
const buttonEnviar = document.getElementById('btnPesquisar');

buttonEnviar.addEventListener('click', function (event) {
  event.preventDefault(); // Impede o comportamento padrão de envio do formulário
  const cidade = inputPesquisa.value;
  obterPrevisaoTempo(cidade);
});

// Exemplo inicial
obterPrevisaoTempo('Cidade...');

//