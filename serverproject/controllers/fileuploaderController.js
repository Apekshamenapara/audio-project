'use strict';
const SingleFile = require('../models/singlefile');
const mongoose = require('mongoose');


const singleFileUpload = async (req, res, next) => {
    try{
        console.log('file', req.file)
        const file = new SingleFile({
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2) // 0.00
        });
        await file.save();
        res.status(201).send('File Uploaded Successfully');
    }catch(error) {
        res.status(400).send(error.message);
    }
}

const getAllFiles = async (req, res, next) => {
    try{
        var client = mongoose.connections[0].client;
        let bucket;
    var db = mongoose.connections[0].db;
    bucket = new mongoose.mongo.GridFSBucket(db, {
      bucketName: "newBucket"
    });
        const file = bucket
        .find()
        .toArray((err, files) => {
          if (!files || files.length === 0) {
            return res.status(404)
              .json({
                err: "no files exist"
              });
          }
          bucket.openDownloadStreamByName(req.params.filename)
            .pipe(res);
        });
        // res.status(200).send(files);
    }catch(error) {
        res.status(400).send(error.message);
    }
}

const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}

module.exports = {
    singleFileUpload,
    getAllFiles,
}