class Atirador {
    constructor() {
      this.atirador = this.criarAtirador();
      this.velocidadeX = 0;
      this.teclasPressionadas = {};
      this.atualizarVelocidade();
      this.mover();
      this.atirar();
    }
  
    criarAtirador() {
      let player = document.createElement("img");
      player.src = "/atirador.png";
      player.classList.add("atirador");
  
      player.style.left = document.body.offsetWidth / 2 - 50 + "px";
      document.body.appendChild(player);
      return player;
    }
  
    atualizarVelocidade() {
      window.addEventListener("keydown", (event) => {
        this.teclasPressionadas[event.key] = true;
      });
  
      window.addEventListener("keyup", (event) => {
        this.teclasPressionadas[event.key] = false;
      });
    }
  
    mover() {
        this.velocidadeX = 0;
        
      if (this.teclasPressionadas["d"]) {
        this.velocidadeX = 5;
      }
      if (this.teclasPressionadas["a"]) {
        this.velocidadeX = -5;
      }
  
      let left = parseInt(this.atirador.style.left) || 0;
      left += this.velocidadeX;
  
      if (left >= borderlimits().x - 90) {
        this.velocidadeX = 0;
        left = borderlimits().x - 90;
      } 
      
      else if (left <= -10) {
        this.velocidadeX = 0;
        left = -10;
      }
      
      this.atirador.style.left = left + "px";
      requestAnimationFrame(this.mover.bind(this))
    }
  
    atirar() {
      
    }
  }
  
  function borderlimits() {
    let limit = {
      x: innerWidth,
      y: innerHeight
    };
    return limit;
  }
  
  new Atirador();  