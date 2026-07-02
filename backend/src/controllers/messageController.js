import Message from "../models/Message.js";
import User from "../models/User.js";
import Chat from "../models/Chat.js";
export const sendMessage = async (req, res) => {
  try {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
      return res.status(400).json({ message: "Invalid data passed into request: missing content or chatId" });
    }

    const newMessage = {
      sender: req.user.id,
      content: content,
      chat: chatId,
    };

    let message = await Message.create(newMessage);

    message = await message.populate("sender", "name email");
    message = await message.populate("chat");
    
    // We also populate the users array inside the chat object
    message = await User.populate(message, {
      path: "chat.users",
      select: "name email",
    });

    // Update the latestMessage field in the Chat model
    await Chat.findByIdAndUpdate(chatId, { latestMessage: message._id });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    // 1. Validate chatId
    if (!chatId) {
      return res.status(400).json({ message: "chatId is required" });
    }

    // 2. Fetch messages of that chat
    const messages = await Message.find({ chat: chatId })
      .populate("sender", "name email")
      .sort({ createdAt: 1 }); // oldest → newest

    // 3. Return messages
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};