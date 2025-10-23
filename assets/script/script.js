function criarConfete() {
  const confete = document.createElement('div');
  confete.classList.add('confete');
  const cores = ['#f39c12', '#e74c3c', '#9b59b6', '#2ecc71', '#3498db'];
  confete.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
  confete.style.left = Math.random() * window.innerWidth + 'px';
  const tamanho = Math.random() * 8 + 5;
  confete.style.width = tamanho + 'px';
  confete.style.height = tamanho + 'px';
  confete.style.animationDuration = (Math.random() * 3 + 2) + 's';
  document.getElementById('confetes-container').appendChild(confete);
  setTimeout(() => { confete.remove(); }, 5000);
}
setInterval(criarConfete, 200);

// --- Carrossel 1 (Instagram) ---
let slideIndex = 0;
let slides = document.getElementsByClassName("slides");
let dots = document.getElementsByClassName("dot");
function showSlide(index) {
  for (let i = 0; i < slides.length; i++) { slides[i].style.display = "none"; }
  for (let i = 0; i < dots.length; i++) { dots[i].classList.remove("active"); }
  slides[index].style.display = "block";
  dots[index].classList.add("active");
}
function carrossel() {
  slideIndex++;
  if (slideIndex >= slides.length) { slideIndex = 0; }
  showSlide(slideIndex);
  setTimeout(carrossel, 3000);
}
function moveToSlide(index) {
  slideIndex = index;
  showSlide(slideIndex);
}
showSlide(slideIndex);
setTimeout(carrossel, 3000);

let startX = 0;
let endX = 0;
const carrosselEl = document.querySelector(".carrossel");
carrosselEl.addEventListener("touchstart", function(e) { startX = e.touches[0].clientX; }, false);
carrosselEl.addEventListener("touchend", function(e) {
  endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) {
    slideIndex++;
    if (slideIndex >= slides.length) { slideIndex = 0; }
    showSlide(slideIndex);
  } else if (endX - startX > 50) {
    slideIndex--;
    if (slideIndex < 0) { slideIndex = slides.length - 1; }
    showSlide(slideIndex);
  }
}, false);

// --- Lógica de Curtidas ---
let likeIcon = document.getElementById("likeIcon");
let quantLike = document.getElementById("quant_like");
let curtidasAtuais = parseInt(quantLike.innerText.replace('.', ''));
function aumentarCurtidas() {
  curtidasAtuais++;
  quantLike.innerText = curtidasAtuais.toLocaleString('pt-BR');
}
setInterval(aumentarCurtidas, 50);
likeIcon.addEventListener("click", function() {
  likeIcon.style.animation = "pulse 0.3s";
  setTimeout(() => { likeIcon.style.animation = ""; }, 300);
});
const botoesCurtir = document.querySelectorAll('.curtir-btn');
botoesCurtir.forEach(botao => {
  botao.addEventListener('click', () => {
    const contador = botao.querySelector('.contador');
    contador.textContent = parseInt(contador.textContent) + 1;
  });
});

// --- LÓGICA DO CARROSSEL LUIZA (SCROLL INFINITO E LINEAR) ---
document.addEventListener('DOMContentLoaded', () => {
    const carrossel = document.getElementById('carrosselLuiza');
    if (!carrossel) return;

    // Pega todos os itens originais (as 17 fotos)
    const originais = Array.from(carrossel.children);
    
    // Clona todos os itens e adiciona ao final
    originais.forEach(item => {
        carrossel.appendChild(item.cloneNode(true));
    });
});


// --- Outras Funções ---
const audios = document.querySelectorAll('.audio');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('show'); }
  });
}, { threshold: 0.1 });
audios.forEach(audio => { observer.observe(audio); });

function atualizarContagem() {
  const agora = new Date();
  const dataAlvo = new Date(2025, 9, 27, 0, 0, 0); // Outubro é mês 9
  const tempoRestante = dataAlvo - agora;
  const dias = Math.floor(tempoRestante / (1000 * 60 * 60 * 24));
  const horas = Math.floor((tempoRestante / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((tempoRestante / 1000 / 60) % 60);
  const segundos = Math.floor((tempoRestante / 1000) % 60);
  document.getElementById('dias').innerHTML = dias + "<span>Dias</span>";
  document.getElementById('horas').innerHTML = horas + "<span>Horas</span>";
  document.getElementById('minutos').innerHTML = minutos + "<span>Minutos</span>";
  document.getElementById('segundos').innerHTML = segundos + "<span>Segundos</span>";
}
setInterval(atualizarContagem, 1000);
atualizarContagem();