// Scroll Reveal Animation
const scrollReveal = () => {
    const elements = document.querySelectorAll('.scroll-reveal');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', scrollReveal);
window.addEventListener('load', scrollReveal);

// Smooth Scroll for Navigation
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

// Navbar Background on Scroll
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        nav.style.background = 'rgba(10, 10, 10, 0.8)';
    }
});

// Counter Animation
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('%') ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : '+');
        }
    }, 30);
};

// Trigger counter animation when stats are visible
const statsSection = document.querySelector('.hero-stats');
let counted = false;

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counted) {
            counted = true;
            document.querySelectorAll('.stat-item h3').forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
        }
    });
});

observer.observe(statsSection);

// Lightbox Functionality
function openLightbox(imageSrc, caption) {
    const modal = document.getElementById('lightboxModal');
    const modalImg = document.getElementById('lightboxImage');
    const captionText = document.getElementById('lightboxCaption');
    
    modal.style.display = 'flex';
    modalImg.src = imageSrc;
    captionText.innerHTML = caption;
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close lightbox when clicking outside the image
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('lightboxModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeLightbox();
            }
        });
    }
    
    // Close lightbox on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
});

// Scroll to Top Button Functionality
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const service = formData.get('service');
            const message = formData.get('message');
            
            // Create email message
            const emailBody = `
Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${service}
Message: ${message}
            `.trim();
            
            // Send via mailto (alternative approach - send to backend)
            const mailtoLink = `mailto:info@xpertsols.com?subject=New Quote Request from ${name}&body=${encodeURIComponent(emailBody)}`;
            window.location.href = mailtoLink;
            
            // Show success message
            setTimeout(() => {
                alert('Thank you for your message! We will get in touch with you soon.');
                contactForm.reset();
            }, 500);
        });
    }
});

// Swiper Initialization
document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('#textSwiper', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            init: function () {
                const slidesImages = [
                    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=1200&auto=format&fit=crop&q=80'
                ];
                const bgElement = document.getElementById('sliderImage');
                if (bgElement) {
                    bgElement.style.backgroundImage = `url('${slidesImages[this.realIndex]}')`;
                }
            },
            slideChange: function () {
                const activeIndex = this.realIndex;
                const slidesImages = [
                    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=1200&auto=format&fit=crop&q=80'
                ];
                const bgElement = document.getElementById('sliderImage');
                if (bgElement) {
                    bgElement.style.backgroundImage = `url('${slidesImages[activeIndex] || slidesImages[0]}')`;
                }
            }
        }
    });

    // Services Slider Initialization
    const servicesSwiper = new Swiper('#servicesSwiper', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        centeredSlides: false,
        allowTouchMove: true,
        autoplay: {
            delay: 8000,
            disableOnInteraction: true
        },
        on: {
            init: function() {
                attachSliderNavigationEvents(this);
                attachSliderHoverEvents(this);
            }
        }
    });

    function attachSliderNavigationEvents(swiperInstance) {
        const slides = document.querySelectorAll('#servicesSwiper .swiper-slide');
        slides.forEach(slide => {
            const prevBtn = slide.querySelector('.slider-prev');
            const nextBtn = slide.querySelector('.slider-next');

            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    swiperInstance.slidePrev();
                });
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    swiperInstance.slideNext();
                });
            }
        });
    }

    function attachSliderHoverEvents(swiperInstance) {
        const sliderContainer = document.getElementById('servicesSwiper');
        
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => {
                swiperInstance.autoplay.stop();
            });

            sliderContainer.addEventListener('mouseleave', () => {
                swiperInstance.autoplay.start();
            });
        }
    }
});
