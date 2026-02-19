import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../api/mockApi";
import { useAuth } from "../../context/AuthContext";
import "./ClubDetails.css";

const CLUB_VIDEOS = {
  "1": "/videos/ClubVedio.mp4",
  "2": "/videos/PhotoGraphy.mp4",
};

const ClubDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAdmin, isAuthenticated } = useAuth();
  
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Edit mode states
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    image: "",
    description: "",
  });
  const [newEvent, setNewEvent] = useState({ 
    title: "", 
    description: "", 
    date: "",
    imageUrl: "" 
  });
  const [newPost, setNewPost] = useState({ 
    title: "", 
    description: "",
    imageUrl: ""
  });
  const [isTransparentTheme, setIsTransparentTheme] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchClubDetails = async () => {
      try {
        setLoading(true);
        const data = await api.getClubDetails(id);
        setClub(data);
        setEditForm({
          image: data.image || "",
          description: data.description || "",
        });
      } catch (err) {
        console.error("Error fetching club details:", err);
        setError("Failed to load club details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchClubDetails();
    }
  }, [id]);

  const handleSaveDetails = async () => {
    setSaving(true);
    try {
      const updated = await api.updateClubDetails(id, editForm);
      setClub(updated);
      setIsEditMode(false);
    } catch (err) {
      console.error("Error updating club:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.description || !newEvent.date) return;
    
    setSaving(true);
    try {
      // Build event data with image if provided
      const eventData = {
        title: newEvent.title,
        description: newEvent.description,
        date: newEvent.date,
        eventType: "main",
        images: newEvent.imageUrl ? [{
          url: newEvent.imageUrl,
          public_id: "manual_" + Date.now(),
          caption: "",
          uploadedAt: new Date()
        }] : []
      };
      
      const event = await api.addEvent(id, eventData);
      setClub(prev => ({
        ...prev,
        events: [...(prev.events || []), event]
      }));
      setNewEvent({ title: "", description: "", date: "", imageUrl: "" });
    } catch (err) {
      console.error("Error adding event:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.description) return;
    
    setSaving(true);
    try {
      // Build post data with image if provided
      const postData = {
        title: newPost.title,
        description: newPost.description,
        eventType: "post",
        images: newPost.imageUrl ? [{
          url: newPost.imageUrl,
          public_id: "manual_" + Date.now(),
          caption: "",
          uploadedAt: new Date()
        }] : []
      };
      
      const post = await api.addPost(id, postData);
      setClub(prev => ({
        ...prev,
        events: [...(prev.events || []), post]
      }));
      setNewPost({ title: "", description: "", imageUrl: "" });
    } catch (err) {
      console.error("Error adding post:", err);
    } finally {
      setSaving(false);
    }
  };

  const toggleTheme = () => {
    setIsTransparentTheme(!isTransparentTheme);
  };

  const clubVideo = CLUB_VIDEOS[id];
  const showVideo = !!clubVideo;

  if (loading) {
    return (
      <div className="club-details-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p style={{color: 'white', marginTop: '10px'}}>Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !club) {
    return (
      <div className="club-details-page">
        <div className="loading-container">
          <h2 style={{color: 'white'}}>Club Not Found</h2>
          <button onClick={() => navigate("/")} style={{marginTop: '10px', padding: '8px 16px'}}>Back</button>
        </div>
      </div>
    );
  }

  const upcomingEvents = club.events?.filter(e => e.eventType === "main" && (e.status === "upcoming" || e.status === "ongoing")) || [];
  const pastEvents = club.events?.filter(e => (e.eventType === "main" || e.eventType === "post") && e.status === "completed") || [];

  // Helper to render images for an event/post
  const renderEventImages = (event) => {
    if (!event.images || event.images.length === 0) return null;
    
    return (
      <div className="event-images">
        {event.images.map((img, idx) => (
          <img 
            key={idx} 
            src={img.url} 
            alt={img.caption || event.title} 
            className="event-image"
          />
        ))}
      </div>
    );
  };

  return (
    <div className={`club-details-page ${isTransparentTheme ? 'transparent-theme' : 'solid-theme'}`}>
      <div className="club-bg-layer">
        {showVideo ? (
          <video autoPlay loop muted playsInline className="club-bg-video">
            <source src={clubVideo} type="video/mp4" />
          </video>
        ) : (
          <img src={club.image} alt={club.clubname} className="club-bg-image" />
        )}
        <div className="club-bg-overlay"></div>
      </div>

      <header className="club-header">
        <div className="header-left">
          {isAuthenticated ? (
            <div className="user-profile-btn">
              <div className="profile-avatar">{user?.fullName?.charAt(0) || "U"}</div>
              <span className="profile-name">{user?.fullName}</span>
              {isAdmin && <span className="admin-badge">ADMIN</span>}
            </div>
          ) : (
            <Link to="/login" className="login-btn">Login</Link>
          )}
        </div>
        
        <div className="header-center">
          <h1 className="header-club-name">{club.clubname}</h1>
        </div>
        
        <div className="header-right">
          <button onClick={() => navigate("/")} className="home-btn">Home</button>
          {isAdmin && (
            <>
              <button 
                onClick={() => setIsEditMode(!isEditMode)} 
                className={`edit-btn ${isEditMode ? 'active' : ''}`}
              >
                {isEditMode ? 'Cancel' : 'Edit'}
              </button>
              <button onClick={toggleTheme} className="theme-btn" title="Toggle Theme">
                {isTransparentTheme ? '◐' : '◑'}
              </button>
            </>
          )}
        </div>
      </header>

      {/* Admin Edit Panel */}
      {isAdmin && isEditMode && (
        <div className="admin-edit-panel">
          <h3 className="edit-panel-title">Admin Controls</h3>
          
          {/* Profile Edit Section */}
          <div className="edit-section">
            <h4>Edit Profile</h4>
            <div className="edit-form-group">
              <label>Profile Image URL:</label>
              <input
                type="text"
                value={editForm.image}
                onChange={(e) => setEditForm({...editForm, image: e.target.value})}
                placeholder="Enter image URL"
              />
            </div>
            <div className="edit-form-group">
              <label>Description:</label>
              <textarea
                value={editForm.description}
                onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                placeholder="Enter club description"
                rows="3"
              />
            </div>
            <button 
              onClick={handleSaveDetails} 
              className="save-btn"
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

          {/* Add Event Section */}
          <div className="edit-section">
            <h4>Add Upcoming Event</h4>
            <form onSubmit={handleAddEvent} className="add-form">
              <input
                type="text"
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                placeholder="Event title"
                required
              />
              <input
                type="text"
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                placeholder="Event description"
                required
              />
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                required
              />
              <input
                type="text"
                value={newEvent.imageUrl}
                onChange={(e) => setNewEvent({...newEvent, imageUrl: e.target.value})}
                placeholder="Event Image URL (optional)"
              />
              <button type="submit" className="add-btn" disabled={saving}>
                {saving ? 'Adding...' : 'Add Event'}
              </button>
            </form>
          </div>

          {/* Add Post Section */}
          <div className="edit-section">
            <h4>Add Post</h4>
            <form onSubmit={handleAddPost} className="add-form">
              <input
                type="text"
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                placeholder="Post title"
                required
              />
              <textarea
                value={newPost.description}
                onChange={(e) => setNewPost({...newPost, description: e.target.value})}
                placeholder="Post description"
                rows="2"
                required
              />
              <input
                type="text"
                value={newPost.imageUrl}
                onChange={(e) => setNewPost({...newPost, imageUrl: e.target.value})}
                placeholder="Post Image URL (optional)"
              />
              <button type="submit" className="add-btn" disabled={saving}>
                {saving ? 'Posting...' : 'Add Post'}
              </button>
            </form>
          </div>
        </div>
      )}
         
      <div className="club-content">
        <div className="content-card" >
          <h2 className="section-heading">Profile</h2>
          <img src={club.image} alt="" className="club-img" />
        </div>  

        <div className="content-card">
          <h2 className="section-heading">About</h2>
          <p className="club-description-text">{club.description}</p>
        </div>

        <div className="content-card">
          <h2 className="section-heading">Upcoming Events</h2>
          {upcomingEvents.length > 0 ? (
            <div className="events-list">
              {upcomingEvents.map((event) => (
                <div key={event._id} className="event-item">
                  {/* Event Images */}
                  {renderEventImages(event)}
                  
                  <div className="event-date-box">
                    <span className="event-day">{new Date(event.date).getDate()}</span>
                    <span className="event-month">{new Date(event.date).toLocaleString("default", { month: "short" })}</span>
                  </div>
                  <div>
                    <h4 className="event-title">{event.title}</h4>
                    <p className="event-desc">{event.description}</p>
                    <span className="event-status upcoming">{event.status}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">No upcoming events</p>
          )}
        </div>

        <div className="content-card">
          <h2 className="section-heading">Posts</h2>
          {pastEvents.length > 0 ? (
            <div className="posts-list">
              {pastEvents.map((post) => (
                <div key={post._id} className="post-item">
                  {/* Post Images */}
                  {renderEventImages(post)}
                  
                  <h4 className="post-title">{post.title}</h4>
                  <p className="post-desc">{post.description}</p>
                  <span className="post-date">{new Date(post.date).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">No posts yet</p>
          )}
        </div>

        {/* Members */}
        <div className="content-card">
          <h2 className="section-heading">Members</h2>
          
          {club.heads && club.heads.length > 0 && (
            <div className="member-group">
              <h3 className="member-role">Club Heads</h3>
              <div className="members-row">
                {club.heads.map((head) => (
                  <div key={head._id} className="member-item">
                    <img src={head.profilePic || "https://via.placeholder.com/35"} alt={head.fullName} className="member-avatar" />
                    <span className="member-name">{head.fullName}</span>
                    <span className="member-badge">Head</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {club.viceHeads && club.viceHeads.length > 0 && (
            <div className="member-group">
              <h3 className="member-role">Vice Heads</h3>
              <div className="members-row">
                {club.viceHeads.map((vh) => (
                  <div key={vh._id} className="member-item">
                    <img src={vh.profilePic || "https://via.placeholder.com/35"} alt={vh.fullName} className="member-avatar" />
                    <span className="member-name">{vh.fullName}</span>
                    <span className="member-badge vice">Vice</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(!club.heads || club.heads.length === 0) && (!club.viceHeads || club.viceHeads.length === 0) && (
            <p className="no-data">No members yet</p>
          )}
        </div>

        <div className="content-card club-footer">
          <p className="footer-text">ClubZ0ne - Connect, Learn, Grow</p>
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;

