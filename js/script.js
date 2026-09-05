// ========================================
// THEME TOGGLE (DARK / LIGHT MODE)
// ========================================

const themeToggle = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.innerHTML = "☀️";
} else {
    themeToggle.innerHTML = "🌙";
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        themeToggle.innerHTML = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        themeToggle.innerHTML = "🌙";
    }
});

// ========================================
// DYNAMIC TYPEWRITER / ROLE ROTATOR
// ========================================

const roles = [
    "Data Analyst & AI Enthusiast",
    "IT Administrator",
    "Computer Vision & NLP Developer",
    "Digital & Resume Strategist"
];

const roleElement = document.getElementById("typewriter-role");
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeWriterEffect() {
    if (!roleElement) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
        roleElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 45;
    } else {
        roleElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 95;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2200; // Pause at end of text
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 400; // Pause before typing next
    }

    setTimeout(typeWriterEffect, typeSpeed);
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeWriterEffect, 600);
});

// ========================================
// ACTIVE NAVBAR & SMOOTH SCROLL
// ========================================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");
const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
    let current = "";
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 140;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });

    // Back to top visibility
    if (backToTopBtn) {
        if (scrollY > 350) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// ========================================
// IMAGE MODAL LIGHTBOX (CERTIFICATE & DOCS)
// ========================================

const certModal = document.getElementById("cert-modal");
const certModalImg = certModal ? certModal.querySelector(".cert-modal-img") : null;
const closeCertBtn = document.getElementById("close-cert-modal");
const openCertBtn = document.getElementById("btn-preview-cert");

function openLightbox(imgSrc, imgAlt) {
    if (certModal && certModalImg) {
        certModalImg.src = imgSrc || "assets/certificate_sentik.jpg";
        certModalImg.alt = imgAlt || "Dokumentasi & Sertifikat SeNTIK 2026";
        certModal.classList.add("active");
        document.body.style.overflow = "hidden"; // prevent background scroll
    }
}

function closeLightbox() {
    if (certModal) {
        certModal.classList.remove("active");
        document.body.style.overflow = "auto";
    }
}

// Bind all clickable triggers
document.querySelectorAll(".previewable-trigger").forEach(trigger => {
    trigger.addEventListener("click", () => {
        const src = trigger.getAttribute("data-img-src");
        const alt = trigger.getAttribute("data-img-alt");
        openLightbox(src, alt);
    });
});

if (openCertBtn) {
    openCertBtn.addEventListener("click", () => {
        openLightbox("assets/certificate_sentik.jpg", "Sertifikat Penyaji SeNTIK 2026");
    });
}

if (closeCertBtn) closeCertBtn.addEventListener("click", closeLightbox);

if (certModal) {
    certModal.addEventListener("click", (e) => {
        if (e.target === certModal) {
            closeLightbox();
        }
    });
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && certModal && certModal.classList.contains("active")) {
        closeLightbox();
    }
});

// ========================================
// INTERSECTION OBSERVER FOR REVEAL ANIMATIONS
// ========================================

const revealElements = document.querySelectorAll(
    ".snapshot-card, .about-card, .education-card, .strengths-pill-box, .featured-project-box, .project-card-balanced, .cert-card-left, .doc-card-right, .experience-summary-card, .timeline-item, .why-card, .skill-category-card, .contact-card-left, .contact-item, .social-links-box"
);

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.08,
    rootMargin: "0px 0px -30px 0px"
});

revealElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(22px)";
    el.style.transition = "opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1), transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
    revealObserver.observe(el);
});

// ========================================
// CONSOLE BRANDING
// ========================================

console.log(
    "%cAyu Nalarati • Portfolio Website 🚀",
    "color:#84CC16;font-size:18px;font-weight:bold;padding:6px 0;"
);