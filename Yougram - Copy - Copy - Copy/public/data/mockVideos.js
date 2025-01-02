const mockVideos = [
    {
        id: 1,
        thumbnail: 'https://picsum.photos/300/169?random=1',
        title: 'Amazing Video Title That Could Be Two Lines Long',
        channelName: 'Channel Name',
        channelAvatar: 'https://picsum.photos/32/32?random=1',
        duration: '10:30',
        views: '100K',
        timestamp: '2 days ago'
    },
    {
        id: 2,
        thumbnail: 'https://picsum.photos/300/169?random=2',
        title: 'How to Master Web Development in 2024',
        channelName: 'Tech Master',
        channelAvatar: 'https://picsum.photos/32/32?random=2',
        duration: '15:45',
        views: '250K',
        timestamp: '1 week ago'
    },
    {
        id: 3,
        thumbnail: 'https://picsum.photos/300/169?random=3',
        title: 'Top 10 Travel Destinations You Must Visit',
        channelName: 'Travel Guide',
        channelAvatar: 'https://picsum.photos/32/32?random=3',
        duration: '8:20',
        views: '75K',
        timestamp: '3 days ago'
    },
    {
        id: 4,
        thumbnail: 'https://picsum.photos/300/169?random=4',
        title: 'The Future of AI Technology in 2024',
        channelName: 'Tech Insights',
        channelAvatar: 'https://picsum.photos/32/32?random=4',
        duration: '15:45',
        views: '500K',
        timestamp: '1 week ago'
    },
    {
        id: 5,
        thumbnail: 'https://picsum.photos/300/169?random=5',
        title: 'Hidden Gems: Street Food Tour in Bangkok',
        channelName: 'Food Explorer',
        channelAvatar: 'https://picsum.photos/32/32?random=5',
        duration: '21:30',
        views: '750K',
        timestamp: '3 days ago'
    },
    {
        id: 6,
        thumbnail: 'https://picsum.photos/300/169?random=6',
        title: 'Learn Piano in 30 Days - Day 1',
        channelName: 'Music Academy',
        channelAvatar: 'https://picsum.photos/32/32?random=6',
        duration: '25:15',
        views: '1.2M',
        timestamp: '1 month ago'
    },
    {
        id: 7,
        thumbnail: 'https://picsum.photos/300/169?random=7',
        title: 'Epic Mountain Biking Adventure in Nepal',
        channelName: 'Extreme Sports',
        channelAvatar: 'https://picsum.photos/32/32?random=7',
        duration: '18:42',
        views: '300K',
        timestamp: '5 days ago'
    },
    {
        id: 8,
        thumbnail: 'https://picsum.photos/300/169?random=8',
        title: 'Making the Perfect Sourdough Bread',
        channelName: 'Cooking Master',
        channelAvatar: 'https://picsum.photos/32/32?random=8',
        duration: '12:30',
        views: '400K',
        timestamp: '1 day ago'
    },
    {
        id: 9,
        thumbnail: 'https://picsum.photos/300/169?random=9',
        title: 'Understanding Quantum Computing',
        channelName: 'Science Explained',
        channelAvatar: 'https://picsum.photos/32/32?random=9',
        duration: '20:15',
        views: '180K',
        timestamp: '4 days ago'
    },
    {
        id: 10,
        thumbnail: 'https://picsum.photos/300/169?random=10',
        title: 'Daily Workout Routine for Beginners',
        channelName: 'Fitness Pro',
        channelAvatar: 'https://picsum.photos/32/32?random=10',
        duration: '30:00',
        views: '900K',
        timestamp: '2 weeks ago'
    },
    {
        id: 11,
        thumbnail: 'https://picsum.photos/300/169?random=11',
        title: 'Exploring Ancient Ruins in Peru',
        channelName: 'History Channel',
        channelAvatar: 'https://picsum.photos/32/32?random=11',
        duration: '28:45',
        views: '650K',
        timestamp: '6 days ago'
    },
    {
        id: 12,
        thumbnail: 'https://picsum.photos/300/169?random=12',
        title: 'Building a Gaming PC Under $1000',
        channelName: 'Tech Builder',
        channelAvatar: 'https://picsum.photos/32/32?random=12',
        duration: '22:18',
        views: '1.5M',
        timestamp: '2 days ago'
    },
    {
        id: 30,
        thumbnail: 'https://picsum.photos/300/169?random=30',
        title: 'Mastering Photography: Advanced Techniques',
        channelName: 'Photo Pro',
        channelAvatar: 'https://picsum.photos/32/32?random=30',
        duration: '18:22',
        views: '89K',
        timestamp: '5 hours ago'
    },
    {
        id: 13,
        thumbnail: 'https://picsum.photos/300/169?random=13',
        title: 'Making the Perfect Sourdough Bread at Home',
        channelName: 'Culinary Masters',
        channelAvatar: 'https://picsum.photos/32/32?random=13',
        duration: '18:45',
        views: '420K',
        timestamp: '1 day ago'
    },
    {
        id: 14,
        thumbnail: 'https://picsum.photos/300/169?random=14',
        title: 'Advanced CSS Animation Techniques 2024',
        channelName: 'Code Artistry',
        channelAvatar: 'https://picsum.photos/32/32?random=14',
        duration: '25:30',
        views: '180K',
        timestamp: '3 days ago'
    },
    {
        id: 15,
        thumbnail: 'https://picsum.photos/300/169?random=15',
        title: 'Night Photography: Tips & Tricks for Stunning Shots',
        channelName: 'Photo Masters',
        channelAvatar: 'https://picsum.photos/32/32?random=15',
        duration: '16:20',
        views: '290K',
        timestamp: '5 days ago'
    }
]; 