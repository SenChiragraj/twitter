import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
	bookmarkUnbookmark,
	commentOnPost,
	createPost,
	deletePost,
	getAllPosts,
	getBookmarkedPosts,
	getFollowingPosts,
	getLikedPosts,
	getUserPosts,
	likeUnlikePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/all", protectRoute, getAllPosts);
router.get("/following", protectRoute, getFollowingPosts);
router.get("/user/:username", protectRoute, getUserPosts);
router.post("/create", protectRoute, createPost);

router.get("/likes/:id", protectRoute, getLikedPosts);
router.post("/like/:id", protectRoute, likeUnlikePost);

router.get("/bookmark/:id", protectRoute, getBookmarkedPosts);
router.post("/bookmark/:id", protectRoute, bookmarkUnbookmark);

router.post("/comment/:id", protectRoute, commentOnPost);
router.delete("/:id", protectRoute, deletePost);

export default router;
