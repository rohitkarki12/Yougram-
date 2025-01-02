class Header {
    constructor() {
        this.render();
    }

    render() {
        const header = document.createElement('header');
        header.className = 'header';
        header.innerHTML = `
            <div class="header-left">
                <div class="logo">
                    <img src="path/to/logo.png" alt="Logo">
                </div>
            </div>
            <div class="header-center">
                <div class="search-container">
                    <input type="text" placeholder="Search...">
                    <button class="search-button">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
            </div>
            <div class="header-right">
                <button class="icon-button">
                    <i class="fas fa-video"></i>
                </button>
                <button class="icon-button">
                    <i class="fas fa-bell"></i>
                </button>
                <button class="icon-button profile-btn" data-tooltip="Profile">
                    <i class="fas fa-user"></i>
                </button>
            </div>
        `;
        document.body.prepend(header);
    }
} 