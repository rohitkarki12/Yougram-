class ThemeManager {
    constructor() {
        this.colors = {
            purple: {
                main: 'rgb(167, 139, 250)',
                rgb: '167, 139, 250',
                glow: 'rgba(167, 139, 250, 0.4)'
            },
            blue: {
                main: 'rgb(96, 165, 250)',
                rgb: '96, 165, 250',
                glow: 'rgba(96, 165, 250, 0.4)'
            },
            green: {
                main: 'rgb(52, 211, 153)',
                rgb: '52, 211, 153',
                glow: 'rgba(52, 211, 153, 0.4)'
            },
            pink: {
                main: 'rgb(244, 114, 182)',
                rgb: '244, 114, 182',
                glow: 'rgba(244, 114, 182, 0.4)'
            }
        };

        // Listen for theme select open event
        document.addEventListener('openThemeSelect', () => {
            const popup = document.querySelector('.theme-popup');
            if (popup) {
                popup.classList.add('active');
            }
        });

        this.init();
    }

    init() {
        // Create theme popup
        this.createThemePopup();
        
        // Load saved theme or use default
        const savedTheme = localStorage.getItem('selectedTheme') || 'purple';
        this.applyTheme(savedTheme);

        // Set initial active state
        const activeTheme = document.querySelector(`.theme-option[data-theme="${savedTheme}"]`);
        if (activeTheme) {
            activeTheme.classList.add('active');
        }
    }

    createThemePopup() {
        const popup = document.createElement('div');
        popup.className = 'theme-popup';
        popup.innerHTML = this.getThemePopupContent();
        document.body.appendChild(popup);
        
        this.addEventListeners(popup);
    }

    getThemePopupContent() {
        return `
            <div class="theme-popup-header">
                <h3>Choose Theme</h3>
            </div>
            <div class="theme-options">
                ${Object.keys(this.colors).map(theme => `
                    <button class="theme-option ${theme}" data-theme="${theme}">
                        <div class="color-preview"></div>
                        <span>${theme.charAt(0).toUpperCase() + theme.slice(1)}</span>
                        <i class="fas fa-check"></i>
                    </button>
                `).join('')}
            </div>
        `;
    }

    addEventListeners(popup) {
        // Close popup when clicking outside
        document.addEventListener('click', () => {
            popup.classList.remove('active');
        });

        popup.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Theme selection
        popup.querySelectorAll('.theme-option').forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.dataset.theme;
                
                // Update active state
                popup.querySelectorAll('.theme-option').forEach(opt => {
                    opt.classList.remove('active');
                });
                option.classList.add('active');

                // Apply theme
                this.applyTheme(theme);

                // Close popup
                setTimeout(() => {
                    popup.classList.remove('active');
                }, 300);
            });
        });
    }

    applyTheme(theme) {
        const color = this.colors[theme];
        if (!color) return;

        // Save theme preference
        localStorage.setItem('selectedTheme', theme);

        // Update CSS variables
        const root = document.documentElement;
        root.style.setProperty('--theme-color', color.main);
        root.style.setProperty('--theme-color-rgb', color.rgb);
        root.style.setProperty('--theme-glow', color.glow);
        root.style.setProperty('--selected-glow', color.main);
        root.style.setProperty('--glow-shadow-sm', `0 0 8px ${color.glow}`);
        root.style.setProperty('--glow-shadow-md', `0 0 15px ${color.glow}`);
        root.style.setProperty('--glow-shadow-lg', `0 0 30px ${color.glow}`);

        // Dispatch theme change event
        document.dispatchEvent(new CustomEvent('themeChange', { detail: { theme } }));
    }
} 