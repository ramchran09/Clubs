import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        email: { type: String,required: true,unique: true,},

        fullName: { type: String, required: true,},
        password: { type: String, required: true, minlength: 6,},

        role:{
            type: String,
            enum: ["user","admin","superAdmin"],
            default: "user",
        },

        profilePic: {type: String,default: "",},

        clubs: [
            {
                club: { type: mongoose.Schema.Types.ObjectId, ref: "Club" },
                role: {
                    type: String,
                    enum: ["Head","Vice Head","Member"],
                    default: "Member",
                }
            }
        ],
    },
    {timestamps: true}
);

const User = mongoose.model("User",userSchema);

export default User;