const multer = require("multer");
const path = require("path");
const uuid = require("uuid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/resources");
  },
  filename: function (req, file, cb) {

    const extension = path.extname(file.originalname);

    switch(extension) {
      case ".png":
      case ".jpg":
      case ".jpeg":
        const filename = `${Date.now()}${(uuid.v4()).replaceAll('-', '')}${extension}`
        req.body[file.fieldname] = filename
        cb(null, filename);
        break;
      default:
        return cb(new Error("Invalid file type"));
    }

  },
});

const upload = multer({ storage: storage });

module.exports = upload;