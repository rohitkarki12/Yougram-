class SearchFilter {
    constructor() {
        this.initializeFilter();
    }

    initializeFilter() {
        const filterBtn = document.querySelector('.search-filter-btn');
        
        // Create filter popup
        const filterPopup = document.createElement('div');
        filterPopup.className = 'filter-popup';
        filterPopup.innerHTML = `
            <div class="filter-section">
                <h3>Upload Date</h3>
                <div class="filter-options">
                    <label class="filter-option">
                        <input type="radio" name="date" value="hour">
                        <span>Last hour</span>
                    </label>
                    <label class="filter-option">
                        <input type="radio" name="date" value="today">
                        <span>Today</span>
                    </label>
                    <label class="filter-option">
                        <input type="radio" name="date" value="week">
                        <span>This week</span>
                    </label>
                    <label class="filter-option">
                        <input type="radio" name="date" value="month">
                        <span>This month</span>
                    </label>
                </div>
            </div>

            <div class="filter-section">
                <h3>Duration</h3>
                <div class="filter-options">
                    <label class="filter-option">
                        <input type="radio" name="duration" value="short">
                        <span>Under 4 minutes</span>
                    </label>
                    <label class="filter-option">
                        <input type="radio" name="duration" value="medium">
                        <span>4-20 minutes</span>
                    </label>
                    <label class="filter-option">
                        <input type="radio" name="duration" value="long">
                        <span>Over 20 minutes</span>
                    </label>
                </div>
            </div>

            <div class="filter-section">
                <h3>Features</h3>
                <div class="filter-options feature-cards">
                    <label class="filter-card">
                        <input type="checkbox" name="features" value="4k">
                        <div class="card-content">
                            <i class="fas fa-tv"></i>
                            <span>4K</span>
                        </div>
                    </label>
                    <label class="filter-card">
                        <input type="checkbox" name="features" value="hd">
                        <div class="card-content">
                            <i class="fas fa-film"></i>
                            <span>HD</span>
                        </div>
                    </label>
                    <label class="filter-card">
                        <input type="checkbox" name="features" value="subtitles">
                        <div class="card-content">
                            <i class="fas fa-closed-captioning"></i>
                            <span>Subtitles</span>
                        </div>
                    </label>
                    <label class="filter-card">
                        <input type="checkbox" name="features" value="live">
                        <div class="card-content">
                            <i class="fas fa-broadcast-tower"></i>
                            <span>Live</span>
                        </div>
                    </label>
                </div>
            </div>

            <div class="filter-section">
                <h3>Sort By</h3>
                <div class="filter-options">
                    <label class="filter-option">
                        <input type="radio" name="sort" value="relevance">
                        <span>Relevance</span>
                    </label>
                    <label class="filter-option">
                        <input type="radio" name="sort" value="date">
                        <span>Upload date</span>
                    </label>
                    <label class="filter-option">
                        <input type="radio" name="sort" value="views">
                        <span>View count</span>
                    </label>
                    <label class="filter-option">
                        <input type="radio" name="sort" value="rating">
                        <span>Rating</span>
                    </label>
                </div>
            </div>

            <div class="filter-actions">
                <button class="filter-reset">Reset</button>
                <button class="filter-apply">Apply</button>
            </div>
        `;

        // Add to DOM
        filterBtn.parentNode.appendChild(filterPopup);

        // Event listeners
        filterBtn.addEventListener('click', () => {
            filterPopup.classList.toggle('active');
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!filterPopup.contains(e.target) && !filterBtn.contains(e.target)) {
                filterPopup.classList.remove('active');
            }
        });

        // Add selection tracking only for Features section
        const updateFeatureCount = () => {
            const featureSection = filterPopup.querySelector('.filter-section:nth-child(3)'); // Features section
            const checkboxes = featureSection.querySelectorAll('input[type="checkbox"]');
            const count = Array.from(checkboxes).filter(cb => cb.checked).length;
            const countEl = featureSection.querySelector('.selection-count');
            
            if (count > 0) {
                countEl.textContent = `${count} selected`;
                countEl.classList.add('active');
            } else {
                countEl.classList.remove('active');
            }
        };

        // Add count element only to Features section
        const featureSection = filterPopup.querySelector('.filter-section:nth-child(3)');
        const featureTitle = featureSection.querySelector('h3');
        const countEl = document.createElement('span');
        countEl.className = 'selection-count';
        featureTitle.appendChild(countEl);

        // Update event listeners
        filterPopup.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox') {
                const card = e.target.closest('.filter-card');
                card.classList.toggle('selected', e.target.checked);
                updateFeatureCount();
            }
        });

        // Update reset functionality
        const resetBtn = filterPopup.querySelector('.filter-reset');
        resetBtn.addEventListener('click', () => {
            filterPopup.querySelectorAll('input').forEach(input => {
                input.checked = false;
            });
            filterPopup.querySelectorAll('.filter-card').forEach(card => {
                card.classList.remove('selected');
            });
            updateFeatureCount();
        });
    }
} 