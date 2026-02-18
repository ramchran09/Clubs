import express from 'express';

import { deleteEvent,createEvent, createPost, removeMember, updateClubProfile, updateMemberRole, deletePost} from '../controllers/clubadmin.controller.js';
import { verifyClubEditAccess } from '../middlewares/clubadmin.middleware.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

import upload from '../middlewares/upload.js';

const router = express.Router();


router.put("/:clubId/profile", protectRoute, verifyClubEditAccess, updateClubProfile);//jwt-token, profileupdated data, clubId

router.post("/:clubId/events", protectRoute, verifyClubEditAccess, upload.array("images",3), createEvent );
router.delete("/:clubId/events/:eventId", protectRoute, verifyClubEditAccess, deleteEvent);

router.post("/:clubId/posts", protectRoute, verifyClubEditAccess, upload.array("images",3), createPost);
router.delete("/:clubId/posts/:postId", protectRoute, verifyClubEditAccess, deletePost);

router.delete("/:clubId/members/:userId", protectRoute, verifyClubEditAccess, removeMember);
router.patch("/:clubId/members/:userId/role", protectRoute, verifyClubEditAccess, updateMemberRole);

export default router;