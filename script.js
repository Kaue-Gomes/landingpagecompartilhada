// script.js - Funcionalidades para a landing page da Nexus AI

document.addEventListener('DOMContentLoaded', function () {
    // Adiciona o menu hambúrguer
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.classList.add('mobile-menu-toggle');
    mobileMenuToggle.innerHTML = '&#9776;'; // Ícone de hambúrguer

    const navContainer = document.querySelector('nav .navbar-container');
    navContainer.appendChild(mobileMenuToggle);

    // Adiciona funcionalidade ao menu hambúrguer
    mobileMenuToggle.addEventListener('click', function () {
        const navLinks = document.querySelector('.nav-links');
        this.classList.toggle('active');

        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '80px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.backgroundColor = 'var(--dark-color)';
            navLinks.style.padding = '20px';
            navLinks.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';

            const navItems = navLinks.querySelectorAll('li');
            navItems.forEach(item => {
                item.style.margin = '10px 0';
            });
        }
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth',
                });
            }
        });
    });

    // Animation on scroll
    const animatedElements = document.querySelectorAll('.animate-fadeInUp');

    function checkIfInView() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    }

    window.addEventListener('scroll', checkIfInView);
    checkIfInView(); // Check on page load

    // Testimonial slider functionality
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.slider-control.prev');
    const nextBtn = document.querySelector('.slider-control.next');
    let currentSlide = 0;

    function updateSlideClasses() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev', 'next');

            if (index === currentSlide) {
                slide.classList.add('active');
            } else if (index === (currentSlide - 1 + slides.length) % slides.length) {
                slide.classList.add('prev');
            } else if (index === (currentSlide + 1) % slides.length) {
                slide.classList.add('next');
            }
        });
    }

    function goToNextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlideClasses();
    }

    function goToPrevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlideClasses();
    }

    // Set up event listeners for slider controls
    nextBtn.addEventListener('click', goToNextSlide);
    prevBtn.addEventListener('click', goToPrevSlide);

    // Auto-rotate testimonials
    let slideInterval = setInterval(goToNextSlide, 5000);

    const testimonialSlider = document.querySelector('.testimonial-slider');

    testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    testimonialSlider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(goToNextSlide, 5000);
    });

    const featureCards = document.querySelectorAll('.feature-card');

    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });

    // Add typing animation to hero title
    const heroTitle = document.querySelector('.hero h1 span');
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';

    let charIndex = 0;
    function typeText() {
        if (charIndex < originalText.length) {
            heroTitle.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 100);
        } else {
            // Add blinking cursor effect after typing
            heroTitle.classList.add('typing-cursor');
        }
    }

    // Start typing animation after a short delay
    setTimeout(typeText, 1000);

const pricingNumbers = document.querySelectorAll('.pricing-price');

pricingNumbers.forEach(priceElement => {
    // Remove caracteres não numéricos (ex.: "R$", "/mês", espaços)
    const rawText = priceElement.textContent.replace(/[^0-9]/g, '');
    const finalPrice = parseInt(rawText, 10); // Converte para inteiro

    if (isNaN(finalPrice)) {
        console.error('Preço inválido:', priceElement.textContent);
        return; // Ignora elementos com preços inválidos
    }

    let currentValue = 0;
    const duration = 1500; 
    const interval = 30; 
    const steps = duration / interval;
    const increment = finalPrice / steps;

    const counter = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalPrice) {
            clearInterval(counter);
            priceElement.innerHTML = finalPrice + ' /mês ';
        } else {
            priceElement.innerHTML = Math.floor(currentValue) + ' /mês ';
        }
    }, interval);
});

    // Form validation for newsletter
    const newsletterForm = document.getElementById('newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (!isValidEmail(email)) {
                // Show error
                emailInput.classList.add('error');
                const errorMsg = document.createElement('p');
                errorMsg.classList.add('error-message');
                errorMsg.textContent = 'Por favor, insira um email válido.';

                // Remove existing error message if any
                const existingError = this.querySelector('.error-message');
                if (existingError) {
                    existingError.remove();
                }

                this.appendChild(errorMsg);
            } else {
                // Success handling
                emailInput.classList.remove('error');
                const existingError = this.querySelector('.error-message');
                if (existingError) {
                    existingError.remove();
                }

                // Show success message
                const successMsg = document.createElement('p');
                successMsg.classList.add('success-message');
                successMsg.textContent = 'Obrigado por se inscrever!';
                this.appendChild(successMsg);

                // Clear the input
                emailInput.value = '';

                // Remove success message after a delay
                setTimeout(() => {
                    successMsg.remove();
                }, 3000);
            }
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Floating elements animation
    const floatingElements = document.querySelectorAll('.floating-element');

    floatingElements.forEach((element, index) => {
        // Add random motion
        const randomX = Math.random() * 20 - 10;
        const randomY = Math.random() * 20 - 10;
        const duration = 10 + Math.random() * 10;
        const delay = Math.random() * 5;

        element.style.animation = `float ${duration}s infinite ease-in-out ${delay}s`;
        element.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });

    // Dark/Light theme toggle
    const themeToggle = document.createElement('div');
    themeToggle.classList.add('theme-toggle');
    themeToggle.innerHTML = '🌙';
    themeToggle.title = 'Alternar tema claro/escuro';

    navContainer.appendChild(themeToggle);

    themeToggle.addEventListener('click', function () {
        document.body.classList.toggle('light-theme');

        if (document.body.classList.contains('light-theme')) {
            this.innerHTML = '☀️';

            const lightThemeStyle = document.createElement('style');
            lightThemeStyle.id = 'light-theme-style';
            lightThemeStyle.textContent = `
                body.light-theme {
                    --dark-color: #f5f5f5;
                    --gray-color: #e0e0e0;
                    --light-gray: #d0d0d0;
                    --text-color: #333333;
                }

                body.light-theme #navbar {
                    background-color: rgba(245, 245, 245, 0.95);
                }

                body.light-theme .feature-card,
                body.light-theme .pricing-card,
                body.light-theme .testimonial-slide {
                    background-color: #ffffff;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
                }
            `;

            document.head.appendChild(lightThemeStyle);
        } else {
            this.innerHTML = '🌙';

            const lightThemeStyle = document.getElementById('light-theme-style');
            if (lightThemeStyle) {
                lightThemeStyle.remove();
            }
        }
    });

    // Add CSS for theme toggle
    const themeToggleStyle = document.createElement('style');
    themeToggleStyle.textContent = `
        .theme-toggle {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: var(--light-gray);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            margin-left: 15px;
            font-size: 20px;
            transition: all 0.3s ease;
        }

        .theme-toggle:hover {
            background-color: var(--primary-color);
            transform: rotate(360deg);
        }
    `;

    document.head.appendChild(themeToggleStyle);

    // Add loading animation
    const loader = document.createElement('div');
    loader.classList.add('page-loader');
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-logo">Nexus<span>AI</span></div>
            <div class="loader-spinner"></div>
        </div>
    `;

    document.body.appendChild(loader);

    // Add CSS para carregamento
    const loaderStyle = document.createElement('style');
    loaderStyle.textContent = `
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--dark-color);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        }

        .loader-content {
            text-align: center;
        }

        .loader-logo {
            font-size: 40px;
            font-weight: 700;
            color: var(--text-color);
            margin-bottom: 20px;
        }

        .loader-logo span {
            color: var(--primary-color);
        }

        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(0, 204, 102, 0.3);
            border-radius: 50%;
            border-top-color: var(--primary-color);
            animation: spin 1s infinite linear;
            margin: 0 auto;
        }

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    `;

    document.head.appendChild(loaderStyle);


    window.addEventListener('load', function () {
        setTimeout(function () {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            setTimeout(function () {
                loader.remove();
            }, 500);
        }, 1500); 
    });


    function trackPageView() {
        console.log('Page view tracked');
    }

    function trackEvent(category, action, label) {
        console.log(`Event tracked: ${category} - ${action} - ${label}`);
       
    }

    // Track page view
    trackPageView();

    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function () {
            const buttonText = this.textContent.trim();
            trackEvent('CTA', 'click', buttonText);
        });
    });

    // Track pricing plan views
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    trackEvent('Section', 'view', 'Pricing');
                    // Disconnect after first trigger
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(pricingSection);
    }
});