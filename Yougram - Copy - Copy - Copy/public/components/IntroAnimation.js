class IntroAnimation {
    constructor() {
        this.hideContent();
        this.createIntro();
    }

    hideContent() {
        const mainContent = document.querySelector('body > *:not(script)');
        mainContent.style.opacity = '0';
        mainContent.style.visibility = 'hidden';
    }

    createIntro() {
        const intro = document.createElement('div');
        intro.className = 'intro-container';
        intro.innerHTML = `
            <div class="intro-background">
                <div class="stars"></div>
                <div class="grid-overlay"></div>
            </div>
            <div class="logo-container">
                <div class="logo-wrapper">
                    <span class="you">You</span>
                    <span class="gram">Gram</span>
                </div>
            </div>
        `;
        document.body.appendChild(intro);

        setTimeout(() => {
            intro.classList.add('fade-out');
            setTimeout(() => {
                intro.remove();
                this.showContent();
            }, 300);
        }, 2500);
    }

    showContent() {
        const mainContent = document.querySelector('body > *:not(script)');
        mainContent.style.opacity = '1';
        mainContent.style.visibility = 'visible';
        mainContent.classList.add('fade-in');
    }
} 