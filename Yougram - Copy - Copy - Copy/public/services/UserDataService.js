class UserDataService {
    constructor() {
        this.users = this.loadUsers();
        this.loginAttempts = new Map(); // Track login attempts
        this.currentUser = this.loadCurrentUser();
    }

    loadUsers() {
        const savedUsers = localStorage.getItem('users');
        return savedUsers ? JSON.parse(savedUsers) : [];
    }

    saveUsers() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    findUserByEmail(email) {
        return this.users.find(user => user.email.toLowerCase() === email.toLowerCase());
    }

    findUserByUsername(username) {
        return this.users.find(user => user.username.toLowerCase() === username.toLowerCase());
    }

    isEmailTaken(email) {
        return this.users.some(user => user.email.toLowerCase() === email.toLowerCase());
    }

    isUsernameTaken(username) {
        return this.users.some(user => user.username.toLowerCase() === username.toLowerCase());
    }

    validateLogin(emailOrUsername, password) {
        const user = this.findUserByEmail(emailOrUsername) || this.findUserByUsername(emailOrUsername);
        
        if (!user) {
            return { success: false, message: "Account not found" };
        }

        if (user.password !== password) {
            // Track failed attempts
            const key = emailOrUsername.toLowerCase();
            const attempts = this.loginAttempts.get(key) || 0;
            this.loginAttempts.set(key, attempts + 1);

            return { 
                success: false, 
                message: "Incorrect password",
                attempts: attempts + 1
            };
        }

        // Reset attempts on successful login
        this.loginAttempts.delete(emailOrUsername.toLowerCase());
        this.currentUser = user;
        this.saveCurrentUser(user);
        return { success: true, user };
    }

    registerUser(username, email, password) {
        if (this.isUsernameTaken(username)) {
            return { success: false, message: "Username is already taken" };
        }

        if (this.isEmailTaken(email)) {
            return { success: false, message: "Email is already registered" };
        }

        const newUser = { username, email, password };
        this.users.push(newUser);
        this.saveUsers();
        this.currentUser = newUser;
        this.saveCurrentUser(newUser);
        return { success: true, user: newUser };
    }

    getLoginAttempts(emailOrUsername) {
        return this.loginAttempts.get(emailOrUsername.toLowerCase()) || 0;
    }

    loadCurrentUser() {
        const savedUser = localStorage.getItem('currentUser');
        return savedUser ? JSON.parse(savedUser) : null;
    }

    saveCurrentUser(user) {
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
            localStorage.removeItem('currentUser');
        }
    }

    logout() {
        this.currentUser = null;
        this.saveCurrentUser(null);
    }

    isLoggedIn() {
        return !!this.currentUser;
    }

    getCurrentUser() {
        return this.currentUser;
    }
} 