class LoginModal {
    constructor() {
        this.userService = new UserDataService();
        this.welcomeMessages = [
            "Welcome back! We missed you",
            "Great to see you again",
            "Your favorite creators missed you",
            "Ready to explore more content?",
            "Welcome back to YouGram",
            "Catch up on what you missed"
        ];
        this.currentMessage = 0;
        this.render();
        this.initializeEventListeners();
        this.startMessageRotation();
    }

    render() {
        const modal = document.createElement('div');
        modal.className = 'login-modal';
        modal.innerHTML = `
            <div class="fireflies">
                ${this.generateFireflies(15)}
            </div>
            <div class="modal-split">
                <div class="modal-left">
                    <h1>Welcome Back!</h1>
                    <div class="tip-container">
                        <p class="welcome-message">${this.welcomeMessages[0]}</p>
                    </div>
                </div>
                <div class="modal-right">
                    <span class="close-btn">&times;</span>
                    <h2>Sign In</h2>
                    <div class="preview-notice">
                        <i class="fas fa-info-circle"></i>
                        <p>This website is not fully developed yet. You can preview available features.</p>
                    </div>
                    <form novalidate>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <div class="input-with-icon">
                                <i class="fas fa-envelope"></i>
                                <input type="email" id="email" name="email" required>
                                <span class="error-message">Please enter a valid email</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <div class="input-with-icon">
                                <i class="fas fa-lock"></i>
                                <input type="password" id="password" name="password" required>
                                <span class="error-message">Password is required</span>
                            </div>
                        </div>
                        <div class="form-error">
                            <i class="fas fa-exclamation-circle"></i>
                            <span>Please fill in all required fields</span>
                        </div>
                        <button type="submit" class="submit-btn">Sign In</button>
                    </form>
                    <p>Don't have an account? <a href="#" class="signup-link">Sign Up</a></p>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    generateFireflies(count) {
        // Generate fireflies with random initial positions
        return Array(count).fill(0).map((_, i) => {
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            return `<div class="firefly" style="left: ${left}%; top: ${top}%;"></div>`;
        }).join('');
    }

    startMessageRotation() {
        setInterval(() => {
            const messageElement = document.querySelector('.welcome-message');
            if (!messageElement) return;
            
            messageElement.style.opacity = 0;
            setTimeout(() => {
                this.currentMessage = (this.currentMessage + 1) % this.welcomeMessages.length;
                messageElement.textContent = this.welcomeMessages[this.currentMessage];
                messageElement.style.opacity = 1;
            }, 500);
        }, 5000);
    }

    initializeEventListeners() {
        const modal = document.querySelector('.login-modal');
        const closeBtn = modal.querySelector('.close-btn');
        const form = modal.querySelector('form');
        const signupLink = modal.querySelector('.signup-link');
        const emailInput = form.querySelector('#email');
        const passwordInput = form.querySelector('#password');
        const formError = form.querySelector('.form-error');

        // Prevent scrolling when modal is open
        modal.addEventListener('show', () => {
            document.body.style.overflow = 'hidden';
        });

        // Close modal on close button click
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close modal on outside click
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Input validation
        const validateEmail = (email) => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        };

        const validateForm = () => {
            let isValid = true;
            
            // Email validation
            if (!emailInput.value || !validateEmail(emailInput.value)) {
                emailInput.parentElement.classList.add('error');
                isValid = false;
            } else {
                emailInput.parentElement.classList.remove('error');
            }
            
            // Password validation
            if (!passwordInput.value) {
                passwordInput.parentElement.classList.add('error');
                isValid = false;
            } else {
                passwordInput.parentElement.classList.remove('error');
            }

            // Show/hide form error
            if (!isValid) {
                formError.classList.add('show');
            } else {
                formError.classList.remove('show');
            }

            return isValid;
        };

        // Real-time validation
        emailInput.addEventListener('input', () => {
            if (emailInput.value && validateEmail(emailInput.value)) {
                emailInput.parentElement.classList.remove('error');
            }
            validateForm();
        });

        passwordInput.addEventListener('input', () => {
            if (passwordInput.value) {
                passwordInput.parentElement.classList.remove('error');
            }
            validateForm();
        });

        // Handle form submission
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (validateForm()) {
                const emailOrUsername = emailInput.value;
                const password = passwordInput.value;
                
                const result = this.userService.validateLogin(emailOrUsername, password);
                
                if (result.success) {
                    console.log('Login successful');
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                    // Update UI for logged-in state
                    document.dispatchEvent(new CustomEvent('userLoggedIn', { 
                        detail: result.user 
                    }));
                } else {
                    this.showError(result.message);
                    
                    // Check login attempts
                    if (result.attempts >= 3) {
                        this.showSignupPrompt();
                    }
                }
            }
        });

        // Switch to signup modal
        signupLink.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.remove('active');
            const signupModal = new SignupModal();
            signupModal.open();
        });
    }

    open() {
        const modal = document.querySelector('.login-modal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    showError(message) {
        const formError = document.querySelector('.login-modal .form-error');
        formError.querySelector('span').textContent = message;
        formError.classList.add('show');
        
        // Hide error after 3 seconds
        setTimeout(() => {
            formError.classList.remove('show');
        }, 3000);
    }

    showSignupPrompt() {
        const prompt = document.createElement('div');
        prompt.className = 'signup-prompt';
        prompt.innerHTML = `
            <div class="prompt-content">
                <span class="close-prompt">&times;</span>
                <i class="fas fa-user-plus"></i>
                <h3>New to YouGram?</h3>
                <p>Create an account to access all features!</p>
                <button class="prompt-signup-btn">Sign Up Now</button>
            </div>
        `;
        document.body.appendChild(prompt);

        // Add event listeners
        const closeBtn = prompt.querySelector('.close-prompt');
        const signupBtn = prompt.querySelector('.prompt-signup-btn');

        closeBtn.addEventListener('click', () => {
            prompt.remove();
        });

        signupBtn.addEventListener('click', () => {
            prompt.remove();
            this.close();
            const signupModal = new SignupModal();
            signupModal.open();
        });

        // Show with animation
        requestAnimationFrame(() => {
            prompt.classList.add('active');
        });
    }
} 