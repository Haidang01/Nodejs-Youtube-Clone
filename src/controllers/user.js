import { User } from "../models/User.js";
import { Video } from "../models/Video.js";



//Update user profile
export const update = async (req, res, next) => {
  const { id } = req.params;
  if (id !== req.user.id) {
    return res.status(403).json({
      message: "You are not allowed to update this user.",
    })
  } else {
    try {
      const user = await User.findByIdAndUpdate(id, {
        $set: req.body
      }, { new: true });
      const { password, ...others } = user._doc;
      return res.status(200).json(others);
    } catch (error) {
      next(error);
    }

  }

}

// Get user
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    return res.status(200).json(others);
  } catch (error) {
    next(error);
  }
};

//Delete user
export const deleteUser = async (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return res.status(403).json({
      message: "You are not allowed to delete this user.",
    })
  } else {
    try {
      await User.findByIdAndRemove(req.params.id);
      return res.status(200).json('User has been deleted.');
    } catch (error) {
      next(error);
    }
  }
}

// Subscribe

export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id }
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 }
    })
    return res.status(200).json("Subscription successfully.");
  } catch (error) {
    next(error);
  }
};

// Unsubscribe

export const unsubscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id }
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 }
    })
    return res.status(200).json("unSubscription successfully.");
  } catch (error) {
    next(error);
  }
};

// Get user subscriptions
export const getUserSubscriptions = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const listUser = await Promise.all(
      user.subscribedUsers.map(id => {
        return User.findById({ _id: id });
      })
    )
    res.status(200).json(listUser);
  } catch (error) {
    next(error);
  }
};


// like video 

export const likeVideo = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    const user = await User.findByIdAndUpdate(id, {
      $addToSet: { videoLiked: videoId },
    }, { new: true });
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id }
    })
    res.status(200).json(user)
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// unlike video

export const dislikeVideo = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    const user = await User.findByIdAndUpdate(id, {
      $pull: { videoLiked: videoId },
    }, { new: true });
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: {
        likes: id,
        videoLiked: videoId
      }
    })
    res.status(200).json(user)
  } catch (error) {
    console.log(error);
    next(error);
  }
};


