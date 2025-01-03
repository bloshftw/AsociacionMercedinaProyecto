document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.hamburger');
  const menubar = document.querySelector('.menubar');
  const hasSubmenuItems = document.querySelectorAll('.has-submenu');

  // Manejo de la hamburguesa
  hamburger.addEventListener('click', function () {
    this.classList.toggle('hamburger-active');
    menubar.classList.toggle('active');
  });

  // Función para alternar los submenús
  function toggleSubmenu(e) {
    const submenu = this.querySelector('.submenu');
    const link = this.querySelector('a');

    if (submenu) {
      // Evita la acción predeterminada solo si el submenú está presente
      e.preventDefault();

      // Cierra otros submenús abiertos
      hasSubmenuItems.forEach(item => {
        const itemSubmenu = item.querySelector('.submenu');
        const itemLink = item.querySelector('a');
        if (item !== this && itemSubmenu) {
          itemSubmenu.classList.remove('active');
          itemLink.classList.remove('active');
        }
      });

      // Alterna el estado del submenú actual
      submenu.classList.toggle('active');
      link.classList.toggle('active');
    }
  }

  // Asigna eventos a los elementos con submenús
  hasSubmenuItems.forEach(item => {
    item.addEventListener('click', toggleSubmenu);
    item.addEventListener('touchstart', toggleSubmenu); // Soporte para dispositivos táctiles
  });

  // Cierra los submenús al hacer clic fuera, excepto si haces clic en un submenú
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.has-submenu') && !e.target.closest('.submenu')) {
      hasSubmenuItems.forEach(item => {
        const submenu = item.querySelector('.submenu');
        const link = item.querySelector('a');
        if (submenu) submenu.classList.remove('active');
        if (link) link.classList.remove('active');
      });
    }
  });

  // Evitar que los clics en enlaces de submenús cierren el menú
  const submenuLinks = document.querySelectorAll('.submenu a');
  submenuLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.stopPropagation(); // Detiene la propagación del evento al documento
    });
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
