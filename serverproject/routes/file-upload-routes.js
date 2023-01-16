'use strict';

const express = require('express');
const {upload} = require('../helpers/filehelper');
const {singleFileUpload, getAllFiles} = require('../controllers/fileuploaderController');
const router = express.Router();


router.post('/singleFile', upload.single('file'), singleFileUpload);
router.get('/getAllFiles', getAllFiles);


module.exports = {
    routes: router
}