const fs = require("fs");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Post = require("./models/Post");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const pathFile = require("path");
require("dotenv").config();

const uploadMiddleware = multer({ dest: "uploads/" });
const app = express();
app.use(cors({ credentials: true, origin: process.env.NODE_FRONTEND_URL }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
const salt = bcrypt.genSaltSync(5);
const jwtSecret = process.env.NODE_JWT_SECRET;

mongoose.connect(process.env.NODE_MONGOOSE_URL);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const newUser = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json({ message: "ok", newUser });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: "New User Creation Failed! User already exists." });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    const isCorrectPWD = bcrypt.compareSync(password, user.password);
    if (isCorrectPWD) {
      // logged in
      jwt.sign({ username, id: user._id }, jwtSecret, {}, (err, token) => {
        if (err) {
          throw err;
        }
        res.cookie("token", token).json({
          id: user._id,
          username,
        });
      });
    } else {
      res.status(404).json({ message: "Login failed" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/profile", (req, res) => {
  try {
    const { token } = req.cookies;
    // verify token
    jwt.verify(token, jwtSecret, {}, (err, info) => {
      if (err) {
        throw err;
      }
      res.json(info);
    });
  } catch (error) {
    res.json({ message: "No Valid Token" });
  }
});

app.post("/logout", (req, res) => {
  // clear the token
  res.cookie("token", "").json("ok");
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const extension = parts[parts.length - 1];
  const newPath = path + "." + extension;
  fs.renameSync(path, newPath);

  const { title, summary, content } = req.body;
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, info) => {
    if (err) {
      throw err;
    }

    const post = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json(post);
  });
});

app.get("/post", async (req, res) => {
  res.json(
    await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id).populate("author", ["username"]);

  res.json(post);
});

app.delete("/post/:id", uploadMiddleware.single("file"), async (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;
  try {
    jwt.verify(token, jwtSecret, {}, async (err, info) => {
      if (err) {
        throw err;
      }
      const postGet = await Post.findById(id);
      const imagePath = pathFile.join(__dirname, postGet.cover);
      if (postGet) {
        const postDelete = await Post.deleteOne({ _id: id });
      }
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
      res.json({ message: `Post ${id} deleted successfully.  ` });
    });
  } catch (err) {
    console.log(err);
  }
});

app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  const newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const extension = parts[parts.length - 1];
    newPath = path + "." + extension;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  const { title, summary, content, id } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, info) => {
    if (err) {
      throw err;
    }

    const postGet = await Post.findById(id);
    const isAuthor = JSON.stringify(postGet.author) === JSON.stringify(info.id);

    if (!isAuthor) {
      return res.status(400).send("you are not the author");
    }

    await postGet.updateOne({
      title,
      summary,
      content,
      cover: newPath ? newPath : postGet.cover,
    });

    res.json(postGet);
  });
});

var listener = app.listen(process.env.NODE_PORT || 3000, () => {
  console.log(`Server Started on -http://localhost:${listener.address().port}`);
});
