class CategoryBar {
    constructor(container) {
        this.container = container;
        this.categories = [
            { id: 'all', icon: 'fas fa-globe', label: 'All' },
            { id: 'trending', icon: 'fas fa-fire', label: 'Trending' },
            { id: 'music', icon: 'fas fa-music', label: 'Music' },
            { id: 'gaming', icon: 'fas fa-gamepad', label: 'Gaming' },
            { id: 'education', icon: 'fas fa-graduation-cap', label: 'Education' },
            { id: 'tech', icon: 'fas fa-microchip', label: 'Technology' },
            { id: 'entertainment', icon: 'fas fa-film', label: 'Entertainment' },
            { id: 'sports', icon: 'fas fa-basketball-ball', label: 'Sports' },
            { id: 'news', icon: 'fas fa-newspaper', label: 'News' },
            { id: 'art', icon: 'fas fa-palette', label: 'Art & Design' },
            { id: 'science', icon: 'fas fa-flask', label: 'Science' },
            { id: 'cooking', icon: 'fas fa-utensils', label: 'Cooking' },
            { id: 'travel', icon: 'fas fa-plane', label: 'Travel' },
            { id: 'fitness', icon: 'fas fa-dumbbell', label: 'Fitness' }
        ];
        this.render();
        this.initializeEventListeners();
        this.setDefaultCategory();
    }

    render() {
        this.container.innerHTML = `
            <div class="categories-container">
                <div class="categories-popup">
                    <div class="categories-grid">
                        ${this.categories.map(category => `
                            <div class="nav-item ${category.id === 'all' ? 'active' : ''}" data-category="${category.id}">
                                <div class="nav-icon">
                                    <i class="${category.icon}"></i>
                                </div>
                                <span class="nav-label">${category.label}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    togglePopup(show, dialOption = null) {
        const popup = this.container.querySelector('.categories-popup');
        const container = this.container.querySelector('.categories-container');
        
        if (show && dialOption) {
            const rect = dialOption.getBoundingClientRect();
            
            // Position container relative to dial option
            container.style.top = `${rect.bottom + 15}px`;
            container.style.left = `${rect.left - (360/2) + (rect.width/2)}px`;
            
            popup.classList.add('active');
        } else {
            popup.classList.remove('active');
        }
    }

    initializeEventListeners() {
        const popup = this.container.querySelector('.categories-popup');
        const categories = this.container.querySelectorAll('.nav-item');

        categories.forEach(category => {
            category.addEventListener('click', () => {
                categories.forEach(c => c.classList.remove('active'));
                category.classList.add('active');
                this.togglePopup(false);
            });
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!popup.contains(e.target) && 
                !e.target.closest('.dial-option[data-tooltip="Categories"]')) {
                this.togglePopup(false);
            }
        });
    }

    setDefaultCategory() {
        const allCategory = this.container.querySelector('[data-category="all"]');
        if (allCategory) {
            allCategory.classList.add('active');
        }
    }
} 