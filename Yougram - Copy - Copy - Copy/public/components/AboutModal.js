class AboutModal {
    constructor() {
        this.render();
        this.initializeEventListeners();
    }

    render() {
        const modal = document.createElement('div');
        modal.className = 'about-modal';
        modal.innerHTML = `
            <div class="about-content">
                <div class="modal-header">
                    <div class="header-icon">
                        <i class="fas fa-info-circle"></i>
                    </div>
                    <h2>About YouGram</h2>
                    <button class="close-btn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="developer-section">
                        <h3>Developer</h3>
                        <div class="developer-info">
                            <div class="avatar">RK</div>
                            <div class="info">
                                <p class="name">Rohit Karki</p>
                                <p class="role">Full Stack Developer</p>
                            </div>
                        </div>
                    </div>
                    <div class="status-section">
                        <h3>Project Status</h3>
                        <div class="status-card">
                            <i class="fas fa-code-branch"></i>
                            <p>This website is currently in preview mode and not fully developed yet. You can explore the available features as we continue to improve and add more functionality.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    initializeEventListeners() {
        const modal = document.querySelector('.about-modal');
        const closeBtn = modal.querySelector('.close-btn');

        closeBtn.addEventListener('click', () => {
            this.close();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.close();
            }
        });
    }

    open() {
        const modal = document.querySelector('.about-modal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        const modal = document.querySelector('.about-modal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
} 