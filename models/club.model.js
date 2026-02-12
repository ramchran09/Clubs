import mongoose from "mongoose";

const clubSchema = new mongoose.Schema(
    {
        email: { type: String, unique: true, required: true,},
        clubname: { type: String, unique: true, required: true,},
        password: { type: String, required: true, minlength : 6,}, 

        image: { type: String,},
        description: { type: String,},

        heads: [{ type: mongoose.Schema.Types.ObjectId, ref:"User"}],
        viceHeads: [{type: mongoose.Schema.Types.ObjectId, ref:"User"}],
        
    },
    {timestamps: true}
);

const Club = mongoose.model("Club",clubSchema);
 
export default Club;