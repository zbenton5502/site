// Slider Functionality
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

function showNextSlide() {
    slides.forEach(slide => slide.classList.remove('active'));
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].classList.add('active');
}

setInterval(showNextSlide, 5000); // Change slide every 5 seconds
