// ============================================
// 💝 CUSTOMIZE YOUR VALENTINE'S WEBSITE HERE 💝
// ============================================

const CONFIG = {
    valentineName: "DEBORAH... Cara Mia",

    pageTitle: "Will You Be My Valentineee? 💝",

    floatingEmojis: {
        hearts: ['❤️', '💖', '💝', '💗', '💓'],
        bears: ['🧸', '🐻']
    },

    questions: {
        first: {
            text: "Do you like me?",
            yesBtn: "Yes",
            noBtn: "Hell Nah!",
            secretAnswer: "I don't like you, I LOVE YOU!!! ❤️"
        },
        second: {
            text: "How much do you love me?",
            startText: "This much!",
            nextBtn: "Next ❤️"
        },
        third: {
            text: "Will you be my Valentine on February 15th, 2026? 🌹",
            yesBtn: "Yes!",
            noBtn: "Nooooo..."
        }
    },

    loveMessages: {
        extreme: "Dammmnnnn!!! That Much !!?? 🥰🚀💝",
        high: "To infinity and Beyonddd! 🚀💝",
        normal: "And BEYOND! 🥰"
    },

    celebration: {
        title: "Yayyy! I'm the luckiest guy in the worlddd! 💖",
        message: "HAPPY VALENTINE'S DAY TO MY BABYGIRL 🚀",
        emojis: "🎁💖🤗💝💋❤️💕"
    },

    // 💘 PREMIUM ROMANTIC THEME
    colors: {
        backgroundStart: "#ff4e8a",
        backgroundEnd: "#ff9a9e",
        buttonBackground: "#d63384",
        buttonHover: "#e649a1",
        textColor: "#b3125d"
    },

    animations: {
        floatDuration: "15s",
        floatDistance: "60px",
        bounceSpeed: "0.5s",
        heartExplosionSize: 1.8
    },

    music: {
        enabled: true,
        autoplay: false, // safer for browsers
        musicUrl: "https://res.cloudinary.com/dwtshskdx/video/upload/v1771042822/die-with-a-smile-official-music-videoerqzgz.mp3",
        startText: "🎵 Play Music",
        stopText: "🔇 Stop Music",
        volume: 0.7
    }
};

window.VALENTINECONFIG = CONFIG;
