import express from 'express';
import { deleteUser, getUser, likeVideo, subscribe, dislikeVideo, unsubscribe, update, getUserSubscriptions } from '../controllers/user.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();
// update user
router.put('/:id', verifyToken, update);
//delete user
router.delete('/:id', verifyToken, deleteUser);
//get user
router.get('/find/:id', getUser);
//get user subscriptions
router.get('/subscriptions', verifyToken, getUserSubscriptions);
//subscribe 
router.put('/sub/:id', verifyToken, subscribe);
//unsubscribe
router.put('/unsub/:id', verifyToken, unsubscribe);
//like video
router.put('/like/:videoId', verifyToken, likeVideo);
//unlike video
router.put('/dislike/:videoId', verifyToken, dislikeVideo);
export default router;