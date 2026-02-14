// ================================
// Enhanced script.js for Valentine's Webapp
// ================================

// Initialize configuration
const config = window.VALENTINECONFIG;

// Track list for music
const tracks = [
    { url: "candy-clip-officiel.mp3", name: "Candy Clip" },
    { url: "die-with-a-smile-official-music-video.mp3", name: "Die With a Smile" }
];
let currentTrackIndex = 0;

// DOM elements
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const musicNext = document.getElementById("musicNext");
const floatingContainer = document.querySelector(".floating-elements");
const loveMeter = document.getElementById("loveMeter");
const loveValue = document.getElementById("loveValue");
const extraLove = document.getElementById("extraLove");

// ================================
// Validate config
// ================================
function validateConfig() {
    const warnings = [];
    if (!config.valentineName) { config.valentineName = "My Love"; }
    const isValidHex = hex => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
    Object.entries(config.colors).forEach(([k,v]) => {
        if(!isValidHex(v)){ config.colors[k] = "#ff6b6b"; warnings.push(`Invalid color ${k}`); }
    });
    if (parseFloat(config.animations.floatDuration) < 5) { config.animations.floatDuration = "5s"; }
    if (config.animations.heartExplosionSize < 1 || config.animations.heartExplosionSize > 3) {
        config.animations.heartExplosionSize = 1.5;
    }
    if (warnings.length) console.warn("Config Warnings:", warnings);
}

// ================================
// Initialize page
// ================================
window.addEventListener("DOMContentLoaded", () => {
    validateConfig();

    document.title = config.pageTitle;
    document.getElementById("valentineTitle").textContent = `${config.valentineName}, my love...`;

    // First Question
    document.getElementById("question1Text").textContent = config.questions.first.text;
    document.getElementById("yesBtn1").textContent = config.questions.first.yesBtn;
    document.getElementById("noBtn1").textContent = config.questions.first.noBtn;
    document.getElementById("secretAnswerBtn").textContent = config.questions.first.secretAnswer;

    // Second Question
    document.getElementById("question2Text").textContent = config.questions.second.text;
    document.getElementById("startText").textContent = config.questions.second.startText;
    document.getElementById("nextBtn").textContent = config.questions.second.nextBtn;

    // Third Question
    document.getElementById("question3Text").textContent = config.questions.third.text;
    document.getElementById("yesBtn3").textContent = config.questions.third.yesBtn;
    document.getElementById("noBtn3").textContent = config.questions.third.noBtn;

    // Create floating elements
    createFloatingElements();

    // Setup music
    setupMusic();

    // Setup cursor hearts
    setupCursorHearts();

    // Initialize love meter
    setInitialLoveMeter();
});

// ================================
// Floating elements (hearts & bears)
// ================================
function createFloatingElements() {
    const allEmojis = [...config.floatingEmojis.hearts, ...config.floatingEmojis.bears];
    allEmojis.forEach(emoji => {
        const div = document.createElement("div");
        div.className = config.floatingEmojis.hearts.includes(emoji) ? "heart" : "bear";
        div.innerHTML = emoji;
        setRandomPosition(div);
        floatingContainer.appendChild(div);
    });
}

function setRandomPosition(element) {
    element.style.left = Math.random() * 100 + "vw";
    element.style.top = Math.random() * 100 + "vh";
    element.style.animationDelay = Math.random() * 5 + "s";
    element.style.animationDuration = 10 + Math.random() * 20 + "s";
}

// ================================
// Cursor-following hearts
// ================================
function setupCursorHearts() {
    document.addEventListener("mousemove", e => {
        createHeartAt(e.clientX, e.clientY);
    });
    document.addEventListener("touchmove", e => {
        const touch = e.touches[0];
        createHeartAt(touch.clientX, touch.clientY);
    });
}

function createHeartAt(x, y) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.style.position = "fixed";
    heart.style.left = x + "px";
    heart.style.top = y + "px";
    heart.style.fontSize = "1.5rem";
    heart.innerHTML = config.floatingEmojis.hearts[Math.floor(Math.random() * config.floatingEmojis.hearts.length)];
    floatingContainer.appendChild(heart);

    setTimeout(() => { heart.remove(); }, 2000);
}

// ================================
// Questions navigation
// ================================
function showNextQuestion(num) {
    document.querySelectorAll(".question-section").forEach(q => q.classList.add("hidden"));
    document.getElementById(`question${num}`).classList.remove("hidden");
}

function moveButton(button) {
    const x = Math.random() * (window.innerWidth - button.offsetWidth);
    const y = Math.random() * (window.innerHeight - button.offsetHeight);
    button.style.position = "fixed";
    button.style.left = x + "px";
    button.style.top = y + "px";
}

// ================================
// Love meter
// ================================
function setInitialLoveMeter() {
    loveMeter.value = 100;
    loveValue.textContent = 100;
}

loveMeter.addEventListener("input", () => {
    const value = parseInt(loveMeter.value);
    loveValue.textContent = value;

    if (value > 100) {
        extraLove.classList.remove("hidden");
        if (value >= 5000) extraLove.textContent = config.loveMessages.extreme;
        else if (value > 1000) extraLove.textContent = config.loveMessages.high;
        else extraLove.textContent = config.loveMessages.normal;
    } else {
        extraLove.classList.add("hidden");
    }
});

// ================================
// Celebration
// ================================
function celebrate() {
    document.querySelectorAll(".question-section").forEach(q => q.classList.add("hidden"));
    const celebration = document.getElementById("celebration");
    celebration.classList.remove("hidden");

    document.getElementById("celebrationTitle").textContent = config.celebration.title;
    document.getElementById("celebrationMessage").textContent = config.celebration.message;
    document.getElementById("celebrationEmojis").textContent = config.celebration.emojis;

    // Heart explosion
    for (let i = 0; i < 50; i++) {
        const h = document.createElement("div");
        h.className = "heart";
        h.innerHTML = config.floatingEmojis.hearts[Math.floor(Math.random() * config.floatingEmojis.hearts.length)];
        setRandomPosition(h);
        floatingContainer.appendChild(h);
        setTimeout(() => h.remove(), 5000);
    }
}

// ================================
// Music controls
// ================================
function setupMusic() {
    if (!config.music.enabled) return;

    loadTrack(currentTrackIndex);

    musicToggle.addEventListener("click", () => {
        if (bgMusic.paused) bgMusic.play();
        else bgMusic.pause();
    });

    musicNext.addEventListener("click", () => {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        loadTrack(currentTrackIndex);
        bgMusic.play();
    });

    // Update button text
    bgMusic.addEventListener("play", () => { musicToggle.textContent = "🔊 Pause"; });
    bgMusic.addEventListener("pause", () => { musicToggle.textContent = "🎵 Play"; });
}

function loadTrack(index) {
    bgMusic.src = tracks[index].url;
    bgMusic.currentTime = 10; // skip first 10 seconds
    bgMusic.load();
}
