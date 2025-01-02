class VideoCard {
    constructor(data) {
        this.data = data;
    }

    render() {
        return `
            <div class="video-card">
                <div class="thumbnail-container">
                    <img class="thumbnail" src="${this.data.thumbnail}" alt="${this.data.title}">
                    <div class="duration">${this.data.duration}</div>
                </div>
                <div class="video-info">
                    <div class="channel-avatar">
                        <img src="${this.data.channelAvatar}" alt="${this.data.channelName}">
                    </div>
                    <div class="video-details">
                        <h3 class="video-title">${this.data.title}</h3>
                        <div class="channel-name">${this.data.channelName}</div>
                        <div class="video-meta">
                            <span>${this.data.views} views</span>
                            <span>•</span>
                            <span>${this.data.timestamp}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
} 