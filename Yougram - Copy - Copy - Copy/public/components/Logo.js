class Logo {
    constructor(container) {
        this.container = container;
        this.stories = [
            { username: 'Emma Watson', time: '2h ago', avatar: 'https://picsum.photos/seed/1/40/40' },
            { username: 'Chris Evans', time: '3h ago', avatar: 'https://picsum.photos/seed/2/40/40' },
            { username: 'Scarlett Johansson', time: '4h ago', avatar: 'https://picsum.photos/seed/3/40/40' },
            { username: 'Robert Downey Jr', time: '5h ago', avatar: 'https://picsum.photos/seed/4/40/40' },
            { username: 'Tom Holland', time: '6h ago', avatar: 'https://picsum.photos/seed/5/40/40' },
            { username: 'Zendaya', time: '7h ago', avatar: 'https://picsum.photos/seed/6/40/40' },
            { username: 'Mark Ruffalo', time: '8h ago', avatar: 'https://picsum.photos/seed/7/40/40' },
            { username: 'Elizabeth Olsen', time: '9h ago', avatar: 'https://picsum.photos/seed/8/40/40' },
            { username: 'Tom Hiddleston', time: '10h ago', avatar: 'https://picsum.photos/seed/9/40/40' },
            { username: 'Benedict Cumberbatch', time: '11h ago', avatar: 'https://picsum.photos/seed/10/40/40' }
        ];
        this.render();
        this.initializeStateManagement();
        this.initializeEventListeners();
        this.initializeGlowEffects();
    }

    render() {
        this.container.innerHTML = `
            <div class="logo">
                <div class="logo-text">
                    <span class="you">You</span><span class="gram">Gram</span>
                </div>
                <button class="story-trigger">
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="story-popup">
                    <div class="story-header">
                        <h3>Stories</h3>
                        <span class="story-count">10 new</span>
                    </div>
                    <div class="story-list">
                        ${this.stories.map(story => `
                            <div class="story-item">
                                <div class="story-avatar">
                                    <img src="${story.avatar}" alt="${story.username}">
                                </div>
                                <div class="story-info">
                                    <span class="story-username">${story.username}</span>
                                    <span class="story-time">${story.time}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    initializeStateManagement() {
        this.youElement = this.container.querySelector('.you');
        this.gramElement = this.container.querySelector('.gram');
        this.currentState = 'you'; // Default state
    }

    toggleLogoState(isGramActive) {
        if (isGramActive) {
            // Premium gram state with enhanced glow
            this.youElement.style.cssText = `
                color: #666;
                opacity: 0.3;
                text-shadow: none;
                filter: none;
                transform: scale(0.95);
                transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
            `;
            
            this.gramElement.style.cssText = `
                color: var(--glow-purple);
                opacity: 1;
                text-shadow: 
                    0 0 10px rgba(167, 139, 250, 0.4),
                    0 0 20px rgba(167, 139, 250, 0.4),
                    0 0 30px rgba(167, 139, 250, 0.3),
                    0 0 40px rgba(167, 139, 250, 0.2),
                    0 0 50px rgba(167, 139, 250, 0.1),
                    0 0 60px rgba(167, 139, 250, 0.05);
                filter: brightness(1.4) contrast(1.1);
                transform: scale(1.05);
                font-weight: 600;
                letter-spacing: 0.2px;
                transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
                animation: subtle-pulse 2s ease-in-out infinite;
            `;
        } else {
            // Premium you state with enhanced glow
            this.youElement.style.cssText = `
                color: var(--glow-purple);
                opacity: 1;
                text-shadow: 
                    0 0 10px rgba(167, 139, 250, 0.4),
                    0 0 20px rgba(167, 139, 250, 0.4),
                    0 0 30px rgba(167, 139, 250, 0.3),
                    0 0 40px rgba(167, 139, 250, 0.2),
                    0 0 50px rgba(167, 139, 250, 0.1),
                    0 0 60px rgba(167, 139, 250, 0.05);
                filter: brightness(1.4) contrast(1.1);
                transform: scale(1.05);
                font-weight: 600;
                letter-spacing: 0.2px;
                transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
                animation: subtle-pulse 2s ease-in-out infinite;
            `;
            
            this.gramElement.style.cssText = `
                color: #666;
                opacity: 0.3;
                text-shadow: none;
                filter: none;
                transform: scale(0.95);
                transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
            `;
        }
    }

    initializeEventListeners() {
        const trigger = this.container.querySelector('.story-trigger');
        const popup = this.container.querySelector('.story-popup');
        let isClicked = false;

        // Hover functionality
        trigger.addEventListener('mouseenter', () => {
            popup.classList.add('active');
            trigger.classList.add('active');
            this.toggleLogoState(true); // Switch to gram state on hover
        });

        popup.addEventListener('mouseenter', () => {
            popup.classList.add('active');
            trigger.classList.add('active');
            this.toggleLogoState(true);
        });

        trigger.addEventListener('mouseleave', (e) => {
            if (!isClicked) {
                const rect = popup.getBoundingClientRect();
                const isOverPopup = e.clientX >= rect.left && 
                                  e.clientX <= rect.right && 
                                  e.clientY >= rect.top && 
                                  e.clientY <= rect.bottom;
                
                if (!isOverPopup) {
                    popup.classList.remove('active');
                    trigger.classList.remove('active');
                    this.toggleLogoState(false); // Switch back to you state
                }
            }
        });

        popup.addEventListener('mouseleave', () => {
            if (!isClicked) {
                popup.classList.remove('active');
                trigger.classList.remove('active');
                this.toggleLogoState(false);
            }
        });

        // Click functionality
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            isClicked = !isClicked;
            
            if (isClicked) {
                popup.classList.add('active');
                trigger.classList.add('active');
                this.toggleLogoState(true);
            } else {
                popup.classList.remove('active');
                trigger.classList.remove('active');
                this.toggleLogoState(false);
            }
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!popup.contains(e.target) && !trigger.contains(e.target)) {
                popup.classList.remove('active');
                trigger.classList.remove('active');
                isClicked = false;
                this.toggleLogoState(false);
            }
        });
    }

    initializeGlowEffects() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes subtle-pulse {
                0%, 100% {
                    filter: brightness(1.4) contrast(1.1);
                    text-shadow: 
                        0 0 10px rgba(167, 139, 250, 0.4),
                        0 0 20px rgba(167, 139, 250, 0.4),
                        0 0 30px rgba(167, 139, 250, 0.3),
                        0 0 40px rgba(167, 139, 250, 0.2),
                        0 0 50px rgba(167, 139, 250, 0.1),
                        0 0 60px rgba(167, 139, 250, 0.05);
                }
                50% {
                    filter: brightness(1.5) contrast(1.15);
                    text-shadow: 
                        0 0 15px rgba(167, 139, 250, 0.5),
                        0 0 25px rgba(167, 139, 250, 0.4),
                        0 0 35px rgba(167, 139, 250, 0.3),
                        0 0 45px rgba(167, 139, 250, 0.2),
                        0 0 55px rgba(167, 139, 250, 0.15),
                        0 0 65px rgba(167, 139, 250, 0.1);
                }
            }
        `;
        document.head.appendChild(style);
    }
} 