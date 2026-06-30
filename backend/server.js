import authRoutes from "../backend/src/routes/authRoutes.js"
import dotenv from "dotenv";
import ConnectDB from "./src/config/db.js";
dotenv.config();
console.log(process.env.MONGO_URI);
import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes)
app.get("/", (req, res) => {
    res.send("Backend is running...");
});
ConnectDB();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});