document.addEventListener('DOMContentLoaded', function () {

  // Elementos principales
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navWrapper = document.querySelector('.nav-wrapper');
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
  // Crear overlay para versión móvil
  const overlay = document.createElement('div');
  overlay.classList.add('nav-overlay');
  document.body.appendChild(overlay);
  
  // Función para alternar el menú móvil
  function toggleMobileMenu() {
    mobileToggle.classList.toggle('active');
    navWrapper.classList.toggle('active');
    overlay.classList.toggle('active');
    
    // Bloquear/desbloquear scroll del body
    if (navWrapper.classList.contains('active')) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
      
      // Reset de todos los submenús al cerrar
      resetAllDropdowns();
    }
  }
  
  // Función para cerrar todos los dropdowns
  function resetAllDropdowns() {
    document.querySelectorAll('.dropdown-toggle.active').forEach(toggle => {
      toggle.classList.remove('active');
      const nextMenu = toggle.nextElementSibling;
      if (nextMenu && nextMenu.classList.contains('dropdown-menu')) {
        nextMenu.classList.remove('show');
      }
    });
  }
  
  // Event listener para el botón de menú móvil
  if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileMenu);
  }
  
  // Event listener para el overlay
  overlay.addEventListener('click', function() {
    if (navWrapper.classList.contains('active')) {
      toggleMobileMenu();
    }
  });
  
  // Manejar los dropdowns en móvil
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        
        // Obtener el dropdown-menu asociado a este toggle
        const dropdownMenu = this.nextElementSibling;
        
        // Si estamos en un dropdown anidado, evitamos cerrar los padres
        e.stopPropagation();
        
        // Comportamiento de acordeón - cerramos otros dropdowns al mismo nivel
        const parent = this.closest('li').parentElement;
        if (parent) {
          parent.querySelectorAll(':scope > li > .dropdown-toggle.active').forEach(activeToggle => {
            if (activeToggle !== this) {
              activeToggle.classList.remove('active');
              const nextMenu = activeToggle.nextElementSibling;
              if (nextMenu && nextMenu.classList.contains('dropdown-menu')) {
                nextMenu.classList.remove('show');
              }
            }
          });
        }
        
        document.querySelectorAll('.main-menu > li > a').forEach(link => {
          link.addEventListener('click', function(e) {
            // Se ejecuta la lógica del click, luego se remueve el foco.
            this.blur();
          });
        });

        // Toggle para este dropdown específico
        this.classList.toggle('active');
        if (dropdownMenu) {
          dropdownMenu.classList.toggle('show');
        }
        // Toggle the dropdown icon rotation
        const dropdownIcon = this.querySelector('.dropdown-icon');
        if (dropdownIcon) {
          dropdownIcon.style.transform = dropdownIcon.style.transform === 'rotate(180deg)' ? 'rotate(0)' : 'rotate(180deg)';
        }
        this.blur();
      }
    });
  });
  
  // Cerrar el menú móvil al hacer click en un enlace final
  const finalLinks = document.querySelectorAll('.main-menu a:not(.dropdown-toggle)');
  finalLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 991 && navWrapper.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });
  
  // Ajustar comportamiento en resize
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    
    resizeTimeout = setTimeout(function() {
      if (window.innerWidth > 991) {
        // Resetear todo en desktop
        navWrapper.classList.remove('active');
        mobileToggle.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        resetAllDropdowns();
      }
    }, 100);
  });
  
  // Para dispositivos táctiles en vista desktop
  if ('ontouchstart' in window && window.innerWidth > 991) {
    document.addEventListener('touchstart', function(e) {
      // Si se toca fuera de cualquier dropdown
      if (!e.target.closest('.dropdown')) {
        // Cerrar todos los dropdowns activos
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
          menu.style.opacity = '0';
          menu.style.visibility = 'hidden';
          
          // Restaurar después de la transición
          setTimeout(() => {
            if (!menu.closest('.dropdown:hover, .dropdown:focus-within')) {
              menu.removeAttribute('style');
            }
          }, 200);
        });
      }
    });
  }
});
  /* HERO SLIDER */
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;

  function nextSlide() {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
  }

  setInterval(nextSlide, 4000);

  /* CARRUSEL LOGOS */
  const track = document.querySelector('.logo-track');

  if (track) {
      const trackWidth = track.scrollWidth;
      const clone = track.innerHTML;
      track.innerHTML += clone; // Duplicamos los logos para el efecto infinito

      let scrollAmount = 0;
      const scrollSpeed = 1; // Ajusta este valor para cambiar la velocidad

      function moveCarousel() {
          scrollAmount += scrollSpeed;

          if (scrollAmount >= trackWidth / 2) {
              scrollAmount = 0; // Reiniciar el scroll
          }

          track.style.transform = `translateX(-${scrollAmount}px)`;
          requestAnimationFrame(moveCarousel);
      }

      moveCarousel(); // Iniciar el carrusel
  }


/*SECCION DE DATOS*/
  const counters = document.querySelectorAll(".animated-number");

  counters.forEach(counter => {
      const target = +counter.getAttribute("data-target"); // Valor final
      const speed = +counter.getAttribute("data-speed"); // Velocidad personalizada

      let count = 0;

      const updateCount = () => {
          const increment = Math.ceil(target / speed); // Ajusta el paso según el speed
          count += increment;

          if (count >= target) {
              counter.textContent = target; // Asegurar que no pase el número objetivo
          } else {
              counter.textContent = count;
              setTimeout(updateCount, 50); // Velocidad de actualización
          }
      };

      updateCount(); // Iniciar animación
  });


/*SECCION DE DATOS*/

document.addEventListener('DOMContentLoaded', function () {
  const stats = document.querySelectorAll('.info-number');

  const animateStat = (stat) => {
    const target = +stat.getAttribute('data-target');
    const speed = +stat.getAttribute('data-speed') || 50; // Velocidad personalizada
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