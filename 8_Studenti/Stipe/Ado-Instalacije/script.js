// NAVBAR SCROLL
window.addEventListener("scroll", () => {
    document.querySelector(".navbar")
        .classList.toggle("scrolled", window.scrollY > 50);
});

// HAMBURGER
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

// LIGHTBOX
const images = document.querySelectorAll(".gallery-img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let currentIndex = 0;

images.forEach((img, index) => {
    img.addEventListener("click", () => {
        currentIndex = index;
        openLightbox();
    });
});

function openLightbox() {
    lightbox.style.display = "flex";
    lightboxImg.src = images[currentIndex].src;
}

function closeLightbox() {
    lightbox.style.display = "none";
}

nextBtn.onclick = () => {
    currentIndex = (currentIndex + 1) % images.length;
    openLightbox();
};

prevBtn.onclick = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    openLightbox();
};

closeBtn.onclick = closeLightbox;

document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeLightbox();
});

document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".partners-track");
    if (!track) return;

    // Dupliranje slika za beskonačni scroll
    track.innerHTML += track.innerHTML;
});

// Zatvori hamburger klikom izvan menija
document.addEventListener("click", (e) => {
    const isClickInsideMenu = navMenu.contains(e.target);
    const isClickOnHamburger = hamburger.contains(e.target);

    if (!isClickInsideMenu && !isClickOnHamburger) {
        navMenu.classList.remove("active");
    }
});

