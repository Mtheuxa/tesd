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

// --- LÓGICA FINAL E CORRIGIDA DO CARROSSEL LUIZA (SLIDE INFINITO) ---
document.addEventListener('DOMContentLoaded', () => {
    const carrosselContainer = document.querySelector('.carrosselLuiza-container');
    const carrossel = document.getElementById('carrosselLuiza');
    const voltarBtn = document.getElementById('voltarBtnLuiza');
    const avancarBtn = document.getElementById('avancarBtnLuiza');

    if (!carrossel) return;

    let originais = Array.from(carrossel.children);
    let slideAtual = 1;
    let emTransicao = false;
    let autoplayIntervalo;

    function setupCarousel() {
        const itensPorSlide = getItensPorSlide();
        const clonesFinais = originais.slice(0, itensPorSlide).map(item => item.cloneNode(true));
        const clonesIniciais = originais.slice(-itensPorSlide).map(item => item.cloneNode(true));

        carrossel.innerHTML = "";
        clonesIniciais.forEach(clone => carrossel.appendChild(clone));
        originais.forEach(item => carrossel.appendChild(item.cloneNode(true)));
        clonesFinais.forEach(clone => carrossel.appendChild(clone));

        updateCarouselPosition(true);
    }

    function getItensPorSlide() {
        if (window.innerWidth >= 900) return 4;
        if (window.innerWidth >= 600) return 2;
        return 1;
    }

    function updateCarouselPosition(instant = false) {
        const itensPorSlide = getItensPorSlide();
        const larguraItem = carrosselContainer.offsetWidth / itensPorSlide;
        const totalItems = carrossel.children.length;

        for(let i = 0; i < totalItems; i++){
            carrossel.children[i].style.width = `${larguraItem}px`;
            carrossel.children[i].style.flexShrink = '0';
        }

        const deslocamento = - (slideAtual * itensPorSlide * larguraItem);
        carrossel.style.transition = instant ? 'none' : 'transform 0.5s ease-in-out';
        carrossel.style.transform = `translateX(${deslocamento}px)`;
    }

    function moveSlide(direction) {
        if (emTransicao) return;
        emTransicao = true;
        slideAtual += direction;
        updateCarouselPosition();
    }

    carrossel.addEventListener('transitionend', () => {
        const itensPorSlide = getItensPorSlide();
        const totalSlidesReais = Math.ceil(originais.length / itensPorSlide);
        
        // Se foi para o clone do fim, salta para o primeiro slide real
        if (slideAtual > totalSlidesReais) {
            slideAtual = 1;
            updateCarouselPosition(true);
        }
        
        // Se foi para o clone do início, salta para o último slide real
        if (slideAtual < 1) {
            slideAtual = totalSlidesReais;
            updateCarouselPosition(true);
        }
        
        emTransicao = false;
    });

    avancarBtn.addEventListener('click', () => moveSlide(1));
    voltarBtn.addEventListener('click', () => moveSlide(-1));

    function startAutoplay() {
        stopAutoplay();
        autoplayIntervalo = setInterval(() => moveSlide(1), 4000);
    }

    function stopAutoplay() {
        clearInterval(autoplayIntervalo);
    }

    carrosselContainer.addEventListener('mouseenter', stopAutoplay);
    carrosselContainer.addEventListener('mouseleave', startAutoplay);

    window.addEventListener('resize', () => {
        setupCarousel();
    });

    // Iniciar tudo
    setupCarousel();
    startAutoplay();
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