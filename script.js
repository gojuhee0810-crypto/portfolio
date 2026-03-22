document.addEventListener('DOMContentLoaded', () => {
    console.log("Portfolio loaded!");

    // Intersection Observer for fade-in animations on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation classes
    const animatedElements = document.querySelectorAll('.resume-item, .competency-item, .footer-content');
    
    // Add base CSS for animations dynamically to keep CSS clean
    const style = document.createElement('style');
    style.textContent = `
        .resume-item, .competency-item, .footer-content {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .resume-item.visible, .competency-item.visible, .footer-content.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // Observe elements
    animatedElements.forEach(el => observer.observe(el));

    // Animate Flowing SVG Text
    const textPath = document.querySelector('textPath');
    if (textPath) {
        let offset = 0;
        function animateFlowingText() {
            offset -= 0.05; // Speed adjustment
            if (offset <= -100) {
                offset = 0; // Reset for seamless loop if text is duplicated properly
            }
            textPath.setAttribute('startOffset', offset + '%');
            requestAnimationFrame(animateFlowingText);
        }
        animateFlowingText();
    }
});
