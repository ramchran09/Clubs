import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    public_id: { type: String, required: true },
    caption: String,
    uploadedAt: { type: Date, default: Date.now },
  },
  { _id: false },
);

const eventSchema = new mongoose.Schema(
  {
    club: { type: mongoose.Schema.Types.ObjectId, ref: "Club", required: true },
    title: { type: String },
    description: { type: String },
    date: { type: Date },
    status: { 
        type: String, 
        enum: ["ongoing", "upcoming", "completed"],
        default: "upcoming",
    },
    images: { type: [imageSchema], default: [] }
  },
  { timestamps: true },
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
