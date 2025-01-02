document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const menubar = document.querySelector('.menubar');
    const hasSubmenuItems = document.querySelectorAll('.has-submenu');
  
    hamburger.addEventListener('click', function() {
      this.classList.toggle('hamburger-active');
      menubar.classList.toggle('active');
    });
  
    function toggleSubmenu(e) {
      e.preventDefault();
      const submenu = this.querySelector('.submenu');
      const link = this.querySelector('a');
      
      // Cerrar todos los otros submenús
      hasSubmenuItems.forEach(item => {
        if (item !== this) {
          item.querySelector('.submenu').classList.remove('active');
          item.querySelector('a').classList.remove('active');
        }
      });
  
      // Alternar el submenú actual
      submenu.classList.toggle('active');
      link.classList.toggle('active');
    }
  
    hasSubmenuItems.forEach(item => {
      item.addEventListener('click', toggleSubmenu);
    });
  
    // Cerrar submenús al hacer clic fuera
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.has-submenu')) {
        hasSubmenuItems.forEach(item => {
          item.querySelector('.submenu').classList.remove('active');
          item.querySelector('a').classList.remove('active');
        });
      }
    });
  });

/*CONTEO DE DATOS*/
// Script para animar el conteo de números
// Script para animar el conteo de números con velocidad personalizada
document.addEventListener('DOMContentLoaded', function() {
    const stats = document.querySelectorAll('.stat-value');
    
    const animateStat = (stat) => {
        const target = +stat.getAttribute('data-target');
        const speed = +stat.getAttribute('data-speed') || 30; // Valor de velocidad personalizada, por defecto 30
        let count = 0;
        const interval = setInterval(() => {
            count++;
            stat.textContent = count;
            if (count === target) {
                clearInterval(interval);
            }
        }, speed); // Usar la velocidad personalizada aquí
    };
    
    const options = {
        root: null, // Se observa el documento entero
        threshold: 0.5 // Se activa la animación cuando el 50% del elemento es visible
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStat(entry.target);
                observer.unobserve(entry.target); // Detener la animación una vez que se ha ejecutado
            }
        });
    }, options);
    
    stats.forEach(stat => observer.observe(stat));
});

/*CONTEO DE DATOS*/ 