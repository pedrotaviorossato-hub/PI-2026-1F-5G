function toggleHeader(){
    const header = document.querySelector("header");
    header.classList.toggle("escondido");
}
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


let perguntaAtual = 0;
let pontuacao = 0;
let respondeu = false;



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


function mostrarFeedback(texto, classe){

    const feedback = document.getElementById("feedback");

    feedback.textContent = texto;

    feedback.className =
        `feedback ${classe}`;
}


function proximaPergunta(){

    perguntaAtual++;

    if(perguntaAtual >= perguntas.length){

        finalizarQuiz();

    }else{

        carregarPergunta();

    }
}


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



function reiniciarQuiz(){

    iniciarQuiz();

}

document.addEventListener("DOMContentLoaded", function(){

    iniciarQuiz();

});