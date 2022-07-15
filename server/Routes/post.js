const mongoose = require("mongoose");
const Post = require("../Model/Post");
const router = require("express").Router();

router.get("/", async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 6;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await Post.countDocuments();
    const posts = await Post.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    return res
      .status(200)
      .json({
        posts,
        totalPages: Math.ceil(total / LIMIT),
        currentPage: Number(page),
      });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "something went wrong" });
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const newPost = new Post(req.body);
  try {
    const result = await newPost.save();
    console.log(result);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
});

router.patch("/:id/updatePost", async (req, res) => {
  const { id } = req.params;
  const post = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
    console.log(updatedPost);
    return res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id/deletePost", async (req, res) => {
  const { id } = req.params;

  try {
    await Post.findByIdAndDelete(id);
    return res.status(200).json({ message: "post Deleted successfull" });
  } catch (error) {}
});

module.exports = router;
