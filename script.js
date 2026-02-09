/**
 * BEECHANICAL - Main JavaScript File
 * Handles navigation interactivity and smooth scrolling
 */

// Hexagon Canvas Animation
function initHexagonCanvas() {
    const canvas = document.getElementById('hexagonCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const hexagons = [];
    let animationId;
    
    function resizeCanvas() {
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    }
    
    class Hexagon {
        constructor(x, y, size) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.baseOpacity = Math.random() * 0.15 + 0.05;
            this.currentOpacity = this.baseOpacity;
            this.targetOpacity = this.baseOpacity;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.002;
        }
        
        update(mouseX, mouseY) {
            // Calculate distance to mouse
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 200;
            
            // Increase opacity on hover
            if (distance < maxDistance) {
                this.targetOpacity = Math.min(0.4, this.baseOpacity + (1 - distance / maxDistance) * 0.35);
            } else {
                this.targetOpacity = this.baseOpacity;
            }
            
            // Smooth opacity transition
            this.currentOpacity += (this.targetOpacity - this.currentOpacity) * 0.1;
            
            // Update rotation
            this.rotation += this.rotationSpeed;
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            
            // Draw hexagon outline
            ctx.strokeStyle = `rgba(242, 183, 5, ${this.currentOpacity})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            for (let i = 0; i < 6; i++) {
                const angle = (i * Math.PI / 3);
                const hx = Math.cos(angle) * this.size;
                const hy = Math.sin(angle) * this.size;
                
                if (i === 0) {
                    ctx.moveTo(hx, hy);
                } else {
                    ctx.lineTo(hx, hy);
                }
            }
            ctx.closePath();
            ctx.stroke();
            
            // Draw filled hexagon with very low opacity
            ctx.fillStyle = `rgba(242, 183, 5, ${this.currentOpacity * 0.3})`;
            ctx.fill();
            
            ctx.restore();
        }
    }
    
    function initHexagons() {
        hexagons.length = 0;
        const hexSize = 30;
        const spacing = 90;
        
        for (let y = -spacing; y < canvas.height + spacing; y += spacing) {
            for (let x = -spacing; x < canvas.width + spacing; x += spacing) {
                const offsetX = (Math.floor(y / spacing) % 2) * (spacing / 2);
                hexagons.push(new Hexagon(x + offsetX, y, hexSize));
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Get mouse position
        const rect = canvas.getBoundingClientRect();
        const mouseX = window.mouseX || rect.width / 2;
        const mouseY = window.mouseY || rect.height / 2;
        
        // Update and draw hexagons
        hexagons.forEach(hex => {
            hex.update(mouseX, mouseY);
            hex.draw();
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    // Initialize
    resizeCanvas();
    initHexagons();
    animate();
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resizeCanvas();
            initHexagons();
        }, 250);
    });
}

// Track mouse position globally
document.addEventListener('mousemove', (e) => {
    window.mouseX = e.clientX;
    window.mouseY = e.clientY;
});

document.addEventListener('DOMContentLoaded', function() {
    // Initialize hexagon canvas
    initHexagonCanvas();
    
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translateY(10px)' : 'rotate(0)';
            spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translateY(-10px)' : 'rotate(0)';
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            // Reset hamburger animation
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'rotate(0)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0)';
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease-in forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all service cards, project cards, and stat cards
    const cards = document.querySelectorAll('.service-card, .project-card, .stat-card, .philosophy-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });

    // Form handling with Formspree (no CORS issues)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validate form
            let isValid = true;
            this.querySelectorAll('[required]').forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#FF6B6B';
                } else {
                    field.style.borderColor = 'transparent';
                }
            });

            if (!isValid) return;

            // Prepare form data
            const formData = new FormData(this);
            
            // Send to Formspree
            const submitBtn = this.querySelector('.submit-button');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '📤 Sending...';
            submitBtn.disabled = true;

            try {
                const response = await fetch('https://formspree.io/f/xojnqkrl', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Show success message
                    submitBtn.textContent = '✓ Message Sent!';
                    submitBtn.style.backgroundColor = '#4ade80';
                    
                    // Reset form
                    this.reset();
                    
                    // Restore button after 3 seconds
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.backgroundColor = 'var(--yellow)';
                        submitBtn.disabled = false;
                    }, 3000);
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                submitBtn.textContent = '❌ Error - Try Again';
                submitBtn.style.backgroundColor = '#ff6b6b';
                submitBtn.disabled = false;
                console.error('Form submission error:', error);
                
                // Restore button after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = 'var(--yellow)';
                }, 3000);
            }
        });
    }
});

// Add fadeIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
