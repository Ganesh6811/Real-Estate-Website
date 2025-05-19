import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
  
    email: {
      type: String,
      required: true,
      unique: true,
    },
  
    phoneNo: {
      type: Number,
      required: true,
    },
  
    password: {
      type: String,
      required: true,
    },

    profilePic:{
        type:String,
        default:"",
    },
  
    myPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      }
    ],
  
    savedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      }
    ],
  }, { timestamps: true }); 

  const userModel = mongoose.model("User", userSchema);

  export default userModel;