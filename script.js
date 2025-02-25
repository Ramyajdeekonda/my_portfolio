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

let slideIndex = {
    'project1-slideshow': 0,
    'project2-slideshow': 0,
    'project3-slideshow': 0
};
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

function changeSlide(n, slideshowClass) {
    showSlides(slideIndex[slideshowClass] += n, slideshowClass);
}

function currentSlide(n, slideshowClass) {
    showSlides(slideIndex[slideshowClass] = n, slideshowClass);
}

function showSlides(n, slideshowClass) {
    let slides = document.querySelector('.' + slideshowClass).getElementsByTagName('img');
    let dots = document.querySelector('.' + slideshowClass).parentElement.getElementsByClassName('dot');
    
    if (n >= slides.length) { slideIndex[slideshowClass] = 0; }
    if (n < 0) { slideIndex[slideshowClass] = slides.length - 1; }
    
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.add('hidden');
        dots[i].classList.remove('active');
    }
    
    // Show current slide
    slides[slideIndex[slideshowClass]].classList.remove('hidden');
    dots[slideIndex[slideshowClass]].classList.add('active');
}

// Initialize all slideshows
document.addEventListener('DOMContentLoaded', function() {
    let slideshows = ['project1-slideshow', 'project2-slideshow', 'project3-slideshow'];
    slideshows.forEach(function(slideshow) {
        showSlides(0, slideshow);
    });
}); 