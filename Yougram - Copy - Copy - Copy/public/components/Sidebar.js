class Sidebar {
    constructor() {
        this.addTriggerZone();
        this.render();
        this.initializeEventListeners();
        new SidebarTrigger();
    }

    render() {
        const sidebar = document.createElement('div');
        sidebar.className = 'sidebar';
        sidebar.innerHTML = `
            <div class="sidebar-content">
                <div class="sidebar-menu">
                    <!-- Main Navigation -->
                    <div class="menu-section">
                        <div class="menu-item active">
                            <i class="fas fa-home"></i>
                            <span>Home</span>
                        </div>
                        <div class="menu-item">
                            <i class="fas fa-compass"></i>
                            <span>Explore</span>
                        </div>
                        <div class="menu-item">
                            <i class="fas fa-bolt"></i>
                            <span>Cards</span>
                        </div>
                        <div class="menu-item">
                            <i class="fas fa-users"></i>
                            <span>Following</span>
                        </div>
                    </div>

                    <!-- Library Section -->
                    <div class="menu-section">
                        <div class="section-title">Library</div>
                        <div class="menu-item">
                            <i class="fas fa-history"></i>
                            <span>History</span>
                        </div>
                        <div class="menu-item">
                            <i class="fas fa-clock"></i>
                            <span>Watch Later</span>
                        </div>
                        <div class="menu-item">
                            <i class="fas fa-heart"></i>
                            <span>Liked Videos</span>
                        </div>
                        <div class="menu-item">
                            <i class="fas fa-bookmark"></i>
                            <span>Saved</span>
                        </div>
                        <div class="menu-item">
                            <i class="fas fa-list"></i>
                            <span>Playlists</span>
                        </div>
                    </div>

                    <!-- Subscriptions Section -->
                    <div class="menu-section">
                        <div class="section-title">Subscriptions</div>
                        <div class="subscription-card">
                            <img class="subscription-avatar" src="https://picsum.photos/32/32?random=1" alt="Channel">
                            <span class="subscription-name">Tech Channel</span>
                            <div class="live-indicator">
                                <div class="live-dot"></div>
                                <span>LIVE</span>
                            </div>
                        </div>
                        <div class="subscription-card">
                            <img class="subscription-avatar" src="https://picsum.photos/32/32?random=2" alt="Channel">
                            <span class="subscription-name">Music Channel</span>
                        </div>
                        <div class="subscription-card">
                            <img class="subscription-avatar" src="https://picsum.photos/32/32?random=3" alt="Channel">
                            <span class="subscription-name">Gaming Channel</span>
                        </div>
                        <div class="menu-item">
                            <i class="fas fa-chevron-down"></i>
                            <span>Show More</span>
                        </div>
                    </div>

                    <!-- Settings & Support -->
                    <div class="menu-section">
                        <div class="section-title">Settings & Support</div>
                        <div class="menu-item" data-feature="about">
                            <i class="fas fa-info-circle"></i>
                            <span>About</span>
                        </div>
                        <div class="menu-item">
                            <i class="fas fa-cog"></i>
                            <span>Settings</span>
                        </div>
                        <div class="menu-item">
                            <i class="fas fa-shield-alt"></i>
                            <span>Privacy</span>
                        </div>
                        <div class="menu-item">
                            <i class="fas fa-moon"></i>
                            <span>Dark Mode</span>
                        </div>
                        <div class="menu-item">
                            <i class="fas fa-question-circle"></i>
                            <span>Help Center</span>
                        </div>
                        <div class="menu-item">
                            <i class="fas fa-exclamation-circle"></i>
                            <span>Send Feedback</span>
                        </div>
                    </div>

                    <!-- Footer Links -->
                    <div class="menu-section sidebar-footer">
                        <div class="footer-links">
                            <a href="#" class="about-link">About</a>
                            <a href="#">Press</a>
                            <a href="#">Copyright</a>
                            <a href="#">Contact</a>
                            <a href="#">Terms</a>
                            <a href="#">Privacy</a>
                        </div>
                        <div class="footer-copyright">
                            © 2024 YouGram
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(sidebar);
    }

    addTriggerZone() {
        const triggerZone = document.createElement('div');
        triggerZone.className = 'sidebar-trigger';
        triggerZone.innerHTML = `
            <i class="fas fa-chevron-right"></i>
        `;
        document.body.appendChild(triggerZone);
    }

    initializeEventListeners() {
        const aboutBtn = document.querySelector('.menu-item[data-feature="about"]');
        if (aboutBtn) {
            aboutBtn.addEventListener('click', () => {
                const aboutModal = new AboutModal();
                aboutModal.open();
            });
        }

        const aboutLink = document.querySelector('.footer-links .about-link');
        if (aboutLink) {
            aboutLink.addEventListener('click', (e) => {
                e.preventDefault();
                const aboutModal = new AboutModal();
                aboutModal.open();
            });
        }
    }
} 