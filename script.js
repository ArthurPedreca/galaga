class Inimigo {
  constructor() {
    this.width = 0;
    this.height = 0;
    this.inimigo = this.createElement();
    this.mover();
  }

  createElement() {
    let element = document.createElement('canvas')
    element.style.background = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
    element.style.borderRadius = '50%';
    element.style.position = 'absolute'
    element.classList.add("inimigo");

    document.body.appendChild(element);

    this.width = random(30, 100);
    this.height = this.width;
    element.style.width = this.width + 'px';
    element.style.height = this.height + 'px';
    element.style.left = random(0, window.innerWidth - (this.width + 150)) + 'px';

    element.style.top = this.width * -1 + 'px';

    return element;
  }

  mover() {
    this.inimigo.style.top = parseInt(this.inimigo.offsetTop) + 3 + 'px';
    let top = this.inimigo.offsetTop;
    if (parseInt(top) >= borderlimits().y) {
      this.inimigo.remove();
      alert("VOCÊ É RUIM!")
      recarregarAPagina();
    }
    requestAnimationFrame(this.mover.bind(this));
  }

  detector(projetil) {
    let posicaoInimigo = this.inimigo.getBoundingClientRect();
    let posicaoTiro = projetil.getBoundingClientRect();

    if (
      posicaoTiro.left + posicaoTiro.width >= posicaoInimigo.left &&
      posicaoTiro.left <= posicaoInimigo.left + posicaoInimigo.width &&
      posicaoTiro.top + posicaoTiro.height >= posicaoInimigo.top &&
      posicaoTiro.top <= posicaoInimigo.top + posicaoInimigo.height
    ) {
      projetil.remove();
      this.inimigo.remove();
    }
  }
}
class Atirador {
  constructor() {
    this.atirador = this.criarAtirador();
    this.velocidadeX = 0;
    this.teclasPressionadas = {};
    this.atualizarVelocidade();
    this.atualizarPosicao();
  }

  criarAtirador() {
    let player = document.createElement("img");
    player.src = "../atirador.png";
    player.classList.add("atirador");

    player.style.left = innerWidth / 2
    document.body.appendChild(player);
    return player;
  }

  atualizarVelocidade() {
    window.addEventListener("keydown", (event) => {
      this.teclasPressionadas[event.key] = true;
      if (event.key === "w") {
        this.atirar();
      }
    });

    window.addEventListener("keyup", (event) => {
      this.teclasPressionadas[event.key] = false;
    });
  }

  atualizarPosicao() {
    requestAnimationFrame(() => {
      let left = parseInt(this.atirador.style.left) || 0;
      if (this.teclasPressionadas["d"]) {
        left += 7;
      }
      if (this.teclasPressionadas["a"]) {
        left -= 7;
      }
      left = Math.max(-10, Math.min(left, window.innerWidth - 90));
      this.atirador.style.left = left + "px";
      this.atualizarPosicao();
    });
  }

  atirar() {
    let projetil = this.criarProjetil();
    this.moverProjetil(projetil);
  }

  criarProjetil() {
    let projetil = document.createElement("img");
    projetil.src = "../projetil.png";
    projetil.classList.add("projetil");

    const atiradorPosicao = this.atirador.getBoundingClientRect();
    projetil.style.left = atiradorPosicao.left + 40 + "px";
    projetil.style.top = atiradorPosicao.top + 10 + "px";

    document.body.appendChild(projetil);
    return projetil;
  }

  moverProjetil(projetil) {
    let top = parseInt(projetil.style.top) || 0;
    top -= 20;

    if (top <= -30) {
      projetil.remove();
    } else {
      projetil.style.top = top + "px";

      const inimigos = document.getElementsByClassName("inimigo");
      for (let i = 0; i < inimigos.length; i++) {
        const inimigo = inimigos[i];
        const inimigoObj = inimigoInstances.find((obj) => obj.inimigo === inimigo);
        inimigoObj.detector(projetil);
      }

      requestAnimationFrame(() => this.moverProjetil(projetil));
    }
  }


}


//programa principal


function obterPosicao(objeto) {
  let rect = objeto.getBoundingClientRect();
  const posicao = {
    left: rect.left,
    top: rect.top
  };
  return posicao;
}


function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function borderlimits() {
  let limit = {
    x: innerWidth,
    y: innerHeight
  }
  return limit
}

function recarregarAPagina(){
  window.location.reload();
} 

const inimigoInstances = [];

setInterval(() => {
  const inimigo = new Inimigo();
  inimigoInstances.push(inimigo);
}, 1000);



window.addEventListener("DOMContentLoaded", () => {
  const atirador = new Atirador();
  const atiradorPosicao = atirador.atirador.getBoundingClientRect();
  const telaMeio = innerWidth / 2;

  atirador.atirador.style.left = telaMeio - atiradorPosicao.width / 2 + "px";
});