document.addEventListener("DOMContentLoaded", () => {
    const thumbnails = document.querySelectorAll(".thumbnail");
    const modal = document.getElementById("modal");
    const fullImage = document.getElementById("fullImage");
    const caption = document.getElementById("caption");
    const closeModal = document.getElementById("closeModal");
    const closeButton = document.getElementById("closeButton");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");

    let currentIndex = 0;

    function showModal(index) {
        currentIndex = index;
        const selectedThumbnail = thumbnails[currentIndex];
        const fullImageSrc = selectedThumbnail.querySelector("img").src.replace("-thumbnail", "");
        fullImage.src = fullImageSrc;
        caption.textContent = selectedThumbnail.dataset.caption;
        modal.style.display = "flex";
        preloadImages(currentIndex);
    }

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener("click", () => showModal(index));
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    prevButton.addEventListener("click", () => navigate(-1));
    nextButton.addEventListener("click", () => navigate(1));

    function navigate(direction) {
        currentIndex = (currentIndex + direction + thumbnails.length) % thumbnails.length;
        showModal(currentIndex);
    }

    function preloadImages(index) {
        const preloadIndices = [
            (index + 1) % thumbnails.length,
            (index - 1 + thumbnails.length) % thumbnails.length,
        ];
        preloadIndices.forEach(i => {
            const imgSrc = thumbnails[i].querySelector("img").src.replace("-thumbnail", "");
            const img = new Image();
            img.src = imgSrc;
        });
    }

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") navigate(-1);
        else if (e.key === "ArrowRight") navigate(1);
        else if (e.key === "Escape") modal.style.display = "none";
    });
});
