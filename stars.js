
const canvas = document.getElementById("starCanvas");
      const ctx = canvas.getContext("2d");
    
      // Definir tamanho do canvas para ocupar a tela inteira
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    
      // Criar array de estrelas
      let stars = [];
      const numStars = 500;
    
      class Star {
        constructor() {
          this.reset();
        }
    
        reset() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.z = Math.random() * canvas.width; // Profundidade
          this.size = Math.random() * 0.3;
          this.speed = (Math.random() * 10) + 1;
        }
    
        update() {
          this.z -= this.speed; // Move para frente
    
          if (this.z <= 0) {
            this.reset();
            this.z = canvas.width;
          }
        }
    
        draw() {
          let scale = canvas.width / this.z;
          let x2d = (this.x - canvas.width / 2) * scale + canvas.width / 2;
          let y2d = (this.y - canvas.height / 2) * scale + canvas.height / 2;
          let size = this.size * scale;
    
          ctx.beginPath();
          ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
          ctx.fillStyle = "white";
          ctx.fill();
        }
      }
    
      function createStars() {
        for (let i = 0; i < numStars; i++) {
          stars.push(new Star());
        }
      }
    
      function animate() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    
        for (let star of stars) {
          star.update();
          star.draw();
        }
    
        requestAnimationFrame(animate);
      }
    
      createStars();
      animate();
    
      // Ajusta o canvas ao redimensionar a tela
      window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        stars = [];
        createStars();
      });