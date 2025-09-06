// Modern Portfolio JavaScript

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeAnimations();
    initializeScrollEffects();
    initializeFormHandling();
    initializeCounters();
    initializeMobileMenu();
    initializeBackToTop();
    initializeParallax();
    initializeTypingEffect();
    initializeProgressBars();
    initializeImageGallery();
});

// Navigation functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            // Skip if it's not an anchor link
            if (!targetId.startsWith('#')) {
                window.location.href = targetId;
                return;
            }
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            }
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Highlight active section on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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
}

// Animation initialization
function initializeAnimations() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }
    
    // Add entrance animations to elements
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(element => {
        const animationType = element.getAttribute('data-animate');
        element.classList.add(`entrance-${animationType}`);
    });
}

// Scroll effects
function initializeScrollEffects() {
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('revealed');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('revealed');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation(); // Initial check
}

// Form handling
function initializeFormHandling() {
    const form = document.forms['submit-to-google-sheet'];
    const msg = document.getElementById('msg');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbztYP0AEr01wFORBLYs-Y9Sh5wyX2cYEqsF8VG2Ca60c7zlnQGToiNU__Fx_KN9nV3AoQ/exec';
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Submit form
            fetch(scriptURL, { 
                method: 'POST', 
                body: new FormData(form)
            })
            .then(response => {
                // Success message
                msg.innerHTML = "✅ Message sent successfully! I'll get back to you soon.";
                msg.classList.add('success');
                msg.style.opacity = '1';
                
                // Reset form
                form.reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    msg.style.opacity = '0';
                    setTimeout(() => {
                        msg.classList.remove('success');
                    }, 300);
                }, 5000);
            })
            .catch(error => {
                // Error message
                msg.innerHTML = "❌ Something went wrong. Please try again.";
                msg.classList.add('error');
                msg.style.opacity = '1';
                
                console.error('Error!', error.message);
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    msg.style.opacity = '0';
                    setTimeout(() => {
                        msg.classList.remove('error');
                    }, 300);
                }, 5000);
            })
            .finally(() => {
                // Restore button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
        
        // Add real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearError);
        });
    }
}

// Field validation
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing error
    field.classList.remove('error');
    
    // Validate based on field type
    if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value && !emailRegex.test(value)) {
            field.classList.add('error');
            showFieldError(field, 'Please enter a valid email address');
        }
    } else if (field.required && !value) {
        field.classList.add('error');
        showFieldError(field, 'This field is required');
    }
}

function clearError(e) {
    const field = e.target;
    field.classList.remove('error');
    hideFieldError(field);
}

function showFieldError(field, message) {
    hideFieldError(field);
    const error = document.createElement('div');
    error.className = 'field-error';
    error.textContent = message;
    field.parentNode.appendChild(error);
}

function hideFieldError(field) {
    const error = field.parentNode.querySelector('.field-error');
    if (error) {
        error.remove();
    }
}

// Counter animation
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
                if (target === 98) {
                    counter.textContent = target + '%';
                }
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Mobile menu
function initializeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        // Toggle menu on hamburger click
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on nav links
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
        
        // Close menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Back to top button
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Parallax effect
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = -(scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Typing effect
function initializeTypingEffect() {
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
                element.classList.add('typing-complete');
            }
        }, 100);
    });
}

// Progress bars
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const animateProgressBar = (bar) => {
        const targetWidth = bar.getAttribute('data-width') || '100%';
        bar.style.width = targetWidth;
    };
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBar(entry.target);
                progressObserver.unobserve(entry.target);
            }
        });
    });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Image gallery functionality
function initializeImageGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const body = document.body;
    
    // Create gallery modal elements
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <div class="gallery-modal-content">
            <span class="gallery-close">&times;</span>
            <img class="gallery-full-image">
            <div class="gallery-caption"></div>
            <div class="gallery-navigation">
                <button class="gallery-prev"><i class="fas fa-chevron-left"></i></button>
                <button class="gallery-next"><i class="fas fa-chevron-right"></i></button>
            </div>
        </div>
    `;
    
    body.appendChild(modal);
    
    const modalImg = modal.querySelector('.gallery-full-image');
    const captionText = modal.querySelector('.gallery-caption');
    const closeBtn = modal.querySelector('.gallery-close');
    const prevBtn = modal.querySelector('.gallery-prev');
    const nextBtn = modal.querySelector('.gallery-next');
    
    let currentIndex = 0;
    const galleryArray = Array.from(galleryItems);
    
    // Open modal with image
    function openModal(index) {
        const item = galleryArray[index];
        const imgSrc = item.getAttribute('data-full') || item.querySelector('img').src;
        const caption = item.getAttribute('data-caption') || '';
        
        currentIndex = index;
        modal.classList.add('open');
        body.classList.add('gallery-open');
        modalImg.src = imgSrc;
        captionText.textContent = caption;
        
        // Show/hide navigation buttons based on gallery length
        if (galleryArray.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'block';
            nextBtn.style.display = 'block';
        }
    }
    
    // Close modal
    function closeModal() {
        modal.classList.remove('open');
        body.classList.remove('gallery-open');
        setTimeout(() => {
            modalImg.src = '';
        }, 300);
    }
    
    // Navigate to previous image
    function prevImage() {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = galleryArray.length - 1;
        openModal(newIndex);
    }
    
    // Navigate to next image
    function nextImage() {
        let newIndex = currentIndex + 1;
        if (newIndex >= galleryArray.length) newIndex = 0;
        openModal(newIndex);
    }
    
    // Add click event to gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openModal(index));
    });
    
    // Add events to modal controls
    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('open')) return;
        
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Smooth scrolling for all anchor links
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
});

// Add loading states to buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-primary') && e.target.type !== 'submit') {
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.target.style.transform = 'scale(1)';
        }, 150);
    }
});

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize lazy loading if needed
initializeLazyLoading();

// Dark mode toggle (optional feature)
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            // Save preference
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
        });
        
        // Load saved preference
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'true') {
            document.body.classList.add('dark-mode');
        }
    }
}

// Initialize dark mode if toggle exists
initializeDarkMode();

// Performance monitoring
function initializePerformanceMonitoring() {
    // Log performance metrics
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}

// Initialize performance monitoring in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    initializePerformanceMonitoring();
}

// Add ripple effect to buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-ripple')) {
        const button = e.target;
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement('span');
        
        ripple.className = 'ripple';
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top = (e.clientY - rect.top) + 'px';
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add hover effects to cards
document.addEventListener('mouseenter', (e) => {
    if (e.target.classList.contains('hover-lift')) {
        e.target.style.transform = 'translateY(-5px)';
    }
}, true);

document.addEventListener('mouseleave', (e) => {
    if (e.target.classList.contains('hover-lift')) {
        e.target.style.transform = 'translateY(0)';
    }
}, true);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('using-keyboard');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('using-keyboard');
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // You can add error reporting here
});

// Unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
    // You can add error reporting here
});

// Console welcome message
console.log(`
🚀 Welcome to Randeepa's Portfolio!
📧 Contact: avithariyawansa207@gmail.com
💼 Available for hire!
`);

// Export functions for testing or external use
window.portfolioUtils = {
    initializeNavigation,
    initializeAnimations,
    initializeScrollEffects,
    initializeFormHandling,
    initializeCounters,
    debounce,
    throttle
};
