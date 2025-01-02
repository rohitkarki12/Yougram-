window.chatFlows = {
    // Core emotional keywords for smart detection
    emotions: {
        positive: ['happy', 'good', 'great', 'awesome', 'nice', 'love', 'excited'],
        negative: ['sad', 'bad', 'terrible', 'upset', 'angry', 'hate', 'tired', 'sick'],
        neutral: ['okay', 'fine', 'alright', 'meh']
    },

    // Enhanced greeting flow with more natural responses
    greetings: {
        triggers: ['hi', 'hello', 'hey', 'sup', 'yo'],
        responses: [
            'Hello! How are you feeling today? 👋',
            'Hi there! What\'s on your mind? 😊',
            'Hey! How\'s your day going? ✨'
        ],
        nextExpected: ['how are you', 'help', 'what can you do', '*emotion*'],
        context: 'greeting',
        followUp: {
            default: "Would you like to see some videos that match your mood? 🎥"
        }
    },

    // Emotional response system
    emotional: {
        sad: {
            triggers: ['sad', 'depressed', 'down', 'unhappy', 'feeling low', 'not good'],
            responses: [
                "I hear you're feeling down. Sometimes watching uplifting content helps. Would you like to see some positive videos? 🌈",
                "It's okay to feel sad sometimes. How about we find something to cheer you up? 🌟",
                "I'm here to listen. Would you like to explore some mood-lifting content together? 💫"
            ],
            followUp: {
                yes: [
                    "Great! I have some heartwarming videos that might help. What interests you more: cute animals 🐱, inspiring stories 🌟, or funny moments 😊?",
                    "Perfect! I know just what might help. Would you prefer watching: motivational content 💪, peaceful nature videos 🌿, or happy music videos 🎵?"
                ],
                no: [
                    "That's okay. Sometimes just talking helps. What's been on your mind lately? 💭",
                    "I understand. Would you like to talk about what's making you feel this way? I'm here to listen 👂"
                ]
            },
            context: 'emotional_support'
        },
        happy: {
            triggers: ['happy', 'great', 'amazing', 'wonderful', 'good', 'excited'],
            responses: [
                "That's fantastic! Want to make your day even better with some awesome content? ✨",
                "Love that energy! Shall we find some videos to match your mood? 🌟",
                "Wonderful! Would you like to explore some trending content that's making others happy too? 🎉"
            ],
            context: 'mood_enhancement'
        }
    },

    // Interest-based conversations
    interests: {
        triggers: ['like', 'love', 'enjoy', 'favorite', 'into'],
        responses: [
            "That's interesting! I can help you find more content about that. What aspect interests you most? 🤔",
            "Great taste! Would you like to explore similar content from top creators? ✨",
            "I know some amazing channels about that! Want me to show you? 🌟"
        ],
        context: 'interest_exploration'
    },

    // Smart fallbacks that keep conversation going
    fallback: {
        outOfContext: [
            "Interesting thought! That reminds me of some amazing videos I know. Would you like to see them? 🤔",
            "While I'm not sure about that specifically, I might have something related you'd enjoy! Want to explore? ✨",
            "That's a unique perspective! It makes me think of some fascinating content. Shall I share? 🌟"
        ],
        unknown: [
            "I'm curious to learn more about what you mean! Could you tell me what interests you about that? 💭",
            "That's intriguing! Would you like to explore some related content together? 🔍",
            "While I'm still learning, I'd love to help you find something you'd enjoy! What kind of content do you usually like? ✨"
        ],
        continuation: {
            questions: [
                "What kind of videos do you usually enjoy watching? 🎥",
                "Are you looking for something specific today? 🔍",
                "Would you like to explore trending content in any particular category? 🌟"
            ],
            suggestions: [
                "I could show you some popular videos in different categories! Interested? ✨",
                "How about we explore some trending content together? 🚀",
                "I know some amazing channels you might like! Want to see? 💫"
            ]
        }
    },

    // Helper function to detect emotion in any message
    detectEmotion: function(message) {
        const words = message.toLowerCase().split(' ');
        for (const word of words) {
            if (this.emotions.positive.includes(word)) return 'positive';
            if (this.emotions.negative.includes(word)) return 'negative';
            if (this.emotions.neutral.includes(word)) return 'neutral';
        }
        return null;
    }
}; 