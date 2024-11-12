// Dados de login simulados
const usuarios = [
    { email: 'responsavel@example.com', senha: '1234' }
];

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

function irParaCurso(disciplina) {
    localStorage.setItem("disciplina", disciplina);  // Armazena a disciplina escolhida
    window.location.href = "curso.html";
}

window.onload = function () {
    const disciplina = localStorage.getItem("disciplina");
    if (disciplina) {
        document.getElementById("disciplina").textContent = disciplina;
        carregarVideos(disciplina);
    }
};

function carregarVideos(disciplina) {
    const videosContainer = document.querySelector(".videos");
    let videos = [];

    if (disciplina === "Matemática") {
        videos = [
            { titulo: "Aprendendo Frações", url: "https://www.youtube.com/embed/link_do_video1" },
            { titulo: "Multiplicação Básica", url: "https://www.youtube.com/embed/link_do_video2" }
        ];
    } else if (disciplina === "Ciências") {
        videos = [
            { titulo: "Ciclo da Água", url: "https://www.youtube.com/embed/link_do_video3" },
            { titulo: "O Corpo Humano", url: "https://www.youtube.com/embed/link_do_video4" }
        ];
    } else if (disciplina === "Língua Portuguesa") {
        videos = [
            { titulo: "Alfabeto", url: "https://www.youtube.com/embed/link_do_video5" },
            { titulo: "Frases e Sentenças", url: "https://www.youtube.com/embed/link_do_video6" }
        ];
    }

    videos.forEach(video => {
        const videoElement = document.createElement("div");
        videoElement.innerHTML = `<h3>${video.titulo}</h3><iframe width="560" height="315" src="${video.url}" frameborder="0" allowfullscreen></iframe>`;
        videosContainer.appendChild(videoElement);
    });
}
