const bgMusic = document.getElementById("bgMusic");
const enableMusicBtn = document.getElementById("enableMusic");
const toggleSongBtn = document.getElementById("toggleSong");

let currentSong = 1;

// Show hidden love message
function showMessage() {
    document.getElementById("hiddenMessage").style.display = "block";
}

// Try autoplay
window.addEventListener("load", () => {
    const playPromise = bgMusic.play();

    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                enableMusicBtn.style.display = "none";
            })
            .catch(() => {
                enableMusicBtn.style.display = "inline-block";
            });
    }
});

// Enable music manually
enableMusicBtn.addEventListener("click", () => {
    bgMusic.play();
    enableMusicBtn.style.display = "none";
});

// Switch between songs
toggleSongBtn.addEventListener("click", () => {
    if (currentSong === 1) {
        bgMusic.src = "candy-clip-officiel.mp3";
        currentSong = 2;
    } else {
        bgMusic.src = "die-with-a-smile-official-music-video.mp3";
        currentSong = 1;
    }
    bgMusic.play();
});
