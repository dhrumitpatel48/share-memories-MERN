import mongoose from "mongoose";
import PostMessage from "../models/postMessage.model.js";
import logger from "../logger/logger.js";
export const getPosts = async (req, res, next) => {
  try {
    logger.info("getPosts task started...");
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
    logger.info("getPosts task completed.");
  } catch (error) {
    res.status(404).json({ message: error.message });
    logger.error(`Error in getPosts: ${error}`);
  }
};

export const createPost = async (req, res, next) => {
  logger.info("createPost task started...");
  const post = req.body;
  const newPost = new PostMessage(post);

  try {
    await newPost.save();
    res.status(201).json(newPost);
    logger.info("createPost task compelted.");
  } catch (error) {
    res.status(409).json({ message: error.message });
    logger.error(`Error in createPost: ${error}`);
  }
};

export const updatePost = async (req, res, next) => {
  logger.info("updatePost task started...");
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
    logger.info("updatePost task compelted.");
  } catch (error) {
    console.log(error);
    logger.error(`Error in updatePost: ${error}`);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    logger.info("deletePost task started...");
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id))
      res.status(404).send(`No post with that id ${_id}`);

    await PostMessage.findByIdAndRemove(_id);
    res.json({ message: "Post Deleted Succussfully" });
    logger.info("deletePost task completed.");
  } catch (error) {
    console.log(error);
    logger.error(`Error in deletePost: ${error}`);
  }
};

export const likePost = async (req, res, next) => {
  try {
    logger.info("likePost task started...");
    const { id: _id } = req.params;

    if (!req.userId) return res.json({ message: "Unauthenticated." });
    if (!mongoose.Types.ObjectId.isValid(_id))
      res.status(404).send(`No post with that id ${_id}`);
    const post = await PostMessage.findById(_id);

    const index = post.likes.findIndex((_id) => _id === String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((_id) => _id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
      new: true,
    });

    res.json(updatedPost);
    logger.info("likePost task completed.");
  } catch (error) {
    console.log(error);
    logger.error(`Error in likePost: ${error}`);
  }
};
