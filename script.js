// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});

// Navigation highlight on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

let slideIndex = {};
let slideshowIntervals = {};

function initSlideshow(slideshowClass) {
    slideIndex[slideshowClass] = 0;
    showSlides(0, slideshowClass);

    // Clear any existing interval
    if (slideshowIntervals[slideshowClass]) {
        clearInterval(slideshowIntervals[slideshowClass]);
    }

    // Auto advance slides every 5 seconds
    slideshowIntervals[slideshowClass] = setInterval(() => {
        changeSlide(1, slideshowClass);
    }, 5000);
}

function changeSlide(direction, slideshowClass) {
    // Reset the interval when manually changing slides
    if (slideshowIntervals[slideshowClass]) {
        clearInterval(slideshowIntervals[slideshowClass]);
    }
    
    showSlides(slideIndex[slideshowClass] + direction, slideshowClass);
    
    // Restart the interval
    slideshowIntervals[slideshowClass] = setInterval(() => {
        changeSlide(1, slideshowClass);
    }, 5000);
}

function currentSlide(index, slideshowClass) {
    // Reset the interval when manually selecting a slide
    if (slideshowIntervals[slideshowClass]) {
        clearInterval(slideshowIntervals[slideshowClass]);
    }
    
    showSlides(index, slideshowClass);
    
    // Restart the interval
    slideshowIntervals[slideshowClass] = setInterval(() => {
        changeSlide(1, slideshowClass);
    }, 5000);
}

function showSlides(newIndex, slideshowClass) {
    const slideshow = document.querySelector(`.${slideshowClass}`);
    const slides = slideshow.getElementsByTagName('img');
    const dots = slideshow.parentElement.getElementsByClassName('dot');
    
    // Handle wraparound
    if (newIndex >= slides.length) newIndex = 0;
    if (newIndex < 0) newIndex = slides.length - 1;
    
    // Update slideIndex
    slideIndex[slideshowClass] = newIndex;
    
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.add('hidden');
        if (dots[i]) {  // Check if dot exists
            dots[i].classList.remove('active');
            dots[i].classList.add('opacity-50');
        }
    }
    
    // Show current slide
    slides[newIndex].classList.remove('hidden');
    if (dots[newIndex]) {  // Check if dot exists
        dots[newIndex].classList.add('active');
        dots[newIndex].classList.remove('opacity-50');
    }
}

// Initialize slideshows when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initSlideshow('project1-slideshow');
}); 