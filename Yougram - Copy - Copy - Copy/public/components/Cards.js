class Cards {
    constructor(container) {
        this.container = container;
        this.cards = [];
        this.isLoading = true;
        this.render();
        this.loadCards();
        this.initializeEventListeners();
    }

    async loadCards() {
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.isLoading = false;
        this.cards = [
            {
                id: 1,
                thumbnail: 'https://picsum.photos/200/350?random=1',
                title: 'Epic Drone Shot of Northern Lights',
                channelName: 'Sky Visuals',
                channelAvatar: 'https://picsum.photos/32/32?random=1',
                views: '1.2M'
            },
            {
                id: 2,
                thumbnail: 'https://picsum.photos/200/350?random=2',
                title: 'Street Food Tour in Tokyo',
                channelName: 'Food Journey',
                channelAvatar: 'https://picsum.photos/32/32?random=2',
                views: '890K'
            },
            {
                id: 3,
                thumbnail: 'https://picsum.photos/200/350?random=3',
                title: 'Morning Routine 2024',
                channelName: 'Lifestyle Plus',
                channelAvatar: 'https://picsum.photos/32/32?random=3',
                views: '750K'
            },
            {
                id: 4,
                thumbnail: 'https://picsum.photos/200/350?random=4',
                title: 'Dance Challenge Compilation',
                channelName: 'Trending Now',
                channelAvatar: 'https://picsum.photos/32/32?random=4',
                views: '2.1M'
            },
            {
                id: 5,
                thumbnail: 'https://picsum.photos/200/350?random=5',
                title: 'Sunset Surfing in Bali',
                channelName: 'Adventure Time',
                channelAvatar: 'https://picsum.photos/32/32?random=5',
                views: '445K'
            },
            {
                id: 6,
                thumbnail: 'https://picsum.photos/200/350?random=6',
                title: 'Making Sushi at Home',
                channelName: 'Cooking Master',
                channelAvatar: 'https://picsum.photos/32/32?random=6',
                views: '980K'
            },
            {
                id: 7,
                thumbnail: 'https://picsum.photos/200/350?random=7',
                title: 'Urban Photography Tips',
                channelName: 'Photo Pro',
                channelAvatar: 'https://picsum.photos/32/32?random=7',
                views: '670K'
            },
            {
                id: 8,
                thumbnail: 'https://picsum.photos/200/350?random=8',
                title: 'Daily Workout Routine',
                channelName: 'Fitness Hub',
                channelAvatar: 'https://picsum.photos/32/32?random=8',
                views: '1.5M'
            },
            {
                id: 9,
                thumbnail: 'https://picsum.photos/200/350?random=9',
                title: 'Mountain Biking Adventure',
                channelName: 'Extreme Sports',
                channelAvatar: 'https://picsum.photos/32/32?random=9',
                views: '920K'
            },
            {
                id: 10,
                thumbnail: 'https://picsum.photos/200/350?random=10',
                title: 'Room Makeover Transformation',
                channelName: 'DIY Queen',
                channelAvatar: 'https://picsum.photos/32/32?random=10',
                views: '2.3M'
            },
            {
                id: 11,
                thumbnail: 'https://picsum.photos/200/350?random=11',
                title: 'Night City Timelapse',
                channelName: 'Urban Shots',
                channelAvatar: 'https://picsum.photos/32/32?random=11',
                views: '780K'
            },
            {
                id: 12,
                thumbnail: 'https://picsum.photos/200/350?random=12',
                title: 'Skateboarding Tricks 2024',
                channelName: 'Skate Life',
                channelAvatar: 'https://picsum.photos/32/32?random=12',
                views: '1.1M'
            },
            {
                id: 13,
                thumbnail: 'https://picsum.photos/200/350?random=13',
                title: 'Makeup Tutorial Natural Look',
                channelName: 'Beauty Tips',
                channelAvatar: 'https://picsum.photos/32/32?random=13',
                views: '3.2M'
            },
            {
                id: 14,
                thumbnail: 'https://picsum.photos/200/350?random=14',
                title: 'Piano Cover - Popular Songs',
                channelName: 'Music Vibes',
                channelAvatar: 'https://picsum.photos/32/32?random=14',
                views: '890K'
            },
            {
                id: 15,
                thumbnail: 'https://picsum.photos/200/350?random=15',
                title: 'Travel Vlog - Paris',
                channelName: 'Travel With Me',
                channelAvatar: 'https://picsum.photos/32/32?random=15',
                views: '1.8M'
            },
            {
                id: 16,
                thumbnail: 'https://picsum.photos/200/350?random=16',
                title: 'Gaming Setup Tour 2024',
                channelName: 'Tech Review',
                channelAvatar: 'https://picsum.photos/32/32?random=16',
                views: '2.5M'
            },
            {
                id: 17,
                thumbnail: 'https://picsum.photos/200/350?random=17',
                title: 'Street Art Creation',
                channelName: 'Urban Artist',
                channelAvatar: 'https://picsum.photos/32/32?random=17',
                views: '670K'
            },
            {
                id: 18,
                thumbnail: 'https://picsum.photos/200/350?random=18',
                title: 'Coffee Making Masterclass',
                channelName: 'Barista Pro',
                channelAvatar: 'https://picsum.photos/32/32?random=18',
                views: '990K'
            },
            {
                id: 19,
                thumbnail: 'https://picsum.photos/200/350?random=19',
                title: 'Pet Training Tips',
                channelName: 'Animal Expert',
                channelAvatar: 'https://picsum.photos/32/32?random=19',
                views: '1.4M'
            },
            {
                id: 20,
                thumbnail: 'https://picsum.photos/200/350?random=20',
                title: 'Gardening for Beginners',
                channelName: 'Green Thumb',
                channelAvatar: 'https://picsum.photos/32/32?random=20',
                views: '560K'
            }
        ];
        this.render();
    }

    render() {
        if (this.isLoading) {
            this.renderLoadingState();
            return;
        }
        this.container.innerHTML = `
            <section class="cards-section">
                <div class="cards-header">
                    <div class="cards-title">
                        <i class="fas fa-bolt"></i>
                        <span>Cards</span>
                    </div>
                </div>
                <div class="cards-container">
                    <div class="cards-wrapper">
                        ${this.renderCards()}
                    </div>
                </div>
            </section>
        `;
    }

    renderCards() {
        return this.cards.map(card => `
            <div class="card" data-id="${card.id}">
                <img class="card-thumbnail" src="${card.thumbnail}" alt="${card.title}">
                <div class="card-duration">3:45</div>
                <div class="card-actions">
                    <button class="action-button watch-later" title="Watch Later">
                        <i class="fas fa-clock"></i>
                    </button>
                    <button class="action-button add-playlist" title="Add to Playlist">
                        <i class="fas fa-list"></i>
                    </button>
                </div>
                <div class="card-overlay">
                    <h3 class="card-title">${card.title}</h3>
                    <div class="card-meta">
                        <div class="card-channel">
                            <div class="card-avatar">
                                <img src="${card.channelAvatar}" alt="${card.channelName}">
                            </div>
                            <span class="channel-name">${card.channelName}</span>
                        </div>
                        <div class="card-stats">
                            <span class="card-views">${card.views} views</span>
                            <span class="card-time">2 days ago</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderLoadingState() {
        const loadingCards = Array(8).fill(0).map(() => `
            <div class="card loading">
                <div class="card-thumbnail loading"></div>
                <div class="card-overlay">
                    <div class="card-title loading"></div>
                    <div class="card-meta loading"></div>
                </div>
            </div>
        `).join('');

        this.container.innerHTML = `
            <section class="cards-section">
                <div class="cards-header">
                    <div class="cards-title loading"></div>
                </div>
                <div class="cards-container">
                    <div class="cards-wrapper">
                        ${loadingCards}
                    </div>
                </div>
            </section>
        `;
    }

    initializeEventListeners() {
        const container = this.container.querySelector('.cards-container');
        let isDown = false;
        let startX;
        let scrollLeft;

        container.addEventListener('mousedown', (e) => {
            isDown = true;
            container.classList.add('active');
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });

        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.classList.remove('active');
        });

        container.addEventListener('mouseup', () => {
            isDown = false;
            container.classList.remove('active');
        });

        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed multiplier
            container.scrollLeft = scrollLeft - walk;
        });

        // Touch events for mobile
        container.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });

        container.addEventListener('touchend', () => {
            isDown = false;
        });

        container.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        });

        // Add click handlers for action buttons
        this.container.addEventListener('click', (e) => {
            const watchLater = e.target.closest('.watch-later');
            const addPlaylist = e.target.closest('.add-playlist');
            const card = e.target.closest('.card');

            if (watchLater) {
                e.stopPropagation();
                this.handleWatchLater(card.dataset.id);
            }

            if (addPlaylist) {
                e.stopPropagation();
                this.handleAddToPlaylist(card.dataset.id);
            }

            if (card && !watchLater && !addPlaylist) {
                this.handleCardClick(card.dataset.id);
            }
        });
    }

    handleWatchLater(id) {
        const button = this.container.querySelector(`.card[data-id="${id}"] .watch-later`);
        button.classList.toggle('active');
        // Add animation
        button.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-clock"></i>';
        }, 1000);
    }

    handleAddToPlaylist(id) {
        // Show playlist modal
        console.log('Add to playlist:', id);
    }

    handleCardClick(id) {
        // Show video player modal
        console.log('Play video:', id);
    }
} 