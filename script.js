const bgMusic = document.getElementById("bgMusic");
const enableMusicBtn = document.getElementById("enableMusic");
const toggleSongBtn = document.getElementById("toggleSong");
const volumeControl = document.getElementById("volumeControl");

let currentSong = 1;

/* Section Navigation */
function showSection(id) {
    document.querySelectorAll(".section").forEach(sec => {
        sec.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");
}

/* Reveal Message */
function revealMessage() {
    document.getElementById("hiddenMessage").style.display = "block";
}

/* Fade In Audio */
function fadeInAudio() {
    bgMusic.volume = 0;
    let fade = setInterval(() => {
        if (bgMusic.volume < 1) {
            bgMusic.volume += MUSIC_CONFIG.fadeSpeed;
        } else {
            clearInterval(fade);
        }
    }, 100);
}

/* Start Music at 15s */
function startMusic() {
    bgMusic.currentTime = MUSIC_CONFIG.startTime;
    bgMusic.play();
    fadeInAudio();
}

/* Enable Music */
enableMusicBtn.addEventListener("click", () => {
    startMusic();
});

/* Switch Songs */
toggleSongBtn.addEventListener("click", () => {
    bgMusic.pause();

    if (currentSong === 1) {
        bgMusic.src = MUSIC_CONFIG.secondSong;
        currentSong = 2;
    } else {
        bgMusic.src = MUSIC_CONFIG.firstSong;
        currentSong = 1;
    }

    bgMusic.addEventListener("loadedmetadata", function handler() {
        startMusic();
        bgMusic.removeEventListener("loadedmetadata", handler);
    });
});

/* Volume Control */
volumeControl.addEventListener("input", () => {
    bgMusic.volume = volumeControl.value;
});

/* Floating Hearts Generator */
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (3 + Math.random() * 5) + "s";
    document.querySelector(".hearts-container").appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 8000);
}

setInterval(createHeart, 500);
