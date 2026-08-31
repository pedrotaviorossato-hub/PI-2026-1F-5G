/*/Header Escondido/*/
// Função responsável por esconder ou mostrar o cabeçalho
function toggleHeader(){
    const header = document.querySelector("header");
    header.classList.toggle("escondido");
}

/*/Quiz/*/
/* Armazena os áudios, respostas corretas e explicações de cada pergunta do quiz. */
const perguntas = [

    {
        audio: "audios/audio1.mpeg",
        resposta: "humano",
        explicacao: "Este áudio foi produzido por um artista humano. The Stable Song - Gregory Isakov."
    },

    {
        audio: "audios/audio2.mpeg",
        resposta: "ia",
        explicacao: "Este áudio foi gerado utilizando Inteligência Artificial. São Paulo - Tocanna."
    },

    {
        audio: "audios/audio3.mpeg",
        resposta: "humano",
        explicacao: "Este áudio foi criado por uma pessoa. Azul - éoDan."
    },

    {
        audio: "audios/audio4.mpeg",
        resposta: "ia",
        explicacao: "Este áudio foi produzido por uma ferramenta de IA. Heart on my Sleeve - voz de Drake e The Weekwend."
    },

    {
        audio: "audios/audio5.mpeg",
        resposta: "ia",
        explicacao: "Este é um exemplo de áudio gerado artificialmente. Sina de Ophelia - versão br de The fate of Ophelia."
    },

    {
        audio: "audios/audio6.mpeg",
        resposta: "humano",
        explicacao: "Este áudio foi produzido por um artista humano. Ladinho - Flerte Flamingo."
    }

];

/* Define as variáveis responsáveis por controlar a pergunta atual, a pontuação e se o usuário já respondeu. */
let perguntaAtual = 0;
let pontuacao = 0;
let respondeu = false;


/* Inicia ou reinicia o quiz, zerando a pontuação e carregando a primeira pergunta. */
function iniciarQuiz(){

    perguntaAtual = 0;
    pontuacao = 0;
    respondeu = false;

    document.getElementById("quiz-box")
        .classList.remove("escondido");

    document.getElementById("resultado-box")
        .classList.add("escondido");

    carregarPergunta();
}

/* Carrega na tela as informações, o áudio e os botões correspondentes à pergunta atual. */
function carregarPergunta(){

    const pergunta = perguntas[perguntaAtual];

    document.getElementById("pergunta-numero").textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

    document.getElementById("pontuacao").textContent =
        `Pontuação: ${pontuacao}`;

    const audio = document.getElementById("audio-elemento");

    audio.src = pergunta.audio;

    audio.load();

    document.getElementById("feedback").textContent = "";

    document.getElementById("feedback").className = "feedback";

    document.getElementById("btn-proximo").disabled = true;

    respondeu = false;

    const botoes = document.querySelectorAll(".opcao");

    botoes.forEach(botao => {

        botao.disabled = false;

        botao.classList.remove("correta");
        botao.classList.remove("errada");

    });
}

/* Verifica a resposta escolhida, atualiza a pontuação e mostra se o usuário acertou ou errou. */
function responder(resposta){

    if(respondeu){
        return;
    }

    respondeu = true;

    const pergunta = perguntas[perguntaAtual];

    const botoes = document.querySelectorAll(".opcao");

    botoes.forEach(botao => {
        botao.disabled = true;
    });


    const botaoEscolhido =
        resposta === "humano"
        ? document.getElementById("btn-humano")
        : document.getElementById("btn-ia");


    const botaoCorreto =
        pergunta.resposta === "humano"
        ? document.getElementById("btn-humano")
        : document.getElementById("btn-ia");


    if(resposta === pergunta.resposta){

        pontuacao++;

        botaoEscolhido.classList.add("correta");

        mostrarFeedback(
            "✓ Você acertou!",
            "certo"
        );

    }else{

        botaoEscolhido.classList.add("errada");

        botaoCorreto.classList.add("correta");

        mostrarFeedback(
            "✗ Você errou!",
            "errado"
        );
    }


    const feedback = document.getElementById("feedback");

    feedback.innerHTML +=
        `<br><small>${pergunta.explicacao}</small>`;


    document.getElementById("pontuacao").textContent =
        `Pontuação: ${pontuacao}`;

    document.getElementById("btn-proximo").disabled = false;
}

/* Exibe a mensagem de acerto ou erro utilizando a classe correspondente do CSS. */
function mostrarFeedback(texto, classe){

    const feedback = document.getElementById("feedback");

    feedback.textContent = texto;

    feedback.className =
        `feedback ${classe}`;
}

/* Avança para a próxima pergunta ou encerra o quiz quando todas forem respondidas. */
function proximaPergunta(){

    perguntaAtual++;

    if(perguntaAtual >= perguntas.length){

        finalizarQuiz();

    }else{

        carregarPergunta();

    }
}

/* Calcula a porcentagem de acertos, atualiza a barra de progresso e apresenta o resultado final. */
function finalizarQuiz(){

    document.getElementById("quiz-box")
        .classList.add("escondido");

    document.getElementById("resultado-box")
        .classList.remove("escondido");


    const total = perguntas.length;

    const porcentagem =
        Math.round((pontuacao / total) * 100);


    document.getElementById("texto-pontuacao").textContent =
        `Você acertou ${pontuacao} de ${total} perguntas (${porcentagem}%).`;


    document.getElementById("barra-progresso").style.width =
        `${porcentagem}%`;


    let mensagem;


    if(porcentagem === 100){

        mensagem =
            "Impressionante! Você conseguiu identificar todos os áudios, mas por quanto tempo?";

    }else if(porcentagem >= 70){

        mensagem =
            "Muito bom! Você tem um ótimo ouvido para perceber diferenças entre produções humanas e artificiais.";

    }else if(porcentagem >= 50){

        mensagem =
            "Quase lá! Alguns áudios produzidos por IA podem ser bastante difíceis de distinguir.";

    }else{

        mensagem =
            "Foi difícil, não é? Esse é justamente um dos problemas discutidos neste projeto.";

    }


    document.getElementById("mensagem-resultado").textContent =
        mensagem;
}


/* Reinicia o quiz chamando novamente a função responsável por iniciar o jogo. */
function reiniciarQuiz(){

    iniciarQuiz();

}

/* Inicia automaticamente o quiz assim que toda a página HTML terminar de carregar. */
document.addEventListener("DOMContentLoaded", function(){

    iniciarQuiz();

});