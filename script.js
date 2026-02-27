// Mostrar a página principal
function mostrarSite() {
  document.getElementById("inicio").classList.add("hidden");
  document.getElementById("principal").classList.remove("hidden");
  localStorage.setItem("abriu", "sim");
  
  iniciarSlide();
  iniciarContador();
  iniciarVideos(); // Lembra de adicionar essa chamada para os vídeos!

  // Tocar música
  const musica = document.getElementById("musica");
  musica.currentTime = 0;
  musica.play();
}


// Voltar para a tela inicial
function voltarInicio() {
  document.getElementById("inicio").classList.remove("hidden");
  document.getElementById("principal").classList.add("hidden");
  localStorage.removeItem("abriu");

  // Parar música
  const musica = document.getElementById("musica");
  musica.pause();
  musica.currentTime = 0;
}

// Slideshow
let slides = [];
let index = 0;
let slideInterval;

function iniciarSlide() {
  slides = document.querySelectorAll(".slide");
  slides.forEach((s) => s.classList.remove("active"));
  index = 0;
  slides[index].classList.add("active");

  if (slideInterval) clearInterval(slideInterval);

  slideInterval = setInterval(() => {
    mudarSlide(1);
  }, 4000);
}

function mudarSlide(n) {
  // 1. Pausa o vídeo se o slide atual for um vídeo antes de trocar
  if (slides[index].tagName === "VIDEO") {
    slides[index].pause();
  }

  slides[index].classList.remove("active");
  index += n;

  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;

  const novoSlide = slides[index];
  novoSlide.classList.add("active");

  // 2. Se o novo slide for um vídeo, dá play
  if (novoSlide.tagName === "VIDEO") {
    novoSlide.play();
  }

  // Reseta o timer do slideshow automático
  if (slideInterval) clearInterval(slideInterval);
  slideInterval = setInterval(() => {
    mudarSlide(1);
  }, 5000); // 5 segundos é um tempo bom para ler/ver
}

// Contador
let contadorInterval;
function iniciarContador() {
  const inicio1 = new Date("2025-08-10T00:00:00");

  if (contadorInterval) clearInterval(contadorInterval);

  contadorInterval = setInterval(() => {
    const agora = new Date();

    // Função interna para reaproveitar a lógica de cálculo
    const calcularTempo = (dataReferencia) => {
      let anos = agora.getFullYear() - dataReferencia.getFullYear();
      let meses = agora.getMonth() - dataReferencia.getMonth();
      let dias = agora.getDate() - dataReferencia.getDate();
      let horas = agora.getHours() - dataReferencia.getHours();
      let minutos = agora.getMinutes() - dataReferencia.getMinutes();
      let segundos = agora.getSeconds() - dataReferencia.getSeconds();

      if (segundos < 0) { segundos += 60; minutos--; }
      if (minutos < 0) { minutos += 60; horas--; }
      if (horas < 0) { horas += 24; dias--; }
      if (dias < 0) {
        const ultimoDiaMesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
        dias += ultimoDiaMesAnterior;
        meses--;
      }
      if (meses < 0) { meses += 12; anos--; }

      let texto = "";
      if (anos > 0) texto += `${anos} anos, `;
      texto += `${meses} meses, ${dias} dias, ${horas}h ${minutos}m ${segundos}s 💕`;
      return texto;
    };

    // Atualiza o primeiro contador (Original)
    document.getElementById("contador").textContent = 
      "Sabe quando a gente tem certeza de que algo mudou? Aquele beijo me fez ter a certeza de que quero você por perto faz " + calcularTempo(inicio1); 
  }, 1000);
}


// Mini Player Spotify Style
const musica = document.getElementById("musica");
const playPauseBtn = document.getElementById("playPauseBtn");
const progress = document.getElementById("progress");

playPauseBtn.addEventListener("click", () => {
  if (musica.paused) {
    musica.play();
    playPauseBtn.textContent = "⏸"; // pause preto
  } else {
    musica.pause();
    playPauseBtn.textContent = "▶"; // play preto
  }
});

musica.addEventListener("timeupdate", () => {
  progress.value = (musica.currentTime / musica.duration) * 100 || 0;
});

progress.addEventListener("input", () => {
  musica.currentTime = (progress.value / 100) * musica.duration;
});

musica.addEventListener("play", () => playPauseBtn.textContent = "⏸");
musica.addEventListener("pause", () => playPauseBtn.textContent = "▶");

// Verifica se já foi aberto antes
window.onload = () => {
  if (localStorage.getItem("abriu") === "sim") {
    mostrarSite();
  }
};

// Efeito de aparecer ao rolar
const frases = document.querySelectorAll('.frase');

function revelarFrases() {
  frases.forEach(frase => {
    const rect = frase.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      frase.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revelarFrases);
window.addEventListener('load', revelarFrases);

let vIndex = 0;
let vSlides = [];

function mudarVideo(n) {
  vSlides = document.querySelectorAll(".v-slide");
  
  // Esconde o vídeo atual e pausa
  vSlides[vIndex].classList.remove("active");
  vSlides[vIndex].pause();

  vIndex += n;

  if (vIndex >= vSlides.length) vIndex = 0;
  if (vIndex < 0) vIndex = vSlides.length - 1;

  // Mostra o novo vídeo e dá play
  vSlides[vIndex].classList.add("active");
  vSlides[vIndex].play();
}

// Inicializar os vídeos quando o site abrir
// Adicione a chamada abaixo dentro da sua função mostrarSite() que já existe
// function mostrarSite() {
//    ...
//    iniciarVideos(); 
// }

function iniciarVideos() {
  vSlides = document.querySelectorAll(".v-slide");
  if(vSlides.length > 0) {
      vSlides[0].play();
  }
}