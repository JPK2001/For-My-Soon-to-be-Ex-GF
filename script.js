const bgMusic = document.getElementById("bgMusic");
const enableMusicBtn = document.getElementById("enableMusic");
const toggleSongBtn = document.getElementById("toggleSong");
const loveBtn = document.getElementById("loveBtn");

let currentSong = 1;

// Show hidden message
loveBtn.addEventListener("click", () => {
    document.getElementById("hiddenMessage").style.display = "block";
});

// Function to start song at 15 seconds
function startSongAt15Seconds() {
    bgMusic.currentTime = 15;
    bgMusic.play();
}

// Try autoplay
window.addEventListener("load", () => {
    const playPromise = bgMusic.play();

    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                bgMusic.currentTime = 15;
                enableMusicBtn.style.display = "none";
            })
            .catch(() => {
                enableMusicBtn.style.display = "inline-block";
            });
    }
});

// Manual enable
enableMusicBtn.addEventListener("click", () => {
    startSongAt15Seconds();
    enableMusicBtn.style.display = "none";
});

// Switch songs and skip 15 seconds
toggleSongBtn.addEventListener("click", () => {
    if (currentSong === 1) {
        bgMusic.src = "candy-clip-officiel.mp3";
        currentSong = 2;
    } else {
        bgMusic.src = "die-with-a-smile-official-music-video.mp3";
        currentSong = 1;
    }

    bgMusic.addEventListener("loadedmetadata", function handler() {
        bgMusic.currentTime = 15;
        bgMusic.play();
        bgMusic.removeEventListener("loadedmetadata", handler);
    });
});
