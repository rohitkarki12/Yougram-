class SignupModal {
    constructor() {
        this.userService = new UserDataService();
        this.tips = [
            "Create content and share with the world",
            "Join our growing community",
            "Customize your viewing experience",
            "Connect with creators worldwide",
            "Build your own channel",
            "Get personalized recommendations"
        ];
        this.currentTip = 0;
        this.render();
        this.initializeEventListeners();
        this.startTipRotation();
    }

    render() {
        const modal = document.createElement('div');
        modal.className = 'signup-modal';
        modal.innerHTML = `
            <div class="fireflies">
                ${this.generateFireflies(15)}
            </div>
            <div class="modal-split">
                <div class="modal-left">
                    <h1>Join Us!</h1>
                    <div class="tip-container">
                        <p class="tip">${this.tips[0]}</p>
                    </div>
                </div>
                <div class="modal-right">
                    <span class="close-btn">&times;</span>
                    <h2>Create Account</h2>
                    <div class="preview-notice">
                        <i class="fas fa-info-circle"></i>
                        <p>This website is not fully developed yet. You can preview available features.</p>
                    </div>
                    <form novalidate>
                        <div class="form-group">
                            <label for="username">Username</label>
                            <div class="input-with-icon">
                                <i class="fas fa-user"></i>
                                <input type="text" id="username" name="username" required>
                                <span class="error-message">Username is required</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="signup-email">Email</label>
                            <div class="input-with-icon">
                                <i class="fas fa-envelope"></i>
                                <input type="email" id="signup-email" name="email" required>
                                <span class="error-message">Please enter a valid email</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="signup-password">Password</label>
                            <div class="input-with-icon">
                                <i class="fas fa-lock"></i>
                                <input type="password" id="signup-password" name="password" required>
                                <span class="error-message">Password must be at least 8 characters</span>
                            </div>
                        </div>
                        <div class="form-error">
                            <i class="fas fa-exclamation-circle"></i>
                            <span>Please fill in all required fields correctly</span>
                        </div>
                        <button type="submit" class="submit-btn">Create Account</button>
                    </form>
                    <p>Already have an account? <a href="#" class="login-link">Sign In</a></p>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    generateFireflies(count) {
        return Array(count).fill(0).map((_, i) => {
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            return `<div class="firefly" style="left: ${left}%; top: ${top}%;"></div>`;
        }).join('');
    }

    startTipRotation() {
        setInterval(() => {
            const tipElement = document.querySelector('.signup-modal .tip');
            if (!tipElement) return;
            
            tipElement.style.opacity = 0;
            setTimeout(() => {
                this.currentTip = (this.currentTip + 1) % this.tips.length;
                tipElement.textContent = this.tips[this.currentTip];
                tipElement.style.opacity = 1;
            }, 500);
        }, 5000);
    }

    initializeEventListeners() {
        const modal = document.querySelector('.signup-modal');
        const closeBtn = modal.querySelector('.close-btn');
        const form = modal.querySelector('form');
        const loginLink = modal.querySelector('.login-link');
        const usernameInput = form.querySelector('#username');
        const emailInput = form.querySelector('#signup-email');
        const passwordInput = form.querySelector('#signup-password');
        const formError = form.querySelector('.form-error');

        // Input validation
        const validateEmail = (email) => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        };

        const validatePassword = (password) => {
            return password.length >= 8;
        };

        const validateUsername = (username) => {
            return username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);
        };

        const validateForm = () => {
            let isValid = true;
            
            // Username validation
            if (!usernameInput.value || !validateUsername(usernameInput.value)) {
                usernameInput.parentElement.classList.add('error');
                isValid = false;
            } else {
                usernameInput.parentElement.classList.remove('error');
            }
            
            // Email validation
            if (!emailInput.value || !validateEmail(emailInput.value)) {
                emailInput.parentElement.classList.add('error');
                isValid = false;
            } else {
                emailInput.parentElement.classList.remove('error');
            }
            
            // Password validation
            if (!passwordInput.value || !validatePassword(passwordInput.value)) {
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
        usernameInput.addEventListener('input', () => {
            if (usernameInput.value && validateUsername(usernameInput.value)) {
                usernameInput.parentElement.classList.remove('error');
            }
            validateForm();
        });

        emailInput.addEventListener('input', () => {
            if (emailInput.value && validateEmail(emailInput.value)) {
                emailInput.parentElement.classList.remove('error');
            }
            validateForm();
        });

        passwordInput.addEventListener('input', () => {
            if (passwordInput.value && validatePassword(passwordInput.value)) {
                passwordInput.parentElement.classList.remove('error');
            }
            validateForm();
        });

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

        // Switch to login modal
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.remove('active');
            const loginModal = new LoginModal();
            loginModal.open();
        });

        // Handle form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateForm()) {
                const username = usernameInput.value;
                const email = emailInput.value;
                const password = passwordInput.value;

                const result = this.userService.registerUser(username, email, password);
                
                if (result.success) {
                    console.log('Signup successful');
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                    // Automatically log in the user
                    document.dispatchEvent(new CustomEvent('userLoggedIn', { 
                        detail: result.user 
                    }));
                } else {
                    this.showError(result.message);
                }
            }
        });
    }

    open() {
        const modal = document.querySelector('.signup-modal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    showError(message) {
        const formError = document.querySelector('.signup-modal .form-error');
        formError.querySelector('span').textContent = message;
        formError.classList.add('show');
        
        // Hide error after 3 seconds
        setTimeout(() => {
            formError.classList.remove('show');
        }, 3000);
    }
} 