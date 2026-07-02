import Chat from "../models/Chat.js";
import User from "../models/User.js";

export const createOrGetChat = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const otherUser = await User.findById(userId);
    if (!otherUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingChat = await Chat.findOne({
      users: { $all: [req.user.id, userId] },
    }).populate("users", "name email");

    if (existingChat) {
      return res.status(200).json(existingChat);
    }

    const newChat = await Chat.create({
      users: [req.user.id, userId],
    });

    const populatedChat = await Chat.findById(newChat._id).populate(
      "users",
      "name email"
    );

    res.status(201).json(populatedChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      users: { $in: [req.user.id] },
    })
      .populate("users", "name email")
      .populate({
        path: "latestMessage",
        populate: {
          path: "sender",
          select: "name email",
        },
      })
      .sort({ updatedAt: -1 });

    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};