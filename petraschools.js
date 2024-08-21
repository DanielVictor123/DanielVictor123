let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const video = document.getElementById('hoverVideo');

function showSlides() {
    slides.forEach((slide, index) => {
        slide.classList.remove('active'); // Remove active class from all slides
        if (index === slideIndex) {
            slide.classList.add('active'); // Add active class to the current slide
        }
    });
    slideIndex = (slideIndex + 1) % slides.length;
}

let slideInterval = setInterval(showSlides, 3000); // Change slide every 3 seconds

const slideshowContainer = document.querySelector('.slideshow-container');

slideshowContainer.addEventListener('mouseover', () => {
    clearInterval(slideInterval);
    video.style.display = 'block';
    video.play();
});

slideshowContainer.addEventListener('mouseout', () => {
    video.style.display = 'none';
    video.pause();
    slideInterval = setInterval(showSlides, 3000); // Restart slideshow
});

// Initial display
showSlides();




const facts = document.querySelectorAll('.fact');

// Function to animate the count up
function countUp(element) {
    const target = +element.dataset.target;
    let count = 0;
    const speed = Math.round(target / 25); // Increase speed based on target

    const updateCount = () => {
        count += speed;
        if (count < target) {
            element.textContent = count;
            setTimeout(updateCount, 50);
        } else {
            element.textContent = target;
        }
    };
    updateCount();
}

// Fade in animation and start counting
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            const countElement = entry.target.querySelector('.count');
            countUp(countElement);
            observer.unobserve(entry.target);
        }
    });
});

facts.forEach(fact => {
    observer.observe(fact);
});