const express = require("express");
const { cv } = require("opencv4nodejs");
const ffmpeg = require("ffmpeg");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  },
});

const outputConvert = "src/converted/";
const outputResize = "src/resized/";
const outputCompress = "src/compressed/";

app.use(express.json());
app.get("/", (req, res) => {
  res.end(
    `Welcome To Image Processing API\nGo To /convertToJPEG for Converting\nGo To /resize for Resizing\nGo To /compress for Resizing\n`
  );
});

app.post("/convertToJPEG", upload.single("inputFile"), async (req, res) => {
  try {
    const { path: filePath } = req.file;
    if (!filePath) {
      return res.status(400).send("Uploaded file not found.");
    }
    const img = cv.imread(filePath);
    const outputPath = path.join(
      outputConvert,
      `${req.file.originalname.split(".")[0]}.jpeg`
    );
    cv.imwrite(outputPath, img);
    res.status(200).send("Image converted to JPEG successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error converting image.");
  }
});

app.post("/resize", upload.single("inputFile"), async (req, res) => {
  try {
    const { path: filePath } = req.file;
    if (!filePath) {
      return res.status(400).send("Uploaded file not found.");
    }
    const { width, height } = req.body;
    const img = cv.imread(filePath);
    const newFilename =
      req.file.originalname.replace(/\.[^/.]+$/, "") + "_resized";
    const outputPath = path.join(
      outputResize,
      newFilename + path.extname(req.file.originalname)
    );
    cv.imwrite(outputPath, img.resize(parseInt(width), parseInt(height)));
    res.status(200).send("Image resized successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error resizing image.");
  }
});

app.post("/compress", upload.single("inputFile"), async (req, res) => {
  try {
    const { path: filePath } = req.file;
    if (!filePath) {
      return res.status(400).send("Uploaded file not found.");
    }
    const { quality } = req.body;
    const img = cv.imread(filePath);
    const newFilename =
      req.file.originalname.replace(/\.[^/.]+$/, "") + "_compressed";
    const outputPath = path.join(
      outputCompress,
      newFilename + path.extname(req.file.originalname)
    );
    cv.imwrite(outputPath, img, [cv.IMWRITE_JPEG_QUALITY, parseInt(quality)]);
    res.status(200).send("Image compressed successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error compressing image.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
