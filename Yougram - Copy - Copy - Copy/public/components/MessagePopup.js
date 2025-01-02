class MessagePopup {
    constructor() {
        this.messages = [
            {
                id: 1,
                sender: 'Emma Watson',
                avatar: 'https://picsum.photos/seed/1/40/40',
                preview: 'Hey, check out my new video!',
                time: '2m ago',
                unread: true
            },
            {
                id: 2,
                sender: 'Chris Evans',
                avatar: 'https://picsum.photos/seed/2/40/40',
                preview: 'Thanks for the feedback on my last post',
                time: '1h ago',
                unread: true
            },
            {
                id: 3,
                sender: 'Scarlett Johansson',
                avatar: 'https://picsum.photos/seed/3/40/40',
                preview: 'Would love to collaborate on a video',
                time: '3h ago',
                unread: true
            },
            {
                id: 4,
                sender: 'Robert Downey Jr',
                avatar: 'https://picsum.photos/seed/4/40/40',
                preview: 'Great content! Keep it up!',
                time: '5h ago',
                unread: false
            },
            {
                id: 5,
                sender: 'Tom Holland',
                avatar: 'https://picsum.photos/seed/5/40/40',
                preview: 'Let\'s plan that collab we talked about',
                time: '6h ago',
                unread: false
            },
            {
                id: 6,
                sender: 'Zendaya',
                avatar: 'https://picsum.photos/seed/6/40/40',
                preview: 'The edit looks amazing! 🔥',
                time: '7h ago',
                unread: false
            },
            {
                id: 7,
                sender: 'Mark Ruffalo',
                avatar: 'https://picsum.photos/seed/7/40/40',
                preview: 'Can you check out my latest upload?',
                time: '8h ago',
                unread: false
            },
            {
                id: 8,
                sender: 'Elizabeth Olsen',
                avatar: 'https://picsum.photos/seed/8/40/40',
                preview: 'Thanks for the shoutout!',
                time: '9h ago',
                unread: false
            },
            {
                id: 9,
                sender: 'Tom Hiddleston',
                avatar: 'https://picsum.photos/seed/9/40/40',
                preview: 'That effect was incredible',
                time: '10h ago',
                unread: false
            },
            {
                id: 10,
                sender: 'Benedict Cumberbatch',
                avatar: 'https://picsum.photos/seed/10/40/40',
                preview: 'Looking forward to our next project',
                time: '11h ago',
                unread: false
            }
        ];
        
        this.render();
        this.initializeEventListeners();
    }

    render() {
        const messageBtn = document.querySelector('.message-btn');
        if (!messageBtn) return;

        // Create popup container
        const popup = document.createElement('div');
        popup.className = 'message-popup';
        
        // Add popup content
        popup.innerHTML = `
            <div class="message-header">
                <h3>Messages</h3>
                <span class="message-count">${this.messages.filter(m => m.unread).length} new</span>
            </div>
            <div class="message-list">
                ${this.messages.map(message => `
                    <div class="message-item" data-id="${message.id}">
                        <div class="message-avatar">
                            <img src="${message.avatar}" alt="${message.sender}">
                        </div>
                        <div class="message-content">
                            <span class="message-sender">${message.sender}</span>
                            <div class="message-preview">${message.preview}</div>
                        </div>
                        <span class="message-time">${message.time}</span>
                        ${message.unread ? '<div class="message-status"></div>' : ''}
                    </div>
                `).join('')}
            </div>
        `;

        // Insert popup after message button
        messageBtn.parentNode.insertBefore(popup, messageBtn.nextSibling);
    }

    initializeEventListeners() {
        const messageBtn = document.querySelector('.message-btn');
        const popup = document.querySelector('.message-popup');
        if (!messageBtn || !popup) return;

        messageBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            popup.classList.toggle('active');
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!popup.contains(e.target) && !messageBtn.contains(e.target)) {
                popup.classList.remove('active');
            }
        });

        // Handle message clicks
        const messageItems = popup.querySelectorAll('.message-item');
        messageItems.forEach(item => {
            item.addEventListener('click', () => {
                const messageId = item.dataset.id;
                const status = item.querySelector('.message-status');
                if (status) {
                    status.remove();
                    this.updateUnreadCount();
                }
                // Add your message click handling here
                console.log(`Message ${messageId} clicked`);
            });
        });
    }

    updateUnreadCount() {
        const countElement = document.querySelector('.message-count');
        const unreadStatuses = document.querySelectorAll('.message-status');
        if (countElement) {
            countElement.textContent = `${unreadStatuses.length} new`;
        }
    }
} 