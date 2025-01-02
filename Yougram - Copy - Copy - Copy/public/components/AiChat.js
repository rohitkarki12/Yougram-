class AiChat {
    constructor(container) {
        if (AiChat.instance) {
            return AiChat.instance;
        }
        AiChat.instance = this;
        
        this.container = container;
        this.createChatWindow();
        this.initializeEventListeners();
        this.currentContext = null;
        this.conversationHistory = [];
        this.chatFlows = window.chatFlows;
        this.showWelcomeMessage();
    }

    createChatWindow() {
        this.container.innerHTML = `
            <div class="chat-header">
                <div class="ai-avatar">
                    <div class="brain-animation">
                        <div class="synapses"></div>
                        <div class="neural-network"></div>
                    </div>
                </div>
                <div class="ai-status">
                    <span class="ai-name">YouGram AI</span>
                    <span class="ai-status-text">Online</span>
                </div>
            </div>
            <div class="chat-messages">
                <div class="chat-background">
                    <div class="neural-bg"></div>
                </div>
            </div>
            <div class="chat-input">
                <input type="text" placeholder="Ask me anything..." autocomplete="off">
                <button class="send-message">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        `;

        this.messagesContainer = this.container.querySelector('.chat-messages');
        this.input = this.container.querySelector('input');
    }

    showWelcomeMessage() {
        setTimeout(() => {
            this.addMessage('Hi! I\'m your YouGram AI assistant. How can I help you today? ✨', 'ai');
        }, 500);
    }

    initializeEventListeners() {
        const sendButton = this.container.querySelector('.send-message');
        sendButton.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }

    sendMessage() {
        const message = this.input.value.trim();
        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        this.input.value = '';

        // Simulate AI thinking and respond
        setTimeout(() => {
            const response = this.getResponse(message.toLowerCase());
            this.addMessage(response, 'ai');
        }, 500);
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.innerHTML = `
            <div class="message-content">
                ${sender === 'ai' ? '<div class="ai-icon"><i class="fas fa-robot"></i></div>' : ''}
                <div class="message-text">${text}</div>
                <div class="message-time">${new Date().toLocaleTimeString()}</div>
            </div>
        `;
        this.messagesContainer.appendChild(messageDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        if (sender === 'user') {
            this.conversationHistory.push(text);
        }
    }

    getResponse(message) {
        message = message.toLowerCase().trim();
        
        // Check for empty or very short responses
        if (message.length < 3) {
            return this.getRandomResponse(this.chatFlows.fallback.continuation.questions);
        }

        // First, try to detect emotion in the message
        const emotion = this.chatFlows.detectEmotion(message);
        
        // Handle negative responses or dismissive answers
        if (message === 'nothing' || message === 'idk' || message === 'dunno') {
            return "Let me help make things interesting! " + 
                   this.getRandomResponse(this.chatFlows.fallback.continuation.suggestions);
        }

        if (emotion === 'negative') {
            const sadResponse = this.chatFlows.emotional.sad;
            this.currentContext = 'emotional_support';
            return this.getRandomResponse(sadResponse.responses);
        }

        // Check if we're in a conversation context
        if (this.currentContext) {
            const contextResponse = this.handleContextualResponse(message);
            if (contextResponse) return contextResponse;
        }

        // Check for greetings first
        if (this.chatFlows.greetings.triggers.includes(message)) {
            this.currentContext = 'greeting';
            return this.getRandomResponse(this.chatFlows.greetings.responses);
        }

        // Rest of the flow checks...
        for (const [flowKey, flow] of Object.entries(this.chatFlows)) {
            if (flowKey === 'fallback' || flowKey === 'emotions' || typeof flow !== 'object') continue;

            if (this.matchesTriggers(message, flow.triggers)) {
                this.currentContext = flow.context;
                return this.getRandomResponse(flow.responses);
            }
        }

        // If nothing matches, use smart fallback
        return this.getRandomResponse(this.chatFlows.fallback.continuation.questions);
    }

    handleContextualResponse(message) {
        // If in greeting context and get dismissive response, try to engage
        if (this.currentContext === 'greeting' && 
            (message === 'nothing' || message === 'idk' || message === 'dunno')) {
            return "That's okay! " + this.getRandomResponse(this.chatFlows.fallback.continuation.suggestions);
        }

        // Rest of contextual handling...
        return null;
    }

    findNextFlow(message) {
        // Look for matching flow based on message content
        for (const flow of Object.values(this.chatFlows)) {
            if (this.matchesTriggers(message, flow.triggers)) {
                return flow;
            }
        }
        return null;
    }

    matchesTriggers(message, triggers) {
        if (!triggers) return false;
        return triggers.some(trigger => message.includes(trigger));
    }

    getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }
} 