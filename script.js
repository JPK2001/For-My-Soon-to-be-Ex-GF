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
        config.animations.heartEx
