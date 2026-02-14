// ================================
// Enhanced theme.js for Valentine's Webapp
// ================================

// Apply theme based on config
function applyTheme() {
    const config = window.VALENTINECONFIG;
    const root = document.documentElement;

    // Apply colors
    root.style.setProperty('--background-color-1', config.colors.backgroundStart);
    root.style.setProperty('--background-color-2', config.colors.backgroundEnd);
    root.style.setProperty('--button-color', config.colors.buttonBackground);
    root.style.setProperty('--button-hover', config.colors.buttonHover);
    root.style.setProperty('--text-color', config.colors.textColor);

    // Apply animation settings
    root.style.setProperty('--float-duration', config.animations.floatDuration);
    root.style.setProperty('--float-distance', config.animations.floatDistance);
    root.style.setProperty('--bounce-speed', config.animations.bounceSpeed);
    root.style.setProperty('--heart-explosion-size', config.animations.heartExplosionSize);

    // Mobile-friendly adjustments
    if (window.innerWidth <= 480) {
        root.style.setProperty('--float-distance', '30px');  // smaller float distance on mobile
        root.style.setProperty('--heart-explosion-size', config.animations.heartExplosionSize * 0.8);
        root.style.setProperty('--bounce-speed', (parseFloat(config.animations.bounceSpeed) * 1.2) + 's');
    }

    // Smooth gradient for background
    document.body.style.background = `linear-gradient(135deg, ${config.colors.backgroundStart}, ${config.colors.backgroundEnd})`;
}

// Reapply theme on resize (mobile/desktop switching)
window.addEventListener('resize', applyTheme);

// Apply theme when DOM loads
window.addEventListener('DOMContentLoaded', applyTheme);
