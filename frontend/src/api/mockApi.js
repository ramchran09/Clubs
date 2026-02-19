// Mock data to simulate backend API responses
// This will be replaced with actual API calls when backend is deployed

const MOCK_CLUBS = [
  {
    _id: "1",
    clubname: "Coding Club",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
    description: "Learn programming, build projects, and collaborate with fellow coders. We organize hackathons, coding competitions, and workshops throughout the year.",
  },
  {
    _id: "2",
    clubname: "Photography Club",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop",
    description: "Capture beautiful moments and enhance your photography skills. Join photo walks, exhibitions, and learn from professional photographers.",
  },
  {
    _id: "3",
    clubname: "Debate Society",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop",
    description: "Sharpen your public speaking and critical thinking skills. Participate in debates, Model UN, and discussion forums.",
  },
  {
    _id: "4",
    clubname: "Music Band",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop",
    description: "Express yourself through music. Whether you play an instrument or sing, join us for jam sessions and live performances.",
  },
  {
    _id: "5",
    clubname: "Drama Club",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=300&fit=crop",
    description: "Explore the world of theater and performing arts. We stage plays, organize acting workshops, and host cultural events.",
  },
];

const MOCK_CLUB_DETAILS = {
  "1": {
    _id: "1",
    clubname: "Coding Club",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
    description: "Learn programming, build projects, and collaborate with fellow coders. We organize hackathons, coding competitions, and workshops throughout the year.",
    heads: [
      { _id: "h1", fullName: "John Smith", profilePic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
      { _id: "h2", fullName: "Sarah Johnson", profilePic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
    ],
    viceHeads: [
      { _id: "vh1", fullName: "Mike Davis", profilePic: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
    ],
    events: [
      { 
        _id: "e1", 
        title: "Hackathon 2024", 
        date: new Date("2024-03-15"), 
        status: "upcoming", 
        description: "24-hour coding competition",
        eventType: "main",
        images: [
          { url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop", public_id: "img1", caption: "Hackathon Event" }
        ]
      },
      { 
        _id: "e2", 
        title: "Python Workshop", 
        date: new Date("2024-02-20"), 
        status: "upcoming", 
        description: "Learn Python basics",
        eventType: "main",
        images: []
      },
      { 
        _id: "e3", 
        title: "Web Dev Bootcamp", 
        date: new Date("2024-01-10"), 
        status: "completed", 
        description: "Intensive web development course",
        eventType: "main",
        images: [
          { url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop", public_id: "img2", caption: "Web Dev Bootcamp" }
        ]
      },
    ],
  },
  "2": {
    _id: "2",
    clubname: "Photography Club",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop",
    description: "Capture beautiful moments and enhance your photography skills. Join photo walks, exhibitions, and learn from professional photographers.",
    heads: [
      { _id: "h3", fullName: "Emily Chen", profilePic: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
    ],
    viceHeads: [
      { _id: "vh2", fullName: "Alex Turner", profilePic: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" },
      { _id: "vh3", fullName: "Lisa Wang", profilePic: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" },
    ],
    events: [
      { 
        _id: "e4", 
        title: "Campus Photo Walk", 
        date: new Date("2024-03-20"), 
        status: "upcoming", 
        description: "Explore campus through your lens",
        eventType: "main",
        images: [
          { url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop", public_id: "img3", caption: "Photo Walk" }
        ]
      },
      { 
        _id: "e5", 
        title: "Portrait Photography Workshop", 
        date: new Date("2024-02-28"), 
        status: "upcoming", 
        description: "Learn portrait techniques",
        eventType: "main",
        images: []
      },
      { 
        _id: "e6", 
        title: "Exhibition 2024", 
        date: new Date("2024-01-15"), 
        status: "completed", 
        description: "Annual photography exhibition",
        eventType: "post",
        images: [
          { url: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop", public_id: "img4", caption: "Exhibition" },
          { url: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=400&h=300&fit=crop", public_id: "img5", caption: "Photos" }
        ]
      },
    ],
  },
};

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// API Functions
export const api = {
  // Get all clubs
  getClubs: async () => {
    await delay(500); // Simulate network delay
    return MOCK_CLUBS;
  },

  // Get club details by ID
  getClubDetails: async (clubId) => {
    await delay(500);
    const club = MOCK_CLUB_DETAILS[clubId];
    if (!club) {
      // Return default data for clubs not in mock
      const basicClub = MOCK_CLUBS.find((c) => c._id === clubId);
      if (!basicClub) throw new Error("Club not found");
      return {
        ...basicClub,
        heads: [],
        viceHeads: [],
        events: [],
      };
    }
    return club;
  },

  // Auth functions
  login: async (email, password) => {
    await delay(500);
    // Mock login - accept any credentials
    if (email && password) {
      // Check if email contains "admin" for admin role
      const role = email.toLowerCase().includes("admin") ? "admin" : "student";
      return {
        _id: "user123",
        fullName: role === "admin" ? "Admin User" : "Student User",
        email,
        role,
        token: "mock-jwt-token",
      };
    }
    throw new Error("Invalid credentials");
  },

  signup: async (fullName, email, password, role = "student") => {
    await delay(500);
    return {
      _id: "user" + Date.now(),
      fullName,
      email,
      role,
      token: "mock-jwt-token",
    };
  },

  checkAuth: async () => {
    await delay(300);
    // Return null if not logged in
    return null;
  },

  logout: async () => {
    await delay(200);
    return { message: "Logged out" };
  },

  // Update club details
  updateClubDetails: async (clubId, updates) => {
    await delay(500);
    const club = MOCK_CLUB_DETAILS[clubId];
    if (club) {
      Object.assign(club, updates);
      return club;
    }
    // For clubs not in mock data, return updated object
    const basicClub = MOCK_CLUBS.find((c) => c._id === clubId);
    if (basicClub) {
      Object.assign(basicClub, updates);
      return { ...basicClub, heads: [], viceHeads: [], events: [] };
    }
    throw new Error("Club not found");
  },

  // Add new event
  addEvent: async (clubId, eventData) => {
    await delay(500);
    const club = MOCK_CLUB_DETAILS[clubId];
    if (club) {
      const newEvent = {
        _id: "e" + Date.now(),
        ...eventData,
        date: new Date(eventData.date),
        status: "upcoming",
      };
      club.events = club.events || [];
      club.events.push(newEvent);
      return newEvent;
    }
    throw new Error("Club not found");
  },

  // Add new post
  addPost: async (clubId, postData) => {
    await delay(500);
    const club = MOCK_CLUB_DETAILS[clubId];
    if (club) {
      const newPost = {
        _id: "p" + Date.now(),
        ...postData,
        date: new Date(),
        status: "completed",
      };
      club.events = club.events || [];
      club.events.push(newPost);
      return newPost;
    }
    throw new Error("Club not found");
  },
};

export default api;

