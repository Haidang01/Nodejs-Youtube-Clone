import { User } from "../models/User.js";
import { Video } from "../models/Video.js";


export const addVideo = async (req, res, next) => {
  try {
    // console.log(req.body);
    const newVideo = new Video({ userId: req.user.id, ...req.body });
    const video = await newVideo.save();
    res.status(201).json(video);
  } catch (error) {
    console.log(error);
    next(error);
  }
}
export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json('Video not found');
    }
    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      }, {
        new: true,
      })
      res.status(200).json(updatedVideo);
    } else {
      res.status(403).json('You can update only your video');
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}
export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json('Video not found');
    }
    if (req.user.id === video.userId) {
      await Video.findByIdAndRemove(req.params.id);
      res.status(200).json('The video has been removed');
    } else {
      res.status(403).json('You can delete only your video');
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json('Video not found');
    }
    res.status(200).json(video);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 }
    });
    res.status(200).json('The video has been increased');
  } catch (error) {
    console.log(error);
    next(error);
  }
}
export const trend = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (error) {
    console.log(error);
    next(error);
  }
}
export const random = async (req, res, next) => {
  try {
    //random video 
    const videos = await Video.aggregate([{
      $sample: { size: 10 }
    }])
    res.status(200).json(videos);
  } catch (error) {
    console.log(error);
    next(error);
  }
}
export const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    const subscribedChannel = user.subscribedUsers;
    console.log(user);
    const list = await Promise.all(
      subscribedChannel.map((channelId) => {
        return Video.find({ userId: channelId });
      }));
    res.status(200).json(list.flat().sort((a, b) => a.createdAt - b.createdAt));
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export const getByTags = async (req, res, next) => {
  const tags = (req.query.tags.split(','));
  try {
    const videos = await Video.find({
      tags: {
        $in: tags
      }
    }).limit(10);
    res.status(200).json(videos);
  } catch (error) {
    console.log(error);
    next(error);
  }
}
export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: {
        $regex: query,
        $options: 'i'
      }
    }).limit(40);
    res.status(200).json(videos);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

// Save video
export const saveVideo = async (req, res, next) => {
  try {
    //check video exists
    const video = await Video.findById(req.params.videoId);
    if (!video) {
      return res.status(404).json('Video not found');
    }
    // save video 
    const user = await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { videoSaved: req.params.videoId }
    }, { new: true });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}
//
export const unSaveVideo = async (req, res, next) => {
  try {
    // un save video 
    const user = await User.findByIdAndUpdate(req.user.id, {
      $pull: { videoSaved: req.params.videoId }
    }, { new: true });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

// get video liked
export const getVideoLiked = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const listVideo = await Promise.all(
      user.videoLiked.map(id => {
        return Video.findById({ _id: id });
      })
    )
    res.status(200).json(listVideo);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

// get all currentUser videos
export const getAllVideo = async (req, res, next) => {
  try {
    console.log(req.user);
    const videos = await Video.find({ userId: req.user.id });
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
}

// get all videos saved
export const getVideoSaved = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const Videos = await Promise.all(
      user.videoSaved.map(videoId => Video.findById(videoId))
    );
    res.status(200).json(Videos);
  } catch (error) {
    next(error);
  }
}


