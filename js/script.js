const mobileNav = document.querySelector(".hamburger");
const navbar = document.querySelector(".menubar");

const toggleNav = () => {
  navbar.classList.toggle("active");
  mobileNav.classList.toggle("hamburger-active");
};
mobileNav.addEventListener("click", () => toggleNav());



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