const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();

mongoose.connect("mongodb://localhost:27017/social-app", () => {
  console.log("mongoose is connected");
});


// middlewares:
app.use(
  cors({
    origin: "*",
    method: ["GET","POST","PUT","DELETE"],
    credentials:true
  })
  );
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));  
app.use(morgan("common"));

  app.use("/images", express.static(path.join(__dirname, "public/images")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json({ success: "file uploaded successfully" });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

app.get("/", (req, res) => {
  res.send("welcome to social server");
});
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(8800, () => {
  console.log("server is running on 8800");
});
