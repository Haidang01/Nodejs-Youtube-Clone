import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    // required: true,
  },
  img: {
    type: String,
  },
  subscribers: {
    type: Number,
    default: 0
  },
  subscribedUsers: {
    type: [String],
    default: []
  },
  fromGoogle: {
    type: Boolean,
    default: false
  },
  videoLiked: {
    type: [String],
    default: []
  },
  videoSaved: {
    type: [String],
    default: []
  }
}, {
  timestamps: true,
})
export const User = mongoose.model('User', UserSchema);
