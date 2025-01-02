function initializeLayout() {
    const mainContent = document.getElementById('main-content');

    // Create video grid sections
    const videoSection1 = document.createElement('div');
    videoSection1.className = 'video-grid';
    videoSection1.innerHTML = generateVideoGrid(8); // 2 rows of 4 videos

    const videoSection2 = document.createElement('div');
    videoSection2.className = 'video-grid';
    videoSection2.innerHTML = generateVideoGrid(16); // 4 rows of 4 videos

    const videoSection3 = document.createElement('div');
    videoSection3.className = 'video-grid';
    videoSection3.innerHTML = generateVideoGrid(16); // 4 rows of 4 videos

    // Create cards sections
    const cardsSection1 = document.createElement('div');
    cardsSection1.id = 'cards-section-1';
    new Cards(cardsSection1);

    const cardsSection2 = document.createElement('div');
    cardsSection2.id = 'cards-section-2';
    new Cards(cardsSection2);

    const cardsSection3 = document.createElement('div');
    cardsSection3.id = 'cards-section-3';
    new Cards(cardsSection3);

    // Append in correct order
    mainContent.innerHTML = ''; // Clear existing content
    mainContent.appendChild(videoSection1);
    mainContent.appendChild(cardsSection1);
    mainContent.appendChild(videoSection2);
    mainContent.appendChild(cardsSection2);
    mainContent.appendChild(videoSection3);
    mainContent.appendChild(cardsSection3);
}

function generateVideoGrid(count) {
    return mockVideos.slice(0, count).map(video => 
        new VideoCard(video).render()
    ).join('');
}

// Initialize components
document.addEventListener('DOMContentLoaded', () => {
    const logoContainer = document.getElementById('logo-container');
    new Logo(logoContainer);

    const searchContainer = document.getElementById('search-container');
    new SearchBar(searchContainer);

    const categoryContainer = document.getElementById('category-container');
    new CategoryBar(categoryContainer);

    new Sidebar();
    
    // Initialize the layout
    initializeLayout();
}); 