class TutorialModal {
    constructor() {
        this.shapes = [];
        this.steps = [
            {
                title: "Welcome to YouGram!",
                description: "Get ready for an amazing journey through content creation and discovery.",
                icon: ""
            }
        ];
        this.currentStep = 0;
        this.render();
        this.initializeEventListeners();
        this.startFloatingAnimation();
        this.initializeShapeCollisions();
        document.body.classList.add('tutorial-active');
        // Disable sidebar trigger during tutorial
        const sidebarTrigger = document.querySelector('.sidebar-trigger');
        if (sidebarTrigger) {
            sidebarTrigger.style.pointerEvents = 'none';
            sidebarTrigger.style.opacity = '0';
        }
        // Close sidebar if it's open
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.remove('expanded');
        }
        // Add entrance animation class
        const modal = document.querySelector('.tutorial-modal');
        requestAnimationFrame(() => {
            modal.classList.add('active');
        });
    }

    render() {
        const modal = document.createElement('div');
        modal.className = 'tutorial-modal';
        modal.innerHTML = `
            <div class="tutorial-overlay"></div>
            <div class="tutorial-content">
                <div class="glow-shapes">
                    ${this.generateGlowShapes()}
                </div>
                <div class="glow-shapes-foreground">
                    ${this.generateForegroundShapes()}
                </div>
                <h2 class="tutorial-title">${this.steps[0].title}</h2>
                <p class="tutorial-description">${this.steps[0].description}</p>
                <div class="tutorial-buttons">
                    <button class="skip-btn">Skip</button>
                    <button class="start-btn">Let's Go!</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    generateGlowShapes() {
        const shapes = [];
        // Add circles
        for (let i = 0; i < 3; i++) {
            shapes.push(`
                <div class="glow-circle" style="
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation-delay: ${Math.random() * 3}s;
                    width: ${20 + Math.random() * 30}px;
                    height: ${20 + Math.random() * 30}px;
                "></div>
            `);
        }
        // Add squares
        for (let i = 0; i < 3; i++) {
            shapes.push(`
                <div class="glow-square" style="
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation-delay: ${Math.random() * 3}s;
                    width: ${15 + Math.random() * 25}px;
                    height: ${15 + Math.random() * 25}px;
                "></div>
            `);
        }
        return shapes.join('');
    }

    generateForegroundShapes() {
        const shapes = [];
        // Add foreground circles
        for (let i = 0; i < 2; i++) {
            shapes.push(`
                <div class="glow-circle-foreground" style="
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation-delay: ${Math.random() * 2}s;
                    width: ${15 + Math.random() * 20}px;
                    height: ${15 + Math.random() * 20}px;
                "></div>
            `);
        }
        // Add foreground squares
        for (let i = 0; i < 2; i++) {
            shapes.push(`
                <div class="glow-square-foreground" style="
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation-delay: ${Math.random() * 2}s;
                    width: ${10 + Math.random() * 15}px;
                    height: ${10 + Math.random() * 15}px;
                "></div>
            `);
        }
        return shapes.join('');
    }

    startFloatingAnimation() {
        const content = document.querySelector('.tutorial-content');
        let floatY = 0;
        let time = 0;
        const animate = () => {
            if (content) {
                // Use sine wave for smooth up and down motion
                time += 0.07; // Slower increment for smoother motion
                floatY = Math.sin(time) * 8; // Increased amplitude for more noticeable movement
                content.style.transform = `translateY(${floatY}px)`;
            }
            this.animationFrame = requestAnimationFrame(animate);
        };
        animate();
    }

    initializeEventListeners() {
        const modal = document.querySelector('.tutorial-modal');
        const skipBtn = modal.querySelector('.skip-btn');
        const startBtn = modal.querySelector('.start-btn');

        skipBtn.addEventListener('click', () => this.close());
        startBtn.addEventListener('click', () => {
            this.showPreviewMessage();
        });
    }

    showPreviewMessage() {
        const content = document.querySelector('.tutorial-content');
        
        // Fade out existing content
        content.style.transition = 'opacity 0.5s ease';
        content.style.opacity = '0';
        
        setTimeout(() => {
            content.innerHTML = `
                <div class="preview-message">
                    <div class="message-wrapper">
                        <div class="message-line">This website is not</div>
                        <div class="message-line">fully developed yet.</div>
                        <div class="message-line highlight">You can preview it</div>
                        <div class="message-line">with some features!</div>
                    </div>
                    <button class="continue-btn">Continue</button>
                </div>
            `;
            
            // Fade in new content
            content.style.opacity = '1';
            
            // Add continue button listener
            const continueBtn = content.querySelector('.continue-btn');
            continueBtn.addEventListener('click', () => this.showSidebarHint());
            
            // Trigger text animation
            const lines = content.querySelectorAll('.message-line');
            lines.forEach((line, index) => {
                line.style.animation = `slideIn 0.6s ${index * 0.15}s forwards`;
            });
        }, 500);
    }

    showSidebarHint() {
        document.body.classList.remove('tutorial-active');
        const sidebarTrigger = document.querySelector('.sidebar-trigger');
        if (sidebarTrigger) {
            sidebarTrigger.style.pointerEvents = 'auto';
            sidebarTrigger.style.opacity = '1';
        }
        
        const content = document.querySelector('.tutorial-content');
        content.style.opacity = '0';
        
        setTimeout(() => {
            content.innerHTML = `
                <div class="sidebar-hint">
                    <i class="fas fa-arrow-left"></i>
                    <p>Hover here to access sidebar</p>
                    <span class="hint-note">Note: Only About button is functional</span>
                </div>
            `;
            content.style.opacity = '1';
            
            // Position the hint near the sidebar trigger
            content.style.position = 'fixed';
            content.style.left = '80px';
            content.style.top = '50%';
            content.style.transform = 'translateY(-50%)';
            
            setTimeout(() => {
                this.close();
            }, 4000); // Close after 4 seconds
        }, 500);
    }

    initializeShapeCollisions() {
        // Initialize shape positions and velocities
        const shapes = document.querySelectorAll('.glow-circle-foreground, .glow-square-foreground');
        this.shapes = Array.from(shapes).map(shape => ({
            element: shape,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            hue: 0 // For color shifting
        }));

        this.animateShapes();
    }

    animateShapes() {
        const checkCollision = (shape1, shape2) => {
            const rect1 = shape1.element.getBoundingClientRect();
            const rect2 = shape2.element.getBoundingClientRect();
            return !(rect1.right < rect2.left || 
                    rect1.left > rect2.right || 
                    rect1.bottom < rect2.top || 
                    rect1.top > rect2.bottom);
        };

        const animate = () => {
            // Update positions
            this.shapes.forEach(shape => {
                shape.x += shape.vx;
                shape.y += shape.vy;

                // Bounce off walls
                if (shape.x < 0 || shape.x > window.innerWidth) shape.vx *= -1;
                if (shape.y < 0 || shape.y > window.innerHeight) shape.vy *= -1;

                // Apply position
                shape.element.style.transform = `translate(${shape.x}px, ${shape.y}px)`;
            });

            // Check collisions
            for (let i = 0; i < this.shapes.length; i++) {
                for (let j = i + 1; j < this.shapes.length; j++) {
                    if (checkCollision(this.shapes[i], this.shapes[j])) {
                        // Swap velocities for bounce effect
                        [this.shapes[i].vx, this.shapes[j].vx] = [this.shapes[j].vx, this.shapes[i].vx];
                        [this.shapes[i].vy, this.shapes[j].vy] = [this.shapes[j].vy, this.shapes[i].vy];

                        // Change colors on collision
                        this.shapes[i].hue = (this.shapes[i].hue + 30) % 360;
                        this.shapes[j].hue = (this.shapes[j].hue + 30) % 360;

                        // Apply color changes
                        this.shapes[i].element.style.background = `hsla(${this.shapes[i].hue}, 70%, 60%, 0.3)`;
                        this.shapes[j].element.style.background = `hsla(${this.shapes[j].hue}, 70%, 60%, 0.3)`;
                        
                        // Add collision effect
                        this.shapes[i].element.style.filter = 'blur(4px) brightness(1.5)';
                        this.shapes[j].element.style.filter = 'blur(4px) brightness(1.5)';
                        
                        // Reset filter after animation
                        setTimeout(() => {
                            this.shapes[i].element.style.filter = 'blur(4px)';
                            this.shapes[j].element.style.filter = 'blur(4px)';
                        }, 200);
                    }
                }
            }

            this.collisionFrame = requestAnimationFrame(animate);
        };

        animate();
    }

    close() {
        const modal = document.querySelector('.tutorial-modal');
        modal.classList.add('closing');
        cancelAnimationFrame(this.animationFrame);
        cancelAnimationFrame(this.collisionFrame);
        
        document.body.classList.remove('tutorial-active');
        
        // Re-enable sidebar trigger after tutorial
        const sidebarTrigger = document.querySelector('.sidebar-trigger');
        if (sidebarTrigger) {
            sidebarTrigger.style.pointerEvents = 'auto';
            sidebarTrigger.style.opacity = '1';
        }
        
        setTimeout(() => {
            modal.remove();
        }, 500);
    }

    show() {
        this.startFloatingAnimation();
        document.body.classList.add('tutorial-active');
        // Disable sidebar trigger during tutorial
        const sidebarTrigger = document.querySelector('.sidebar-trigger');
        if (sidebarTrigger) {
            sidebarTrigger.style.pointerEvents = 'none';
            sidebarTrigger.style.opacity = '0';
        }
        // Close sidebar if it's open
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.remove('expanded');
        }
        // Add entrance animation class
        const modal = document.querySelector('.tutorial-modal');
        requestAnimationFrame(() => {
            modal.classList.add('active');
        });
    }
} 