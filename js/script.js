document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const mainMenu = document.querySelector('.main-menu');
  const hasSubmenu = document.querySelectorAll('.has-submenu');

  // Toggle menú hamburguesa
  hamburger.addEventListener('click', function() {
      mainMenu.classList.toggle('active');
  });

  // Función para cerrar todos los submenús
  function closeAllSubmenus() {
      document.querySelectorAll('.submenu.active').forEach(submenu => {
          submenu.classList.remove('active');
      });
      document.querySelectorAll('.has-submenu > a.active').forEach(item => {
          item.classList.remove('active');
      });
  }

  // Manejar submenús en dispositivos móviles
  hasSubmenu.forEach(item => {
      const link = item.querySelector('a');
      const submenu = item.querySelector('.submenu');
      
      link.addEventListener('click', function(e) {
          if (window.innerWidth <= 768) {
              e.preventDefault();
              e.stopPropagation(); // Previene que el evento se propague al elemento padre

              if (submenu.classList.contains('active')) {
                  // Si el submenú está abierto, lo cerramos
                  submenu.classList.remove('active');
                  this.classList.remove('active');
              } else {
                  // Si el submenú está cerrado, cerramos todos los demás y abrimos este
                  closeAllSubmenus();
                  submenu.classList.add('active');
                  this.classList.add('active');
              }
          }
      });

      // Maneja clics en elementos del submenú para evitar que se cierre inmediatamente
      submenu.addEventListener('click', function(e) {
          e.stopPropagation();
      });
  });

  // Cerrar menú al hacer clic fuera de él
  document.addEventListener('click', function(e) {
      if (!mainMenu.contains(e.target) && !hamburger.contains(e.target)) {
          mainMenu.classList.remove('active');
          closeAllSubmenus();
      }
  });

  // Ajustar menú en resize
  window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
          mainMenu.classList.remove('active');
          closeAllSubmenus();
      }
  });
});










/* CARRUSEL */

// Función para duplicar los logos y crear un efecto infinito
function setupCarousel() {
  const track = document.querySelector('.logo-track');
  const slides = Array.from(track.children);

  // Duplicar los slides para crear el efecto infinito
  slides.forEach(slide => {
    const clone = slide.cloneNode(true);
    track.appendChild(clone);
  });
}

// Inicializar el carrusel cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', setupCarousel);

/* CONTEO DE DATOS */

// Script para animar el conteo de números con velocidad personalizada
document.addEventListener('DOMContentLoaded', function () {
  const stats = document.querySelectorAll('.stat-value');

  const animateStat = (stat) => {
    const target = +stat.getAttribute('data-target');
    const speed = +stat.getAttribute('data-speed') || 30; // Velocidad personalizada, por defecto 30
    let count = 0;
    const interval = setInterval(() => {
      count++;
      stat.textContent = count;
      if (count === target) {
        clearInterval(interval);
      }
    }, speed);
  };

  const options = {
    root: null, // Observa el documento completo
    threshold: 0.5 // Activa la animación cuando el 50% del elemento es visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStat(entry.target);
        observer.unobserve(entry.target); // Detener la animación una vez ejecutada
      }
    });
  }, options);

  stats.forEach(stat => observer.observe(stat));
});
