/* ========================================
   VOID BEATS — JAVASCRIPT
   Interações lo-fi e animações suaves
   ======================================== */

// ========================================
// SMOOTH SCROLL — Navegação suave
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// SCROLL REVEAL — Fade in ao rolar
// ========================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar todas as seções
document.querySelectorAll('.section-container').forEach(section => {
    observer.observe(section);
});

// ========================================
// NAVIGATION — Scroll ativo
// ========================================
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========================================
// BEATS — Player interativo
// ========================================
const beatCards = document.querySelectorAll('.beat-card');
let currentlyPlaying = null;

beatCards.forEach(card => {
    const playButton = card.querySelector('.beat-play');
    const waveBars = card.querySelectorAll('.wave-bar');
    
    playButton.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Se já está tocando este beat
        if (currentlyPlaying === card) {
            stopBeat(card);
            currentlyPlaying = null;
        } else {
            // Parar qualquer beat tocando
            if (currentlyPlaying) {
                stopBeat(currentlyPlaying);
            }
            
            // Tocar novo beat
            playBeat(card);
            currentlyPlaying = card;
        }
    });
    
    // Click no card também ativa o play
    card.addEventListener('click', () => {
        playButton.click();
    });
});

function playBeat(card) {
    const playButton = card.querySelector('.beat-play');
    const waveBars = card.querySelectorAll('.wave-bar');
    
    playButton.textContent = '■';
    card.style.borderColor = 'var(--accent)';
    
    // Animar barras de onda mais intensamente
    waveBars.forEach(bar => {
        bar.style.animationDuration = '0.8s';
        bar.style.opacity = '1';
    });
    
    // Simular reprodução (aqui você conectaria um player real)
    console.log('Playing:', card.querySelector('.beat-name').textContent);
}

function stopBeat(card) {
    const playButton = card.querySelector('.beat-play');
    const waveBars = card.querySelectorAll('.wave-bar');
    
    playButton.textContent = '▶';
    card.style.borderColor = 'var(--border)';
    
    // Voltar animação ao normal
    waveBars.forEach(bar => {
        bar.style.animationDuration = '1.5s';
        bar.style.opacity = '0.4';
    });
}

// ========================================
// CURSOR CUSTOMIZADO (opcional, sutil)
// ========================================
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

// Estilo do cursor
const style = document.createElement('style');
style.textContent = `
    .custom-cursor {
        width: 8px;
        height: 8px;
        border: 1px solid var(--accent);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.15s ease;
        mix-blend-mode: difference;
    }
    
    body:hover .custom-cursor {
        opacity: 0.6;
    }
    
    .beat-card:hover ~ .custom-cursor,
    .contact-link:hover ~ .custom-cursor,
    .nav-link:hover ~ .custom-cursor {
        transform: scale(2);
        opacity: 1;
    }
`;
document.head.appendChild(style);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// ========================================
// PARALLAX SUAVE — Elemento grafite
// ========================================
const graffiti = document.querySelector('.graffiti-element');

if (graffiti) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        
        graffiti.style.transform = `translateY(${rate}px) rotate(${scrolled * 0.05}deg)`;
    });
}

// ========================================
// BEATS — Animação de entrada stagger
// ========================================
const beatCardsArray = Array.from(beatCards);

const beatObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100); // Delay escalonado
        }
    });
}, {
    threshold: 0.1
});

beatCardsArray.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    beatObserver.observe(card);
});

// ========================================
// SERVIÇOS — Hover stagger nos ícones
// ========================================
const servicoCards = document.querySelectorAll('.servico-card');

servicoCards.forEach(card => {
    const icon = card.querySelector('.servico-icon svg');
    
    card.addEventListener('mouseenter', () => {
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.transition = 'transform 0.4s ease';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// ========================================
// SCROLL INDICATOR — Esconder ao rolar
// ========================================
const scrollIndicator = document.querySelector('.scroll-indicator');

if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        if (scrolled > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
        }
    });
}

// ========================================
// EASTER EGG — Konami code ou sequência
// ========================================
let sequence = [];
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown'];

document.addEventListener('keydown', (e) => {
    sequence.push(e.key);
    sequence = sequence.slice(-konamiCode.length);
    
    if (sequence.join('') === konamiCode.join('')) {
        console.log('🎵 VOID BEATS — Easter egg ativado');
        document.body.style.animation = 'hueRotate 10s linear infinite';
        
        const easterStyle = document.createElement('style');
        easterStyle.textContent = `
            @keyframes hueRotate {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(easterStyle);
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 10000);
    }
});

// ========================================
// PERFORMANCE — Lazy load para imagens
// ========================================
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ========================================
// LOG INICIAL — Console style
// ========================================
console.log('%c VOID BEATS ', 'background: #d4a574; color: #0f0f0f; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c Lo-Fi Hip-Hop Producer | São Paulo, Brasil ', 'color: #a0a0a0; font-size: 12px;');
console.log('%c Site desenvolvido com atenção aos detalhes. ', 'color: #6b6b6b; font-style: italic;');
