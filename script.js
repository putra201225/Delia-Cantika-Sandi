// =========================
// ELEMENT
// =========================

const number = document.getElementById("number");
const hero = document.getElementById("hero");
const startBtn = document.getElementById("startBtn");
const music = document.getElementById("bgMusic");
const loveBtn = document.getElementById("loveBtn");
const slider = document.querySelector(".slider");
const typing = document.getElementById("typing");

// Hero disembunyikan dulu
hero.style.display = "none";

// =========================
// COUNTDOWN
// =========================

let count = 3;

const countdown = setInterval(() => {
    number.textContent = count;
    count--;

    if (count < 0) {
        clearInterval(countdown);
        document.getElementById("countdown").style.display = "none";
        hero.style.display = "flex";
    }
}, 1000);

// =========================
// MUSIC
// =========================

// Tombol mulai
startBtn.addEventListener("click", () => {
    music.play().catch(err => console.log(err));

    hero.scrollIntoView({
        behavior: "smooth"
    });
});

// Backup supaya HP tetap bisa memutar musik
function playMusic() {
    music.play().catch(() => {});
}

document.addEventListener("click", playMusic, { once: true });
document.addEventListener("touchstart", playMusic, { once: true });

// =========================
// AUTO SLIDE
// =========================

let autoSlide = 0;

setInterval(() => {

    if (!slider) return;

    autoSlide += 345;

    if (autoSlide >= slider.scrollWidth) {
        autoSlide = 0;
    }

    slider.scrollTo({
        left: autoSlide,
        behavior: "smooth"
    });

}, 2500);

// =========================
// TYPE WRITER
// =========================

if (typing) {

    const text = typing.textContent;

    typing.textContent = "";

    let i = 0;

    function write() {

        if (i < text.length) {

            typing.textContent += text.charAt(i);

            i++;

            setTimeout(write, 40);

        }

    }

    setTimeout(write, 4000);

}

// =========================
// CONFETTI
// =========================

if (loveBtn) {

    loveBtn.addEventListener("click", () => {

        confetti({
            particleCount: 300,
            spread: 180,
            origin: { y: 0.6 }
        });

    });

}

// =========================
// SCROLL ANIMATION
// =========================

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

});

document.querySelectorAll("section").forEach(section => {

    section.style.opacity = "0";
    section.style.transform = "translateY(100px)";
    section.style.transition = ".8s";

    observer.observe(section);

});

// =========================
// RANDOM HEARTS
// =========================

function createHeart() {

    const heart = document.createElement("div");

    heart.innerHTML = "💖";

    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "100vh";
    heart.style.fontSize = (20 + Math.random() * 20) + "px";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "999";

    document.body.appendChild(heart);

    let pos = 100;

    const fly = setInterval(() => {

        pos--;

        heart.style.top = pos + "vh";

        if (pos < -10) {

            clearInterval(fly);

            heart.remove();

        }

    }, 30);

}

setInterval(createHeart, 500);

// =========================
// BUTTON EFFECT
// =========================

document.querySelectorAll("button").forEach(btn => {

    btn.addEventListener("mouseenter", () => {
        btn.style.transform = "scale(1.1)";
    });

    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "scale(1)";
    });

});