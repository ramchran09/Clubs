import mongoose from "mongoose";
import User from "../models/user.model.js";
import Club from "../models/club.model.js";
import Event from "../models/event.model.js";


export const removeMember = async (req, res) => {
  try {
    const { clubId, userId } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(clubId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(400).json({ message: "Invalid clubId or userId" });
    }

    const user = await User.findById(userId);
    const club = await Club.findById(clubId);

    if (!user || !club) {
      return res.status(404).json({ message: "User or Club not found" });
    }

    user.clubs = user.clubs.filter(
      c => c.club.toString() !== clubId
    );

    club.members = club.members.filter(
      id => id.toString() !== userId
    );

    club.heads = club.heads.filter(
      id => id.toString() !== userId
    );

    club.viceHeads = club.viceHeads.filter(
      id => id.toString() !== userId
    );

    await Promise.all([user.save(), club.save()]);

    return res.status(200).json({
      message: "Member removed successfully"
    });

  } catch (err) {
    return res.status(500).json({
      message: "Failed to remove member"
    });
  }
};

export const updateMemberRole = async (req, res) => {
  try {
    const { clubId, userId } = req.params;
    const { role, canEdit } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(clubId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(400).json({ message: "Invalid clubId or userId" });
    }

    const allowedRoles = ["Head", "Vice Head", "Member"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (typeof canEdit !== "boolean") {
      return res.status(400).json({ message: "canEdit must be boolean" });
    }

    const user = await User.findById(userId);
    const club = await Club.findById(clubId);

    if (!user || !club) {
      return res.status(404).json({ message: "User or Club not found" });
    }

    let clubEntry = user.clubs.find(
      c => c.club.toString() === clubId
    );

    if (!clubEntry) {
      user.clubs.push({
        club: club._id,
        role,
        canEdit
      });
    } else {
      clubEntry.role = role;
      clubEntry.canEdit = canEdit;
    }

    club.members = club.members.filter(
      id => id.toString() !== userId
    );

    club.heads = club.heads.filter(
      id => id.toString() !== userId
    );

    club.viceHeads = club.viceHeads.filter(
      id => id.toString() !== userId
    );

    if (role === "Head") {
      club.heads.push(user._id);
    } else if (role === "Vice Head") {
      club.viceHeads.push(user._id);
    } else {
      club.members.push(user._id);
    }

    await Promise.all([user.save(), club.save()]);

    return res.status(200).json({
      message: "Member added or updated successfully"
    });

  } catch (err) {
    return res.status(500).json({
      message: "Failed to update member"
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { clubId, postId } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(clubId) ||
      !mongoose.Types.ObjectId.isValid(postId)
    ) {
      return res.status(400).json({ message: "Invalid clubId or postId" });
    }

    const post = await Event.findOne({
      _id: postId,
      club: clubId,
      eventType: "post"
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await Event.findByIdAndDelete(postId);

    return res.status(200).json({
      message: "Post deleted successfully"
    });

  } catch (err) {
    console.error("deletePost error:", err);
    return res.status(500).json({
      message: "Failed to delete post"
    });
  }
};


export const createPost = async (req, res) => {
  try {
    const { clubId } = req.params;
    const { title, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(clubId)) {
      return res.status(400).json({ message: "Invalid club ID" });
    }

    const images = (req.files || []).map((file) => ({
      url: file.path,
      public_id: file.filename,
    }));

    const postEvent = await Event.create({
      club: clubId,
      title,
      description,
      date: new Date(),
      eventType: "post",
      status: "completed",
      images,
    });

    return res.status(201).json(postEvent);
  } catch (err) {
    console.error("createPost error:", err);
    return res.status(500).json({ message: "Failed to create post" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { clubId, eventId } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(clubId) ||
      !mongoose.Types.ObjectId.isValid(eventId)
    ) {
      return res.status(400).json({ message: "Invalid clubId or eventId" });
    }

    const event = await Event.findOne({
      _id: eventId,
      club: clubId
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await Event.findByIdAndDelete(eventId);

    return res.status(200).json({
      message: "Event deleted successfully"
    });

  } catch (err) {
    console.error("deleteEvent error:", err);
    return res.status(500).json({
      message: "Failed to delete event"
    });
  }
};


export const createEvent = async (req, res) => {
  try {
    const { clubId } = req.params;
    const { title, description, date, eventType } = req.body;

    if (!title || !date) {
      return res.status(400).json({ message: "Title and date are required" });
    }

    const eventDate = new Date(date);
    if (isNaN(eventDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const images = (req.files || []).map((file) => ({
      url: file.path || file.secure_url || file.url || "",
      public_id: file.filename || file.public_id || "",
    }));

    const event = await Event.create({
      club: clubId,
      title,
      description,
      date: eventDate,
      eventType: eventType || "main",
      images,
    });

    return res.status(201).json(event);
  } catch (err) {
    console.error("createEvent error:", err);
    return res.status(500).json({ message: "Failed to create event" });
  }
};

export const updateClubProfile = async (req, res) => {
  try {
    const { clubId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(clubId)) {
      return res.status(400).json({ message: "Invalid club ID" });
    }

    const allowedFields = ["image", "description", "aboutUs"];
    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const updatedClub = await Club.findByIdAndUpdate(
      clubId,
      { $set: updates },
      { new: true, runValidators: true },
    );

    if (!updatedClub) {
      return res.status(404).json({ message: "Club not found" });
    }

    return res.status(200).json(updatedClub);
  } catch (err) {
    console.error("updateClubProfile error:", err);
    return res.status(500).json({ message: "Failed to update club profile" });
  }
};
