/*const video = document.querySelector("#profilVideo");
const section =document.querySelector("#profil");
video.addEventListener("loadedmetadata", () => {
    window.addEventListener("scroll", ()=> {
        const section = document.querySelector("#profil");
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const scroll = window.scrollY;

        let progress= (scroll - sectionTop) / (sectionHeight - window.innerHeight);
        progress = Math.max(0, Math.min(1, progress));
        video.currentTime = progress * video.duration;
    });
});*/
const video = document.querySelector("#profilVideo");
const section = document.querySelector("#profil");

let targetTime = 0;
let currentTime = 0;
let ticking = false;

video.pause();
video.muted = true;
video.preload = "auto";

function updateTargetTime() {
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const sectionHeight = section.offsetHeight;
    const scroll = window.scrollY;

    let progress =
        (scroll - sectionTop) /
        (sectionHeight - window.innerHeight);

    progress = Math.max(0, Math.min(1, progress));

    targetTime = progress * video.duration;

    if (!ticking) {
        ticking = true;
        requestAnimationFrame(smoothVideo);
    }
}

function smoothVideo() {
    // Plus petit = plus doux
    const smoothing = 0.12;

    currentTime += (targetTime - currentTime) * smoothing;

    if (Math.abs(targetTime - currentTime) < 0.01) {
        currentTime = targetTime;
    }

    if (video.readyState >= 2) {
        video.currentTime = currentTime;
    }

    if (Math.abs(targetTime - currentTime) > 0.01) {
        requestAnimationFrame(smoothVideo);
    } else {
        ticking = false;
    }
}

window.addEventListener("scroll", updateTargetTime, {
    passive: true
});

window.addEventListener("resize", updateTargetTime);

video.addEventListener("loadedmetadata", () => {
    updateTargetTime();
});
