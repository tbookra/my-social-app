const router = require("express").Router();
const Posts = require("../models/Posts");
const Users = require("../models/Users");

router.post("/", async (req, res) => {
  const newPost = new Posts(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(201).json({ success: savedPost });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put("/:postId", async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;
  try {
    const post = await Posts.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json({ success: "post had been updated" });
    } else {
      res.status(403).json({ error: "you can only update your own posts" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/:postId", async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;
  try {
    const post = await Posts.findById(postId);
    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json({ success: "post had been deleted" });
    } else {
      res.status(403).json({ error: "you can only delete your own posts" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put("/:postId/like", async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;
  try {
    const post = await Posts.findById(postId);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json({ success: "like was added" });
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json({ success: "like was subtracted" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:postId", async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Posts.findById(postId);
    res.status(200).json({ success: post });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/timeline/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const currentUser = await Users.findById(userId);
    const userPosts = await Posts.find({ userId: currentUser._id }); // all the posts of the current user
    const friendsPosts = await Promise.all(  // all the post of his followings
        currentUser.followings.map((friendId)=>{
            return Posts.find({userId:friendId})
        })
    )
    res.status(200).json({ success: [...userPosts,...friendsPosts] });
  } catch (error) {
    res.status(500).json({ error });
  }
});
module.exports = router;
