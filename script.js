document.addEventListener('DOMContentLoaded', () => {
    // === INTERACTIVE SPLASH SCREEN ===
    const path = document.getElementById('splash-path');
    const splash = document.getElementById('splash-screen');
    const svg = document.getElementById('splash-svg');

    if (path && splash && svg) {
        let width = window.innerWidth;
        let height = window.innerHeight;
        
        let mouse = { x: width/2, y: height/2 };
        let curX = width/2;
        let curY = height/2;
        let tgtX = width/2;
        let tgtY = height/2;
        
        const stiffness = 0.15;
        const damping = 0.85;
        let vX = 0;
        let vY = 0;

        function updatePath() {
            path.setAttribute('d', `M 0 ${height/2} Q ${curX} ${curY} ${width} ${height/2}`);
        }

        function resizeSvg() {
            width = window.innerWidth;
            height = window.innerHeight;
            svg.setAttribute('width', width);
            svg.setAttribute('height', height);
            svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
            tgtX = width/2;
            tgtY = height/2;
        }

        window.addEventListener('resize', resizeSvg);
        resizeSvg();

        splash.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            
            const distY = Math.abs(mouse.y - height/2);
            
            if (distY < 200) {
                tgtX = mouse.x;
                tgtY = mouse.y;
            } else {
                tgtX = width/2;
                tgtY = height/2;
            }
        });

        splash.addEventListener('mouseleave', () => {
            tgtX = width/2;
            tgtY = height/2;
        });

        let splashDismissed = false;
        function dismissSplash() {
            if (splashDismissed) return;
            splashDismissed = true;
            splash.classList.add('hidden');
            
            window.scrollTo(0, 0);
            if (window.location.hash) {
                history.replaceState(null, null, ' ');
            }

            document.body.style.overflow = 'auto';
            
            // Trigger text motion entrance after splash hides
            setTimeout(() => {
                const leftContent = document.querySelector('.left-content');
                if (leftContent) leftContent.classList.add('animate');
            }, 400);
            
            tgtY = height/2;
            tgtX = width/2;
        }

        splash.addEventListener('click', dismissSplash);
        document.body.style.overflow = 'hidden';

        function animate() {
            vX += (tgtX - curX) * stiffness;
            vX *= damping;
            curX += vX;

            vY += (tgtY - curY) * stiffness;
            vY *= damping;
            curY += vY;

            updatePath();
            requestAnimationFrame(animate);
        }
        
        updatePath();
        animate();
    }

    // === FADE IN ON SCROLL ===
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

    const animatedElements = document.querySelectorAll('.competency-card, .experience-block, .footer-content');
    
    const style = document.createElement('style');
    style.textContent = `
        .competency-card, .experience-block, .footer-content {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .competency-card.visible, .experience-block.visible, .footer-content.visible {
            opacity: 1;
            transform: translateY(0);
        }
        .competency-card:nth-child(1) { transition-delay: 0.05s; }
        .competency-card:nth-child(2) { transition-delay: 0.1s; }
        .competency-card:nth-child(3) { transition-delay: 0.15s; }
        .competency-card:nth-child(4) { transition-delay: 0.2s; }
        .competency-card:nth-child(5) { transition-delay: 0.25s; }
    `;
    document.head.appendChild(style);

    animatedElements.forEach(el => observer.observe(el));

    // === TYPOGRAPHY HIGHLIGHT LOOP ===
    const dataBox = document.querySelector('.data-box');
    const structureBox = document.querySelector('.structure-box');
    
    if (dataBox && structureBox) {
        const boxes = [dataBox, structureBox];
        let activeIndex = 0;
        
        boxes[activeIndex].classList.add('highlight-active');
        
        setInterval(() => {
            boxes[activeIndex].classList.remove('highlight-active');
            activeIndex = (activeIndex + 1) % boxes.length;
            boxes[activeIndex].classList.add('highlight-active');
        }, 1200);
    }
});
