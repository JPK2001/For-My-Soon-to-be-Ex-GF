const config = window.VALENTINECONFIG;

// Page Setup
function validateConfig() {
    const warnings = [];
    if (!config.valentineName) config.valentineName = "My Love";
    const isValidHex = hex => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
    Object.entries(config.colors).forEach(([key, value]) => {
        if (!isValidHex(value)) config.colors[key] = "#ff4757";
    });
    if (parseFloat(config.animations.floatDuration) < 5) config.animations.floatDuration = "5s";
    if (config.animations.heartExplosionSize < 1 || config.animations.heartExplosionSize > 3) config.animations.heartExplosionSize = 1.5;
}

document.title = config.pageTitle;

window.addEventListener('DOMContentLoaded', () => {
    validateConfig();

    // Texts
    document.getElementById('valentineTitle').textContent = `${config.valentineName}, my love...`;
    document.getElementById('question1Text').textContent = config.questions.first.text;
    document.getElementById('yesBtn1').textContent = config.questions.first.yesBtn;
    document.getElementById('noBtn1').textContent = config.questions.first.noBtn;
    document.getElementById('secretAnswerBtn').textContent = config.questions.first.secretAnswer;

    document.getElementById('question2Text').textContent = config.questions.second.text;
    document.getElementById('startText').textContent = config.questions.second.startText;
    document.getElementById('nextBtn').textContent = config.questions.second.nextBtn;

    document.getElementById('question3Text').textContent = config.questions.third.text;
    document.getElementById('yesBtn3').textContent = config.questions.third.yesBtn;
    document.getElementById('noBtn3').textContent = config.questions.third.noBtn;

    createFloatingElements();
    setupMusicPlayer();
});

// Floating Hearts/Bears
function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    [...config.floatingEmojis.hearts, ...config.floatingEmojis.bears].forEach(emoji => {
        const div = document.createElement('div');
        div.className = config.floatingEmojis.hearts.includes(emoji) ? 'heart' : 'bear';
        div.innerHTML = emoji;
        setRandomPosition(div);
        container.appendChild(div);
    });
}
function setRandomPosition(el) {
    el.style.left = Math.random() * 100 + 'vw';
    el.style.animationDelay = Math.random() * 5 + 's';
    el.style.animationDuration = 10 + Math.random() * 20 + 's';
}

// Question Navigation
function showNextQuestion(num) {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    document.getElementById(`question${num}`).classList.remove('hidden');
}
function moveButton(btn) {
    const x = Math.random() * (window.innerWidth - btn.offsetWidth);
    const y = Math.random() * (window.innerHeight - btn.offsetHeight);
    btn.style.position = 'fixed';
    btn.style.left = x + 'px';
    btn.style.top = y + 'px';
}

// Love Meter
const loveMeter = document.getElementById('loveMeter');
const loveValue = document.getElementById('loveValue');
const extraLove = document.getElementById('extraLove');

function setInitialPosition() {
    loveMeter.value = 100;
    loveValue.textContent = 100;
}
loveMeter.addEventListener('input', () => {
    const value = parseInt(loveMeter.value);
    loveValue.textContent = value;

    if (value > 100) {
        extraLove.classList.remove('hidden');
        if (value >= 5000) extraLove.textContent = config.loveMessages.extreme;
        else if (value > 1000) extraLove.textContent = config.loveMessages.high;
        else extraLove.textContent = config.loveMessages.normal;
    } else {
        extraLove.classList.add('hidden');
    }
});
window.addEventListener('DOMContentLoaded', setInitialPosition);
window.addEventListener('load', setInitialPosition);

// Celebration
function celebrate() {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    const celebration = document.getElementById('celebration');
    celebration.classList.remove('hidden');

    document.getElementById('celebrationTitle').textContent = config.celebration.title;
    document.getElementById('celebrationMessage').textContent = config.celebration.message;
    document.getElementById('celebrationEmojis').textContent = config.celebration.emojis;

    createHeartExplosion();
}
function createHeartExplosion() {
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = config.floatingEmojis.hearts[Math.floor(Math.random() * config.floatingEmojis.hearts.length)];
        document.querySelector('.floating-elements').appendChild(heart);
        setRandomPosition(heart);
    }
}

// Music Setup
function setupMusicPlayer() {
    if (!config.music.enabled) return;

    const bgMusic = document.getElementById('bgMusic');
    const musicSource = document.getElementById('musicSource');
    const musicToggle = document.getElementById('musicToggle');
    document.getElementById('musicControls').style.display = 'block';

    musicSource.src = config.music.musicUrl;
    bgMusic.volume = config.music.volume || 0.5;
    bgMusic.currentTime = config.music.skipSeconds || 0;
    bgMusic.load();

    if (config.music.autoplay) {
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) playPromise.catch(() => {
            musicToggle.textContent = config.music.startText;
        });
    }
    musicToggle.textContent = config.music.autoplay ? config.music.stopText : config.music.startText;

    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = config.music.stopText;
        } else {
            bgMusic.pause();
            musicToggle.textContent = config.music.startText;
        }
    });
}
