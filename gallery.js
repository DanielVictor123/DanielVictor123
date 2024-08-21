function filterGallery(category) {
    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function openModal(src) {
    const modal = document.getElementById("myModal");
    const modalImage = document.getElementById("modalImage");
    modal.style.display = "flex";
    modalImage.src = src;
    // Ensure the image is centered and properly sized
    modalImage.style.width = "auto";
    modalImage.style.height = "auto";
}

function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}
