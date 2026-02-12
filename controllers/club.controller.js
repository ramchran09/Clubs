import mongoose from "mongoose";

import Club from "../models/club.model.js";
import Event from "../models/event.model.js";
import User from "../models/user.model.js";

export const getAllEvents = async (req, res) => {
  try {
    const { clubId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(clubId)) {
      return res.status(400).json({ message: "Invalid club ID" });
    }

    const events = await Event.find({ club: clubId }).sort({ date: -1 }).lean();

    res.status(200).json(events);

  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ message: "Failed to fetch events" });
  }
};

export const getClubMembers = async (req, res) => {
  try {
    const { clubId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(clubId)) {
      return res.status(400).json({ message: "Invalid club ID" });
    }

    const club = await Club.findById(clubId)
      .select("heads viceHeads")
      .populate("heads", "fullName profilePic")
      .populate("viceHeads", "fullName profilePic")
      .lean();

    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }

    const members = await User.find({
      clubs: {
        $elemMatch: {
          club: clubId,
          role: "Member",
        },
      },
    })
      .select("fullName")
      .lean();

    res.status(200).json({
      heads: club.heads,
      viceHeads: club.viceHeads,
      members,
    });

  } catch (err) {
    console.error("Error fetching members:", err);
    res.status(500).json({ message: "Failed to fetch members" });
  }
};

export const getAllClubPosts = async (req, res) => {
  try {
    const { clubId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(clubId)) {
      return res.status(400).json({ message: "Invalid club ID" });
    }

    const posts = await Event.find({
      club: clubId,
      status: "completed",
      eventType: "post",
    })
      .sort({ date: -1 })
      .lean();

    res.status(200).json(posts);

  } catch (err) {
    console.error("Error fetching club posts:", err);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

export const clubDetails = async (req, res) => {
  try {
    const { clubId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(clubId)) {
      return res.status(400).json({ message: "Invalid club ID" });
    }

    const club = await Club.findById(clubId)
      .select("clubname image description heads viceHeads")
      .populate("heads", "fullName profilePic")
      .populate("viceHeads", "fullName profilePic")
      .lean();

    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }

    const [events, completedMainEvents] = await Promise.all([
      Event.find({
        club: clubId,
        eventType: "main",
        status: { $in: ["upcoming", "ongoing"] },
      })
        .sort({ date: 1 })
        .lean(),

      Event.find({
        club: clubId,
        eventType: "main",
        status: "completed",
      })
        .sort({ date: -1 })
        .limit(5)
        .lean(),
    ]);

    res.status(200).json({
      club,
      events,
      completedMainEvents,
    });

  } catch (err) {
    console.error("Error at clubDetails:", err);
    res.status(500).json({ message: "Failed to fetch clubDetails" });
  }
};

export const clubList = async (req, res) => {
  try {
    const clubs = await Club.find().select("clubname image description").lean();

    const formatted = clubs.map((c) => ({
      clubId: c._id.toString(),
      clubname: c.clubname,
      image: c.image,
      description: c.description,
    }));

    res.status(200).json(formatted);
    
  } catch (err) {
    console.error("Error at clubList:", err);
    res.status(500).json({ message: "Failed to fetch clubs" });
  }
};
