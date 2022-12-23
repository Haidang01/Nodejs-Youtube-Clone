import { Comment } from "../models/Comments.js";
import { Video } from "../models/Video.js";


export const addComment = async (req, res, next) => {
  const newComment = new Comment({ ...req.body, userId: req.user.id });
  try {
    const comment = await newComment.save();
    res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    next(error);
  }
}
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const video = await Video.findById(req.params.id);
    if (comment.userId == req.user.id || video.userId == req.user.id) {
      await Comment.findByIdAndRemove(req.params.id);
      res.status(200).json("Comment deleted successfully");
    } else {
      return res.status(403).json("You can delete only your comment.")
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}
export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    next(error);
  }
}