class ProfilePopup {
    constructor() {
        this.userService = new UserDataService();
        this.currentUser = this.userService.getCurrentUser();
        this.isLoggedIn = this.userService.isLoggedIn();
        this.render();
        this.initializeEventListeners();
        this.setupAuthListeners();
        this.updateProfileButton();
    }

    setupAuthListeners() {
        document.addEventListener('userLoggedIn', (e) => {
            this.currentUser = e.detail;
            this.isLoggedIn = true;
            this.updateUI();
            this.updateProfileButton();
        });

        document.addEventListener('userLoggedOut', () => {
            this.currentUser = null;
            this.isLoggedIn = false;
            this.updateUI();
            this.updateProfileButton();
        });
    }

    updateUI() {
        const popup = document.querySelector('.profile-popup');
        if (popup) {
            popup.innerHTML = `
                <div class="profile-menu">
                    ${this.isLoggedIn ? this.getLoggedInContent() : this.getLoggedOutContent()}
                </div>
            `;
            this.initializeEventListeners();
        }
    }

    render() {
        const popup = document.createElement('div');
        popup.className = 'profile-popup';
        popup.innerHTML = `
            <div class="profile-menu">
                ${this.isLoggedIn ? this.getLoggedInContent() : this.getLoggedOutContent()}
            </div>
        `;
        document.body.appendChild(popup);
    }

    getLoggedInContent() {
        return `
            <div class="profile-header">
                <div class="profile-info">
                    <div class="profile-avatar">
                        ${this.currentUser.username.charAt(0).toUpperCase()}
                    </div>
                    <div class="profile-details">
                        <div class="profile-name">${this.currentUser.username}</div>
                        <div class="profile-email">${this.currentUser.email}</div>
                    </div>
                </div>
            </div>
            <div class="menu-section">
                <a class="menu-item" href="#">
                    <i class="fas fa-user-circle"></i>
                    <span>Your Channel</span>
                </a>
                <a class="menu-item" href="#">
                    <i class="fas fa-video"></i>
                    <span>Your Videos</span>
                </a>
                <a class="menu-item" href="#">
                    <i class="fas fa-history"></i>
                    <span>History</span>
                </a>
                <a class="menu-item" href="#">
                    <i class="fas fa-cog"></i>
                    <span>Settings</span>
                </a>
                <button class="menu-item theme-select-btn">
                    <i class="fas fa-palette"></i>
                    <span>Theme</span>
                </button>
            </div>
            <div class="menu-divider"></div>
            <div class="menu-section">
                <a class="menu-item logout-btn" href="#">
                    <i class="fas fa-sign-out-alt"></i>
                    <span>Sign Out</span>
                </a>
            </div>
        `;
    }

    getLoggedOutContent() {
        return `
            <div class="login-prompt">
                <div class="login-icon">
                    <i class="fas fa-user-circle"></i>
                </div>
                <div class="login-text">Sign in to access all features</div>
                <button class="login-btn">
                    <i class="fas fa-sign-in-alt"></i>
                    Sign In
                </button>
            </div>
            <div class="menu-section">
                <button class="menu-item theme-select-btn">
                    <i class="fas fa-palette"></i>
                    <span>Theme</span>
                </button>
                <a class="menu-item" href="#">
                    <i class="fas fa-question-circle"></i>
                    <span>Help</span>
                </a>
            </div>
        `;
    }

    initializeEventListeners() {
        const profileBtn = document.querySelector('.profile-btn');
        const popup = document.querySelector('.profile-popup');
        const loginBtn = popup.querySelector('.login-btn');
        const logoutBtn = popup.querySelector('.logout-btn');
        const themeBtn = popup.querySelector('.theme-select-btn');

        // Profile button click handler
        if (!profileBtn._hasClickListener) {
            profileBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                popup.classList.toggle('active');
                profileBtn.classList.toggle('active');
            });
            profileBtn._hasClickListener = true;
        }

        // Login button click handler
        if (loginBtn && !loginBtn._hasClickListener) {
            loginBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const loginModal = new LoginModal();
                loginModal.open();
                popup.classList.remove('active');
                profileBtn.classList.remove('active');
            });
            loginBtn._hasClickListener = true;
        }

        // Logout button click handler
        if (logoutBtn && !logoutBtn._hasClickListener) {
            logoutBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.userService.logout();
                this.updateUI();
                popup.classList.remove('active');
                profileBtn.classList.remove('active');
                document.dispatchEvent(new CustomEvent('userLoggedOut'));
            });
            logoutBtn._hasClickListener = true;
        }

        // Theme button click handler
        if (themeBtn && !themeBtn._hasClickListener) {
            themeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                document.dispatchEvent(new CustomEvent('openThemeSelect'));
                popup.classList.remove('active');
                profileBtn.classList.remove('active');
            });
            themeBtn._hasClickListener = true;
        }

        // Outside click handler
        if (!document._hasProfileClickListener) {
            document.addEventListener('click', (e) => {
                if (!popup.contains(e.target) && !profileBtn.contains(e.target)) {
                    popup.classList.remove('active');
                    profileBtn.classList.remove('active');
                }
            });
            document._hasProfileClickListener = true;
        }
    }

    updateProfileButton() {
        const profileBtn = document.querySelector('.profile-btn');
        if (this.isLoggedIn && this.currentUser) {
            profileBtn.innerHTML = `
                <div class="profile-avatar-small">
                    ${this.currentUser.username.charAt(0).toUpperCase()}
                </div>
            `;
            profileBtn.classList.add('logged-in');
        } else {
            profileBtn.innerHTML = '<i class="fas fa-user"></i>';
            profileBtn.classList.remove('logged-in');
        }
    }
} 