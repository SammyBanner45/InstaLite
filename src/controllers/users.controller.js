const {
  createUser,
  listUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../services/users.service");

const create = async (req, res) => {
  try {
    const { username, email, fullname, bio } = req.body || {};

    if (!username || !email || !fullname) {
      return res
        .status(400)
        .json({ error: "username, email and fullname are required" });
    }

    const userData = { username, email, fullname };
    if (bio !== undefined) {
      userData.bio = bio;
    }

    const result = await createUser(userData);
    res.status(201).json(result);
  } catch (err) {
    res.status(409).json({ error: "username or email already taken" });
  }
};

const list = async (req, res) => {
  try {
    const result = await listUsers();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

const getOne = async (req, res) => {
  try {
    const user = await getUserById(Number(req.params.id));
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: "User not found" });
  }
};

const update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const updateData = {};

    if (req.body.fullname !== undefined) updateData.fullname = req.body.fullname;
    if (req.body.bio !== undefined) updateData.bio = req.body.bio;
    if (req.body.isPrivate !== undefined) updateData.isPrivate = req.body.isPrivate;

    const updatedUser = await updateUser(id, updateData);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json({ error: "User not found" });
  }
};

const remove = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await deleteUser(id);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: "User not found" });
  }
};

module.exports = {
  create,
  list,
  getOne,
  update,
  remove,
};
