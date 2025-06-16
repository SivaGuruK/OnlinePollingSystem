require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const pollRoutes = require("./routes/pollRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);


app.use(express.json());
app.use("/api", pollRoutes);
app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    )
  )
  .catch((err) => console.log("DB Connection Error:", err));
