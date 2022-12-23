import express from 'express';
import { addVideo, addView, deleteVideo, getAllVideo, getByTags, getVideo, getVideoLiked, getVideoSaved, random, saveVideo, search, sub, trend, unSaveVideo, updateVideo } from '../controllers/video.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

// Create video
router.post('/', verifyToken, addVideo);

//Update video
router.put('/:id', verifyToken, updateVideo);

// Delete video
router.delete('/:id', verifyToken, deleteVideo);

// Get video
router.get('/find/:id', getVideo);

// Get all currentUser videos
router.get('/AllVideo', verifyToken, getAllVideo);

// View video
router.put('/view/:id', addView);

// Trend video
router.get('/trend', trend);

// Random video
router.get('/random', random);

//sub video
router.get('/sub', verifyToken, sub);

//tags video
router.get('/tags', getByTags);

//search video
router.get('/search', search);

// save video
router.put('/save/:videoId', verifyToken, saveVideo);

// un save video
router.put('/unsave/:videoId', verifyToken, unSaveVideo);

//get video liked
router.get('/videosLiked', verifyToken, getVideoLiked);

//get video saved
router.get('/videosSaved', verifyToken, getVideoSaved);
export default router;