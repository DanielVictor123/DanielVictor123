let slideIndex2 = 0;
const slides2 = document.querySelectorAll('.slide2');
const video2 = document.getElementById('hoverVideo2');

function showSlides() {
    slides2.forEach((slide2, index) => {
        slide2.classList.remove('active'); // Remove active class from all slides
        if (index === slideIndex) {
            slide2.classList.add('active'); // Add active class to the current slide
        }
    });
    slideIndex2 = (slideIndex + 1) % slides2.length;
}

let slideInterval2 = setInterval(showSlides, 3000); // Change slide every 3 seconds

const slideshowContainer2 = document.querySelector('.slideshow-container2');

slideshowContainer2.addEventListener('mouseover', () => {
    clearInterval(slideInterval2);
    video2.style.display = 'block';
    video2.play();
});

slideshowContainer2.addEventListener('mouseout', () => {
    video2.style.display = 'none';
    video2.pause();
    slideInterval2 = setInterval(showSlides, 3000); // Restart slideshow
});

// Initial display
showSlides();