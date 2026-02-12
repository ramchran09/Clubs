import { clubDetails, clubList, getAllClubPosts, getAllEvents, getClubMembers } from "../controllers/club.controller.js";
import express from 'express';

const router = express.Router();

router.get("/clubs", clubList);
router.get("/:clubId", clubDetails);
router.get("/:cludId/posts", getAllClubPosts);
router.get("/clubId/members", getClubMembers);  
router.get("/:clubId/events", getAllEvents);


export default router;