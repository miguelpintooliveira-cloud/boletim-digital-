/* =========================================================
   BOLETIM DIGITAL — 8º ANO
   Dados fictícios para demonstração.
   ========================================================= */

/* ---------------------------------------------------------
   CONCEITO: ARRAY
   Um array é uma lista. Aqui temos uma lista de disciplinas.
   CONCEITO: OBJETO
   Cada item da lista é um objeto, ou seja, um "pacote" com
   várias informações juntas (disciplina, notas e faltas).
   --------------------------------------------------------- */
const dadosBrutos = [
  { disciplina: "Língua Portuguesa", tri1: 82, tri2: "7,8", tri3: 85, faltas: [2, 1, 1] },
  { disciplina: "Matemática", tri1: 52, tri2: "5,8", tri3: null, faltas: [3, 2, 1] },
  { disciplina: "Ciências", tri1: "8,1", tri2: 76, tri3: 8.0, faltas: [1, 2, 0] },
  { disciplina: "História", tri1: 7.0, tri2: 84, tri3: null, faltas: [1, 1, 1] },
  { disciplina: "Geografia", tri1: 68, tri2: 7.3, tri3: "7,9", faltas: [0, 1, 1] },
  { disciplina: "Língua Inglesa", tri1: 86, tri2: "8,1", tri3: 8.7, faltas: [1, 0, 0] },
  { disciplina: "Arte", tri1: 9.0, tri2: 92, tri3: null, faltas: [1, 1, 0] },
  { disciplina: "Educação Física", tri1: 95, tri2: 9.0, tri3: "9,4", faltas: [0, 1, 0] },
  { disciplina: "Educação Digital", tri1: 88, tri2: 9.1, tri3: 93, faltas: [1, 0, 1] },
  { disciplina: "Educação Financeira", tri1: 74, tri2: "7,8", tri3: null, faltas: [1, 1, 1] },
  { disciplina: "Estudo Orientado", tri1: 8.0, tri2: 83, tri3: "8,5", faltas: [0, 1, 0] },
  { disciplina: "Redação e Leitura", tri1: 62, tri2: "6,8", tri3: null, faltas: [2, 1, 1] },
  { disciplina: "Pensamento Lógico", tri1: 48, tri2: 5.6, tri3: "6,0", faltas: [2, 2, 1] },
  { disciplina: "Literatura Arte e Movimento", tri1: "7,7", tri2: 80, tri3: null, faltas: [1, 0, 1] },
  { disciplina: "Práticas Experimentais", tri1: 58, tri2: "6,2", tri3: 6.4, faltas: [1, 1, 1] }
];

/* ---------------------------------------------------------
   CONCEITO: VARIÁVEL
   Uma variável é uma "caixinha" onde guardamos um valor.
   --------------------------------------------------------- */
const MEDIA_MINIMA = 6.0;

/* Frequência fictícia apenas para demonstração nesta etapa.
   No futuro, será calculada de outra forma. */
const FREQUENCIA_DEMONSTRATIVA = 92;

/* ---------------------------------------------------------
   CONCEITO: FUNÇÃO
   Uma função é um bloco de código que faz uma tarefa.
   Aqui, ela recebe um valor de nota e devolve a nota
   normalizada para a escala de 0 a 10.
   --------------------------------------------------------- */
function normalizarNota(valor) {
  // Vazio, null ou undefined = nota ainda não lançada
  if (valor === null || valor === undefined || valor === "") {
    return null;
  }

  // Aceita vírgula decimal: transforma "7,8" em 7.8
  if (typeof valor === "string") {
    valor = valor.replace(",", ".");
  }

  // Converte para número
  const numero = Number(valor);

  // Se não for um número válido, trata como inválido
  if (isNaN(numero)) {
    return null;
  }

  // Entre 0 e 10 permanece igual
  if (numero >= 0 && numero <= 10) {
    return numero;
  }

  // Maior que 10 e menor ou igual a 100 → divide por 10
  if (numero > 10 && numero <= 100) {
    return numero / 10;
  }

  // Fora das regras → inválido
  return null;
}

/* ---------------------------------------------------------
   Calcula a média de uma disciplina usando SOMENTE as
   notas disponíveis. Nota ausente nunca vira zero.
   --------------------------------------------------------- */
function calcularMedia(notas) {
  // Filtra apenas as notas válidas (não nulas)
  const notasValidas = notas.filter(function (n) {
    return n !== null;
  });

  // Se não houver nenhuma nota válida, retorna null
  if (notasValidas.length === 0) {
    return null;
  }

  // Soma todas as notas válidas
  let soma = 0;
  notasValidas.forEach(function (n) {
    soma += n;
  });

  // Média = soma / quantidade de notas válidas
  return soma / notasValidas.length;
}

/* ---------------------------------------------------------
   Define a situação da disciplina com base na média.
   --------------------------------------------------------- */
function definirSituacao(media) {
  // CONCEITO: IF
  // O if toma uma decisão com base em uma condição.
  if (media === null) {
    return "Nota ainda não disponível";
  }
  if (media >= MEDIA_MINIMA) {
    return "Bom desempenho";
  }
  return "Atenção";
}

/* ---------------------------------------------------------
   Formata a nota para exibição. Se for null, mostra
   "Ainda não lançada". Senão, mostra com uma casa decimal
   usando vírgula (padrão brasileiro).
   --------------------------------------------------------- */
function formatarNota(nota) {
  if (nota === null) {
    return "Ainda não lançada";
  }
  return nota.toFixed(1).replace(".", ",");
}

/* ---------------------------------------------------------
   Prepara uma lista já processada com tudo que precisamos:
   notas normalizadas, média, faltas somadas e situação.
   --------------------------------------------------------- */
function processarDados() {
  // CONCEITO: FOREACH
  // forEach percorre cada item do array e executa uma ação.
  return dadosBrutos.map(function (item) {
    // Normaliza cada trimestre
    const n1 = normalizarNota(item.tri1);
    const n2 = normalizarNota(item.tri2);
    const n3 = normalizarNota(item.tri3);

    // Calcula média apenas com notas disponíveis
    const media = calcularMedia([n1, n2, n3]);

    // Soma as faltas dos três trimestres
    const totalFaltas = item.faltas.reduce(function (soma, f) {
      return soma + f;
    }, 0);

    return {
      disciplina: item.disciplina,
      tri1: n1,
      tri2: n2,
      tri3: n3,
      media: media,
      faltas: totalFaltas,
      situacao: definirSituacao(media)
    };
  });
}

/* ---------------------------------------------------------
   CONCEITO: DOM
   DOM é a representação da página HTML no JavaScript.
   Com ele, conseguimos criar e alterar elementos na tela.
   --------------------------------------------------------- */

/* Preenche os cards de resumo no topo */
function preencherCards(dados) {
  const containerCards = document.getElementById("cards");

  // Média geral: média de todas as médias disponíveis
  const mediasDisponiveis = dados
    .map(function (d) { return d.media; })
    .filter(function (m) { return m !== null; });

  let mediaGeral = 0;
  if (mediasDisponiveis.length > 0) {
    let soma = 0;
    mediasDisponiveis.forEach(function (m) { soma += m; });
    mediaGeral = soma / mediasDisponiveis.length;
  }

  // Total de faltas de todas as disciplinas
  let totalFaltasGeral = 0;
  dados.forEach(function (d) { totalFaltasGeral += d.faltas; });

  // Contagem de bons desempenhos e de atenção
  let bons = 0;
  let atencao = 0;
  dados.forEach(function (d) {
    if (d.situacao === "Bom desempenho") bons++;
    if (d.situacao === "Atenção") atencao++;
  });

  // Monta os cards em HTML
  containerCards.innerHTML = `
    <div class="card">
      <h3>Média geral</h3>
      <p class="valor">${mediaGeral.toFixed(1).replace(".", ",")}</p>
    </div>
    <div class="card">
      <h3>Total de faltas</h3>
      <p class="valor">${totalFaltasGeral}</p>
    </div>
    <div class="card">
      <h3>Bom desempenho</h3>
      <p class="valor">${bons} disciplinas</p>
    </div>
    <div class="card">
      <h3>Precisam de atenção</h3>
      <p class="valor destaque-vermelho">${atencao} disciplinas</p>
    </div>
    <div class="card">
      <h3>Frequência demonstrativa</h3>
      <p class="valor">${FREQUENCIA_DEMONSTRATIVA}%</p>
      <p style="font-size:0.8rem; color:#b8b8bd; margin-top:4px;">Frequência adequada</p>
    </div>
  `;
}

/* Preenche a tabela com as 15 disciplinas */
function preencherTabela(dados) {
  const corpoTabela = document.getElementById("corpo-tabela");

  // Limpa a tabela antes de preencher
  corpoTabela.innerHTML = "";

  dados.forEach(function (d) {
    // Define a classe CSS de acordo com a situação
    let classeSituacao = "situacao-indisponivel";
    if (d.situacao === "Bom desempenho") classeSituacao = "situacao-bom";
    if (d.situacao === "Atenção") classeSituacao = "situacao-atencao";

    // Monta a linha da tabela
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${d.disciplina}</td>
      <td class="${d.tri1 === null ? "nota-vazia" : ""}">${formatarNota(d.tri1)}</td>
      <td class="${d.tri2 === null ? "nota-vazia" : ""}">${formatarNota(d.tri2)}</td>
      <td class="${d.tri3 === null ? "nota-vazia" : ""}">${formatarNota(d.tri3)}</td>
      <td>${formatarNota(d.media)}</td>
      <td>${d.faltas}</td>
      <td class="${classeSituacao}">${d.situacao}</td>
    `;
    corpoTabela.appendChild(linha);
  });
}

/* ---------------------------------------------------------
   INICIALIZAÇÃO
   Quando a página terminar de carregar, processa os dados
   e preenche os cards e a tabela.
   --------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  const dadosProcessados = processarDados();
  preencherCards(dadosProcessados);
  preencherTabela(dadosProcessados);
});
