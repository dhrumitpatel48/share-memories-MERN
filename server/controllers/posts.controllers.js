import mongoose from "mongoose";
import PostMessage from "../models/postMessage.model.js";
export const getPosts = async (req, res, next) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res, next) => {
  const post = req.body;
  const newPost = new PostMessage(post);

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id))
      res.status(404).send(`No post with that id ${_id}`);

    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { ...post, _id },
      {
        new: true,
      }
    ); // here {new: true} means updatedPost will be return

    res.json(updatedPost);
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id))
      res.status(404).send(`No post with that id ${_id}`);

    await PostMessage.findByIdAndRemove(_id);
    res.json({ message: "Post Deleted Succussfully" });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (req, res, next) => {
  try {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id))
      res.status(404).send(`No post with that id ${_id}`);
    const post = await PostMessage.findById(_id);
    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      {
        likeCount: post.likeCount + 1,
      },
      { new: true }
    );

    res.json(updatedPost);
  } catch (error) {
    console.log(error);
  }
};
