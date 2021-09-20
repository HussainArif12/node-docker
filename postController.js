const Post = require("./postModel");

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: "Could not work" });
  }
};

exports.getOnePost = async (req, res, next) => {
  try {
    const posts = await Post.findById(req.params.id);
    res.status(200).json({ posts });
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: "Error" });
  }
};
exports.createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    res.json({ post });
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: "error" });
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const posts = await Post.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    res.json({ message: "Success" });
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: "Error" });
  }
};
exports.deletePost = async (req, res, next) => {
  try {
    const posts = await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Success" });
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: "Error" });
  }
};
