function login() {
    const username = document.getElementById("username").value;

    if (username) {
        localStorage.setItem("username", username);
        window.location.href = "home.html";
    } else {
        alert("Por favor, insira seu nome de usuário.");
    }
    
}
function selecionarDisciplina(disciplina) {
    localStorage.setItem("disciplina", disciplina);
    window.location.href = "curso.html";
}
function carregarVideos() {
    const disciplina = localStorage.getItem("disciplina");
    document.getElementById("disciplina-titulo").textContent = disciplina;

    const videosContainer = document.getElementById("videos-container");
    let videos = [];

if (disciplina === "Matemática") {
    videos = [
        { titulo: "Aprendendo Frações", url: "https://www.youtube.com/embed/Ny_o77naGJ4" }
    ];
} else if (disciplina === "Ciências") {
    videos = [
        { titulo: "O Corpo Humano", url: "https://www.youtube.com/embed/Ny_o77naGJ4" }
    ];
}


    // Cria o HTML para exibir os vídeos
    videos.forEach(video => {
        const videoElement = document.createElement("div");
        videoElement.innerHTML = `
            <h3>${video.titulo}</h3>
            <iframe width="560" height="315" src="${video.url}" frameborder="0" allowfullscreen></iframe>
        `;
        videosContainer.appendChild(videoElement);
    });
}

// Chama a função para carregar os vídeos quando a página do curso for carregada
window.onload = carregarVideos;
