class DialMenu {
    constructor(container) {
        this.container = container;
        this.render();
        this.initializeEventListeners();
        this.menuItems = [
            { icon: 'fa-sliders-h', label: 'Filters' },
            { icon: 'fa-sort-amount-down', label: 'Sort' },
            { icon: 'fa-brain', label: 'AI Assistant' },
            { icon: 'fa-cog', label: 'Settings' }
        ];
    }

    render() {
        this.container.innerHTML = `
            <div class="dial-menu-container">
                <div class="dial-trigger">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
                <div class="dial-menu">
                    <div class="dial-options">
                        <div class="dial-option" data-tooltip="Categories">
                            <i class="fas fa-th-large"></i>
                            <div class="categories-popup">
                                <div class="categories-grid">
                                    ${this.renderCategories()}
                                </div>
                            </div>
                        </div>
                        <div class="dial-option" data-tooltip="AI Assistant">
                            <i class="fas fa-brain"></i>
                            <div class="ai-chat-popup">
                                <div id="ai-chat-container" class="ai-chat-container"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Initialize AI Chat after rendering
        const aiChatContainer = this.container.querySelector('#ai-chat-container');
        if (aiChatContainer) {
            new AiChat(aiChatContainer);
        }
    }

    renderCategories() {
        const categories = [
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
            { id: 'fitness', icon: 'fas fa-dumbbell', label: 'Fitness' },
            { id: 'beauty', icon: 'fas fa-spa', label: 'Beauty' },
            { id: 'pets', icon: 'fas fa-paw', label: 'Pets' },
            { id: 'fashion', icon: 'fas fa-tshirt', label: 'Fashion' },
            { id: 'diy', icon: 'fas fa-tools', label: 'DIY' },
            { id: 'finance', icon: 'fas fa-chart-line', label: 'Finance' },
            { id: 'automotive', icon: 'fas fa-car', label: 'Automotive' }
        ];

        return categories.map(category => `
            <div class="nav-item ${category.id === 'all' ? 'active' : ''}" data-category="${category.id}">
                <div class="nav-icon">
                    <i class="${category.icon}"></i>
                </div>
                <span class="nav-label">${category.label}</span>
            </div>
        `).join('');
    }

    initializeEventListeners() {
        const trigger = this.container.querySelector('.dial-trigger');
        const menu = this.container.querySelector('.dial-menu');
        const categoryOption = this.container.querySelector('.dial-option[data-tooltip="Categories"]');
        const categoryPopup = categoryOption.querySelector('.categories-popup');
        const aiOption = this.container.querySelector('.dial-option[data-tooltip="AI Assistant"]');
        const aiPopup = aiOption.querySelector('.ai-chat-popup');

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('active');
        });

        categoryOption.addEventListener('click', (e) => {
            e.stopPropagation();
            categoryPopup.classList.toggle('active');
            aiPopup.classList.remove('active');
        });

        aiOption.addEventListener('click', (e) => {
            e.stopPropagation();
            aiPopup.classList.toggle('active');
            categoryPopup.classList.remove('active');
        });

        // Prevent closing when clicking inside the AI chat
        aiPopup.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Prevent closing when clicking inside the categories
        categoryPopup.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Only close when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.container.contains(e.target)) {
                menu.classList.remove('active');
                categoryPopup.classList.remove('active');
                aiPopup.classList.remove('active');
            }
        });
    }

    handleMenuClick(e) {
        const item = e.target.closest('.dial-menu-item');
        if (!item) return;

        const label = item.querySelector('.dial-menu-label').textContent;
        switch(label) {
            case 'Filters':
                // existing filter code
                break;
            case 'Sort':
                // existing sort code
                break;
            case 'AI Assistant':
                this.toggleAIChat();
                break;
            case 'Settings':
                // existing settings code
                break;
        }
    }

    toggleAIChat() {
        const existingChat = document.querySelector('.ai-chat-window');
        if (existingChat) {
            existingChat.classList.toggle('minimized');
        } else {
            new AiChat();
        }
    }
} 