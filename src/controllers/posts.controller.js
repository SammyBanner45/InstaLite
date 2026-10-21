const {
  createPost,
  listPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../services/posts.service");

const create = async (req, res) => {
  try {
    const { imageUrl, caption, location } = req.body || {};

    if (!imageUrl) {
      return res.status(400).json({ error: "imageUrl is required" });
    }

    const postData = { imageUrl };
    if (caption !== undefined) postData.caption = caption;
    if (location !== undefined) postData.location = location;

    const post = await createPost(postData);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to create post" });
  }
};

const list = async (req, res) => {
  try {
    const posts = await listPosts();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

const getOne = async (req, res) => {
  try {
    const post = await getPostById(Number(req.params.id));
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ error: "Post not found" });
  }
};

const update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const updateData = {};

    if (req.body.caption !== undefined) updateData.caption = req.body.caption;
    if (req.body.location !== undefined) updateData.location = req.body.location;

    const updatedPost = await updatePost(id, updateData);
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ error: "Post not found" });
  }
};

const remove = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await deletePost(id);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: "Post not found" });
  }
};

module.exports = {
  create,
  list,
  getOne,
  update,
  remove,
};
