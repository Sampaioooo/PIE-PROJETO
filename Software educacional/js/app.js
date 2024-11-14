// Lista de usuários
const usuarios = [
    { email: 'responsavel@example.com', senha: '1234' }
];

// Função de login
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    // Simula o login verificando e-mail e senha
    const usuario = usuarios.find(user => user.email === email && user.senha === password);

    if (usuario) {
        // Login bem-sucedido, redireciona para a tela principal
        window.location.href = "home.html";
    } else {
        // Exibe mensagem de erro
        errorMessage.textContent = "E-mail ou senha inválidos!";
    }
}

// Redireciona para a página do curso e armazena a disciplina
function irParaCurso(disciplina) {
    localStorage.setItem("disciplina", disciplina);
    window.location.href = "curso.html";
}

// Carrega vídeos com base na disciplina
function carregarVideos(disciplina) {
    const videosContainer = document.querySelector(".videos");
    videosContainer.innerHTML = '';

    // Lista de vídeos por disciplina
    const cursos = {
        "Matemática": [
            { titulo: "Aula de Matemática", url: "https://www.youtube.com/embed/mk28c-PRBi4" }
        ],
        "Ciências": [
            { titulo: "Aula de Ciências", url: "https://www.youtube.com/embed/mk28c-PRBi4" }
        ],
        "Língua Portuguesa": [
            { titulo: "Aula de Língua Portuguesa", url: "https://www.youtube.com/embed/mk28c-PRBi4" }
        ]
    };

    const videos = cursos[disciplina] || [];

    videos.forEach(video => {
        const videoElement = document.createElement("div");
        videoElement.innerHTML = `<h3>${video.titulo}</h3><iframe width="560" height="315" src="${video.url}?enablejsapi=1" frameborder="0" allowfullscreen></iframe>`;
        videosContainer.appendChild(videoElement);
    });

    document.getElementById("startQuizButton").style.display = "block";
}

// Configura eventos para vídeos
function configurarVideoEventos() {
    const iframes = document.querySelectorAll("iframe");
    if (iframes.length > 0) {
        const ultimoIframe = iframes[iframes.length - 1];
        ultimoIframe.onload = function () {
            const player = new YT.Player(ultimoIframe, {
                events: {
                    'onStateChange': function (event) {
                        if (event.data === YT.PlayerState.ENDED) {
                            // Ao terminar o vídeo, ganha pontos
                            ganharPontos();
                            // Oferece a opção de responder ao quiz
                            document.getElementById("startQuizButton").style.display = "block";
                        }
                    }
                }
            });
        };
    }
}

// Função para ganhar pontos ao finalizar vídeo
function ganharPontos() {
    // A pontuação será aumentada com base no tempo de vídeo assistido
    app.Totalpontos += 10; // Pontos por assistir o vídeo até o final
    app.atualizaPontos();
    alert("Você ganhou 10 pontos por assistir ao vídeo!");
}

// Inicia o quiz
function iniciarQuiz() {
    document.querySelector(".videos").style.display = "none";
    document.getElementById("startQuizButton").style.display = "none";
    document.getElementById("quizContainer").style.display = "block";
    app.start();
}

// Objeto para gerenciar o quiz
let app = {
    start: function() {
        this.Atualpos = 0;
        this.Totalpontos = 0;
        this.atualizaPontos();
        this.mostraquestao(perguntas[this.Atualpos]);

        const alts = document.querySelectorAll('.alternativa');
        alts.forEach((element, index) => {
            element.addEventListener('click', () => {
                this.checaResposta(index);
            });
        });
    },

    mostraquestao: function(q) {
        this.qatual = q;
        document.getElementById('titulo').textContent = q.titulo;
        const alts = document.querySelectorAll('.alternativa');
        alts.forEach((element, index) => {
            element.textContent = q.alternativas[index];
        });
    },

    Proximaperg: function() {
        this.Atualpos++;
        if (this.Atualpos === perguntas.length) {
            this.Atualpos = 0;
        }
    },

    checaResposta: function(user) {
        if (this.qatual.correta === user) {
            this.Totalpontos += 5; // Pontos reduzidos para cada resposta correta no quiz
            this.mostraresposta(true);
        } else {
            this.mostraresposta(false);
        }
        this.atualizaPontos();
        this.Proximaperg();
        this.mostraquestao(perguntas[this.Atualpos]);
    },

    atualizaPontos: function() {
        document.getElementById('pontos').textContent = `Sua pontuação: ${this.Totalpontos}`;
    },

    mostraresposta: function(correto) {
        const resultDiv = document.getElementById('result');
        resultDiv.textContent = correto ? 'Resposta Correta!' : `Incorreto! Resposta Correta: ${this.qatual.alternativas[this.qatual.correta]}`;
    }
};

// Perguntas do quiz
let perguntas = [
    {
        titulo: 'Gato',
        alternativas: ['Gat', 'Cat', 'Gate', 'Dog'],
        correta: 1
    },
    {
        titulo: 'Fire',
        alternativas: ['Fogo', 'Agua', 'Terra', 'Ar'],
        correta: 0
    },
    {
        titulo: 'Bird',
        alternativas: ['Gato', 'Urubu', 'Pombo', 'Passaro'],
        correta: 3
    }
];

// Configuração ao carregar a página
window.onload = function () {
    const disciplina = localStorage.getItem("disciplina");
    if (disciplina) {
        document.getElementById("disciplina").textContent = disciplina;
        carregarVideos(disciplina);
        configurarVideoEventos();
    }
};

// Função para redirecionar para a página de jogos didáticos
function acessarJogos() {
    window.location.href = "jogosDidaticos.html";  // Substitua "jogosDidaticos.html" pelo URL da sua página de jogos
}
