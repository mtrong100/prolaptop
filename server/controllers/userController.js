import User from "../models/userModel.js";

const USER_QUERY = {
  PAGE: 1,
  LIMIT: 10,
  SORT: "name",
  ORDER: "desc",
  QUERY: "",
};

export const getUserCollection = async (req, res) => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      return res.status(404).json({ error: "users not found" });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.log("Error in send getUserCollection controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUsers = async (req, res) => {
  const {
    page = USER_QUERY.PAGE,
    limit = USER_QUERY.LIMIT,
    sort = USER_QUERY.SORT,
    order = USER_QUERY.ORDER,
    query = USER_QUERY.QUERY,
  } = req.query;

  try {
    const userRole = req.user.role;

    if (userRole !== "admin") {
      return res.status(403).json({ error: "Not have permission" });
    }

    const filter = {};

    if (query) {
      filter.name = new RegExp(query, "i");
    }

    const options = {
      page,
      limit,
      sort: {
        [sort]: order === "asc" ? 1 : -1,
      },
    };

    const users = await User.paginate(filter, options);

    if (!users.docs || users.docs.length === 0) {
      return res.status(404).json({ error: "Users not found" });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.log("Error in getUsers controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select(
      "-password -verificationToken -resetPasswordOtp -resetPasswordExpires"
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in send getUserDetail controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { name, phone, address, avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { name, phone, address, avatar },
      { new: true }
    ).select(
      "-password -verificationToken -resetPasswordOtp -resetPasswordExpires"
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log("Error ins updateUser controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const blockUser = async (req, res) => {
  try {
    const userRole = req.user.role;

    if (userRole !== "admin") {
      return res.status(403).json({ error: "Not have permission" });
    }

    if (userRole !== "admin") {
      return res.status(400).json({ error: "Can not block admin" });
    }

    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.blocked = !user.blocked;

    await user.save();

    res.status(200).json({ message: "User has been blocked" });
  } catch (error) {
    console.error("Error in setProductFlashSale controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userRole = req.user.role;

    if (userRole !== "admin") {
      return res.status(403).json({ error: "Not have permission" });
    }

    const { id } = req.params;

    await User.findByIdAndDelete(id);

    return res.status(200).json({ message: "User has been deleted" });
  } catch (error) {
    console.log("Error in send deleteUser controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
