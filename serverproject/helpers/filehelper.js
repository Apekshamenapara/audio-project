'use strict';
const multer = require('multer');
const {
    GridFsStorage
  } = require("multer-gridfs-storage");
  const storage = new GridFsStorage({
    url: 'mongodb://127.0.0.1:27017/audio-files',
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: "newBucket"
        };
        resolve(fileInfo);
      });
    }
  });
  
  const upload = multer({
    storage
  });

module.exports = {upload}