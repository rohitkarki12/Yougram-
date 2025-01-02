class SearchBar {
    constructor(container) {
        this.container = container;
        this.render();
        this.initializeEventListeners();
    }

    render() {
        this.container.innerHTML = `
            <div class="search-container">
                <input 
                    type="search" 
                    class="search-bar"
                    placeholder="Search"
                >
                <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </div>
        `;
    }

    initializeEventListeners() {
        const searchInput = this.container.querySelector('.search-bar');
        searchInput.addEventListener('input', this.handleSearch.bind(this));
    }

    handleSearch(event) {
        // Will be implemented later
    }
} 