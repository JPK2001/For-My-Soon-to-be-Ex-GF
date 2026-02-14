const config = window.VALENTINECONFIG;
document.title = config.pageTitle;

window.addEventListener('DOMContentLoaded', () => {

    document.getElementById('valentineTitle').textContent =
        `${config.valentineName}, my love...`;

    document.getElementById('question1Text').textContent =
        config.questions.first.text;
    document.getElementById('yesBtn1').textContent =
        config.questions.first.yesBtn;
    document.getElementById('noBtn1').textContent =
        config.questions.first.noBtn;
    document.getElementById('secretAnswerBtn').textContent =
        config.questions.first.secretAnswer;

    document.getElementById('question2Text').textContent =
        config.questions.second.text;
    document.getElementById('startText').textContent =
        config.questions.second.startText;
    document.getElementById('nextBtn').textContent =
        config.questions.second.nextBtn;

    document.getElementById('question3Text').textContent =
        config.questions.third.text;
    document.getElementById('yesBtn3').textContent =
        config.questions.third.yesBtn;
    document.getElementById('noBtn3').textContent =
        config.questions.third.noBtn;

    createFloatingElements();
    setupMusicPlayer();
    setupLoveMeter();
});

function createFloatingElements() {
    const container = document.querySelector('.floating-elements');

    [...config.floatingEmojis.hearts,
     ...config.floatingEmojis.bears].forEach(emoji => {
        const div = document.createElement('div');
        div.className = 'heart';
        div.innerHTML = emoji;
        div.style.left = Math.random() * 100 + 'vw';
        div.style.animationDelay = Math.random() * 5 + 's';
        div.style.animationDuration =
            (10 + Math.random() * 20) + 's';
        container.appendChild(div);
    });
}

function showNextQuestion(n) {
    document.querySelectorAll('.question-section')
        .forEach(q => q.classList.add('hidden'));
    document.getElementById(`question${n}`)
        .classList.remove('hidden');
}

function moveButton(btn) {
    btn.style.position = 'fixed';
    btn.style.left = Math.random() *
        (window.innerWidth - btn.offsetWidth) + 'px';
    btn.style.top = Math.random() *
        (window.innerHeight - btn.offsetHeight) + 'px';
}

function setupLoveMeter() {
    const meter = document.getElementById('loveMeter');
    const valueText = document.getElementById('loveValue');
    const extraLove = document.getElementById('extraLove');

    meter.addEventListener('input', () => {
        const value = parseInt(meter.value);
        valueText.textContent = value;

        if (value > 100) {
            extraLove.classList.remove('hidden');

            if (value >= 5000) {
                extraLove.textContent = config.loveMessages.extreme;
            } else if (value > 1000) {
                extraLove.textContent = config.loveMessages.high;
            } else {
                extraLove.textContent = config.loveMessages.normal;
            }
        } else {
            extraLove.classList.add('hidden');
        }
    });
}

function celebrate() {
    document.querySelectorAll('.question-section')
        .forEach(q => q.classList.add('hidden'));

    const c = document.getElementById('celebration');
    c.classList.remove('hidden');

    document.getElementById('celebrationTitle')
        .textContent = config.celebration.title;
    document.getElementById('celebrationMessage')
        .textContent = config.celebration.message;
    document.getElementById('celebrationEmojis')
        .textContent = config.celebration.emojis;
}

function setupMusicPlayer() {
    if (!config.music.enabled) return;

    const toggle = document.getElementById('musicToggle');
    const music = document.getElementById('bgMusic');
    const source = document.getElementById('musicSource');

    toggle.textContent = config.music.startText;
    source.src = config.music.musicUrl;
    music.volume = config.music.volume;
    music.load();

    toggle.addEventListener('click', () => {
        if (music.paused) {
            music.play();
            toggle.textContent = config.music.stopText;
        } else {
            music.pause();
            toggle.textContent = config.music.startText;
        }
    });
}
