const router = require("express").Router();
const bcrypt = require("bcrypt");
const Users = require("../models/Users");

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  let { userId, password, isAdmin } = req.body;
  if (id === userId || isAdmin) {
    if (password) {
      try { 
        const salt = await bcrypt.salt(10);
        password = await bcrypt.hash(password, salt);
      } catch (error) {
        return res.status(500).json(error);
      }
    }
    try {
      console.log("id",id);
      console.log("req.body",req.body);
      const user = await Users.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).json({ success: "account has been updated" });
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("you can update only your account");
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  let { userId, isAdmin } = req.body;
  if (id === userId || isAdmin) {
    try {
      const user = await Users.findByIdAndDelete(id);
      res.status(200).json({ success: "Account was deleted" });
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("you can delete only your account");
  }
});

router.get("/", async (req, res) => {
  const { userId, username } = req.query;
  try {
    const user = userId
      ? await Users.findById(userId)
      : await Users.findOne({ username });
    if (user) {
      const { password, updatedAt, ...rest } = user._doc;
      res.status(200).json({ success: rest });
    } else {
      res.status(404).json("no such user");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/friends/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await Users.findById(userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => Users.findById(friendId))
    );
    res.status(200).json({
      success: friends.map((friend) => {
        return {
          _id: friend._id,
          username: friend.username,
          profilePicture: friend.profilePicture,
        };
      }),
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put("/:id/follow", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  if (id !== userId) {
    try {
      const userToFollow = await Users.findById(id);
      const currentUser = await Users.findById(userId);

      if (!userToFollow.followers.includes(userId)) {
        await userToFollow.updateOne({ $push: { followers: userId } });
        await currentUser.updateOne({ $push: { followings: id } });
        res.status(200).json({ success: "user has followed" });
      } else {
        res.status(403).json({ error: "this user is already followed by you" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json({ error: "you cannot follow your self" });
  }
});
router.put("/:id/unfollow", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  if (id !== userId) {
    try {
      const userToFollow = await Users.findById(id);
      const currentUser = await Users.findById(userId);
      if (userToFollow.followers.includes(userId)) {
        await userToFollow.updateOne({ $pull: { followers: userId } });
        await currentUser.updateOne({ $pull: { followings: id } });
        res.status(200).json({ success: "user has unfollowed" });
      } else {
        res
          .status(403)
          .json({ error: "this user is already unfollowed by you" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json({ error: "you cannot unfollow your self" });
  }
});

module.exports = router;
