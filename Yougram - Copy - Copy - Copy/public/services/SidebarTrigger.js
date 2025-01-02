class SidebarTrigger {
    constructor() {
        this.sidebar = document.querySelector('.sidebar');
        this.trigger = document.querySelector('.sidebar-trigger');
        this.isExpanded = false;
        this.isAnimating = false;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Click handler for the trigger
        this.trigger.addEventListener('click', () => {
            this.toggleSidebar();
        });

        // Mouse hover handler for auto-open
        document.addEventListener('mousemove', (e) => {
            if (this.isAnimating) return;
            
            if (e.clientX <= 24 && !this.isExpanded) {
                this.openSidebar();
            } else if (e.clientX > 240 && this.isExpanded) {
                this.closeSidebar();
            }
        });
    }

    toggleSidebar() {
        if (this.isExpanded) {
            this.closeSidebar();
        } else {
            this.openSidebar();
        }
    }

    openSidebar() {
        if (this.isExpanded || this.isAnimating) return;
        
        this.isAnimating = true;
        this.isExpanded = true;
        
        this.sidebar.style.transition = 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        this.sidebar.classList.add('expanded');
        
        // Wait for fade out animation to complete
        setTimeout(() => {
            this.trigger.classList.add('hidden');
            this.isAnimating = false;
            this.sidebar.style.transition = '';
        }, 300);
    }

    closeSidebar() {
        if (!this.isExpanded || this.isAnimating) return;
        
        this.isAnimating = true;
        this.isExpanded = false;
        
        this.sidebar.style.transition = 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        this.sidebar.classList.remove('expanded');
        
        // Show and fade in the trigger
        this.trigger.classList.remove('hidden');
        this.trigger.style.animation = 'none';
        // Force reflow
        this.trigger.offsetHeight;
        this.trigger.style.animation = 'fadeInArrow 0.3s ease forwards';
        
        setTimeout(() => {
            this.isAnimating = false;
            this.sidebar.style.transition = '';
        }, 400);
    }
} 