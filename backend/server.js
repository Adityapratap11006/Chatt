require("dotenv").config();
console.log(process.env.MONGO_URI);
const ConnectDB=require("./src/config/db")
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Backend is running...");
});
ConnectDB();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});