/* TELA DE LOADING */
console.log("Loading iniciado");
    
const loadingScreen = document.getElementById("loading-screen");
const percentText = document.getElementById("loading-percent");
const progressBar = document.querySelector(".loading-progress");

console.log("loadingScreen:", loadingScreen); 
console.log("percentText:", percentText);
    
let progress = 0;

const interval = setInterval(() => {
    progress ++;

    console.log(progress);

    percentText.textContent = progress + "%";

    if(progressBar){
        progressBar.style.width = progress + "%";
    }
        
    if (progress >= 100) {
        clearInterval(interval);

        loadingScreen.style.opacity = "0";
    
        setTimeout(() => {
        loadingScreen.style.display = "none";

        document.body.classList.add("loaded");
          
        }, 600);

    }
}, 20);

/* MENU TOGGLE */
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
    menu.classList.toggle("ativo");
});

// SEMPRE QUE CLICAR EM ALGUMA SEÇÃO DO MENU ELE FECHA NA VERSÃO MOBILE
document.querySelectorAll(".navegacao-pagina a").forEach(link => {
    link.addEventListener("click", () => {
        menu.classList.remove("ativo");
    });
});


/* --- EFEITO DA SEÇÃO FORMAÇÃO--- */ 
function inicarEfeitoFormacao() {
    const elementos = document.querySelectorAll(".section-formacao div > *");
    let i = 0;

    function exibirEfeito(){  
        if(i < elementos.length) {
            if(elementos[i].tagName === "BR"){
                i++;
                exibirEfeito();
                return;
            }

            elementos[i].classList.add("mostrar");
            i++;
            setTimeout(exibirEfeito, 400);
        }
    }

    exibirEfeito();

}
       
window.addEventListener("load", inicarEfeitoFormacao); // sempre a pagina for carregada o efeito começa novamente

/* --- EFEITO DO PORTIFOLIO NA HORIZONTAL--- */
const galeria = document.querySelector(".galeria");
const carrossel = document.querySelector(".carrossel");

galeria.innerHTML += galeria.innerHTML; // duplicando a galeria para o loop infinito de imagens

let position = 0;
let speed = 1.2; //velocidade da transição dos desenhos
let isPaused = false;

function animate() {
    console.log(position, galeria.scrollWidth);
    if(!isPaused) {

        position -= speed;

        const limit = galeria.scrollWidth / 2;

        if(-position >= limit) {
            position = 0;
        }

        galeria.style.transform = `translateX(${position}px)`;
    }
    requestAnimationFrame(animate);
}

animate();

carrossel.addEventListener("mouseenter", () => {
    isPaused = true;
});

carrossel.addEventListener("mouseleave", () => {
    isPaused = false;
});

/* Validação para quando a Mensagem for Enviada */
const form = document.getElementById("formContato");
const feedback = document.getElementById("feedback");

const modal = document.getElementById("modal");
const fecharModal = document.getElementById("fecharModal");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email"). value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();
    
    if (nome ==="" || email === "" || mensagem ==="") {
        feedback.textContent = "Preencha todos os campos";
        feedback.style.color = "red";
        return;
    }

    const nomeValido = /^[A-Za-zÀ-ÿ\s]+$/;

    if (!nomeValido.test(nome)) {
        feedback.textContent = "Digite um nome valido.";
        feedback.style.color = "red";
        return;
    }

    // expressão regular do regex para verficiar se o e-mail possui o formato valido.
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValido.test(email)) {
        feedback.textContent = "Digite um e-mail valido.";
        feedback.style.color = "red";
        return
    }

    feedback.textContent = "Enviando mensagem...";
    feedback.style.color = "blue";

    setTimeout(() => {
        modal.classList.add("show");
        form.reset();
        feedback.textContent = "";
    }, 1500);

    });
    fecharModal.addEventListener("click", () => {
        modal.classList.remove("show");
});

/* ---MODAL PARA OS DESENHOS --- */
const imagens = document.querySelectorAll(".card img");
const imagemModal = document.getElementById("imagemModal");
const imagemExpandida = document.getElementById("imagemExpandida");
const fecharImagem = document.getElementById("fecharImagem");

imagens.forEach(imagem => {

    imagem.addEventListener("click", () => {    

        imagemExpandida.src = imagem.src;
        imagemModal.classList.add("show");
    });

});

// fechar pelo x
fecharImagem.addEventListener("click", () => { 
    
    imagemModal.classList.remove("show");
   
});

// fechar clicando fora da imagem
imagemModal.addEventListener("click", (evento) => {

    if(evento.target === imagemModal){
        imagemModal.classList.remove("show");
    }
});

// fechar pelo esc
document.addEventListener("keydown", (evento) => {
    if(evento.key === "Escape"){
        imagemModal.classList.remove("show");
        }
});

/* ---BOTÃO PARA SUBIR A PAGINA---- */
const btnTopo = document.getElementById("btnTopo");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        btnTopo.style.display = "flex";

    } else {
        btnTopo.style.display = "none";
    }

});

btnTopo.addEventListener("click", () => {
    window.scrollTo({
        top:0,
        behavior: "smooth"
    });

});
