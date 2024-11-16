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
        localStorage.setItem("usuario", email);  // Armazena o e-mail do usuário
        window.location.href = "home.html";
    } else {
        // Exibe mensagem de erro
        errorMessage.textContent = "E-mail ou senha inválidos!";
    }
}

// Redireciona para a página do curso e armazena a disciplina
function irParaCurso(disciplina) {
    if (!disciplina) {
        alert("Por favor, selecione uma disciplina.");
        return;
    }
    localStorage.setItem("disciplina", disciplina);
    window.location.href = "curso.html";
}

// Lista de vídeos por disciplina
const cursos = {
    "Língua Portuguesa": [
        { titulo: "Playlist de Língua Portuguesa - 6º ano do Ensino Fundamental", url: "https://www.youtube.com/embed/gdrzFc9rTlY" },
        { titulo: "Substantivo – Língua Portuguesa – 6º ano", url: "https://www.youtube.com/embed/cxqPHPPq1Jc" },
        { titulo: "As Narrativas Ficcionais - Parte 1", url: "https://www.youtube.com/embed/fX1p7FJB5m4" },
        { titulo: "Figuras de Linguagem – Aula 12", url: "https://www.youtube.com/embed/gdrzFc9rTlY" }
    ],
    "História": [
        { titulo: "História do Brasil - A Colonização", url: "https://www.youtube.com/embed/Uq7opea_7J0" },
        { titulo: "A Independência do Brasil", url: "https://www.youtube.com/embed/IIReUDezw-E" },
        { titulo: "Primeira Guerra Mundial", url: "https://www.youtube.com/embed/5MMJ7qCP55Q" },
        { titulo: "Revolução Francesa", url: "https://www.youtube.com/embed/4CthQxp3h4c" }
    ],
    "Matemática": [
        { titulo: "Aula 1 de Matemática", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { titulo: "Aula 2 de Matemática", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
    ],
    "Ciências": [
        { titulo: "Aula 1 de Ciências", url: "https://www.youtube.com/embed/8ZkckshkV44" },
        { titulo: "Aula 2 de Ciências", url: "https://www.youtube.com/embed/8ZkckshkV44" },
        { titulo: "O Sistema Solar", url: "https://www.youtube.com/embed/U9eEYwSg6hA" }, 
        { titulo: "O Corpo Humano - Sistema Digestivo", url: "https://www.youtube.com/embed/N-dpHrxMbG4" }
    ],
    "Inglês": [
        { titulo: "Saudações em Inglês | Cumprimentos em Inglês", url: "https://www.youtube.com/embed/DGvhHCn72E0" },
        { titulo: "Sentimentos e Emoções em Inglês", url: "https://www.youtube.com/embed/16MBSgzlmBE" },
        { titulo: "As Cores em Inglês", url: "https://www.youtube.com/embed/f-AuQ_Afg8w" },
        { titulo: "O Verbo TO BE", url: "https://www.youtube.com/embed/yFe0DQ-DXPo" }
    ]
};

// Função para carregar os vídeos
function carregarVideos(disciplina) {
    const videosContainer = document.querySelector(".videos");
    const videos = cursos[disciplina] || [];

    // Variáveis para controlar o índice do vídeo atual
    let indiceAtual = 0;

    // Exibe o vídeo atual
    function exibirVideo(indice) {
        const video = videos[indice];
        videosContainer.innerHTML = `
            <h3>${video.titulo}</h3>
            <iframe width="100%" height="500" src="${video.url}?enablejsapi=1" frameborder="0" allowfullscreen></iframe>
        `;

        // Atualiza os botões após exibir o vídeo
        const botoesContainer = document.createElement("div");
        botoesContainer.innerHTML = `
            <button id="btnAnterior">Anterior</button>
            <button id="btnProximo">Próximo</button>
        `;
        videosContainer.appendChild(botoesContainer);

        // Adiciona eventos de navegação
        document.getElementById("btnProximo").addEventListener("click", proximoVideo);
        document.getElementById("btnAnterior").addEventListener("click", videoAnterior);
    }

    // Função para navegar para o próximo vídeo
    function proximoVideo() {
        indiceAtual++;
        if (indiceAtual >= videos.length) {
            indiceAtual = 0; // Volta para o primeiro vídeo
        }
        exibirVideo(indiceAtual);
    }

    // Função para navegar para o vídeo anterior
    function videoAnterior() {
        indiceAtual--;
        if (indiceAtual < 0) {
            indiceAtual = videos.length - 1; // Vai para o último vídeo
        }
        exibirVideo(indiceAtual);
    }

    // Exibe o primeiro vídeo da lista
    exibirVideo(indiceAtual);
}

// Função para redirecionar para a página de jogos didáticos
function acessarJogos() {
    window.location.href = "jogosdidaticos.html";  // Corrigido para o nome correto do arquivo
}

// Função de logout
function logout() {
    localStorage.removeItem("disciplina");
    localStorage.removeItem("usuario");  // Remove o usuário
    window.location.href = "index.html";  // Redireciona para a página inicial de login
}

// Função para ganhar pontos ao finalizar vídeo
function ganharPontos() {
    // A pontuação será aumentada com base no tempo de vídeo assistido
    let totalPontos = 0;  // Variável para armazenar os pontos
    totalPontos += 10;  // Pontos por assistir o vídeo até o final
    alert("Você ganhou 10 pontos por assistir ao vídeo!");
}

// Configuração ao carregar a página
window.onload = function () {
    const disciplina = localStorage.getItem("disciplina");
    if (disciplina) {
        document.getElementById("disciplina").textContent = disciplina;
        carregarVideos(disciplina);
    } else {
        alert("Selecione uma disciplina primeiro.");
        window.location.href = "index.html";  // Redireciona caso a disciplina não esteja definida
    }
};
