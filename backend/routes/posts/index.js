const express = require("express");
const postRoute = express();
const bodyParser = require("body-parser");
const multer = require('multer');
const path = require('path');

postRoute.use(bodyParser.json());
postRoute.use(bodyParser.urlencoded({ extended: true }));
postRoute.use(express.static('public'));

const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/post'));
    },
    filename: function (req, file, cb) {
        let name = `${Date.now()}-${file.originalname}`;
        cb(null, name);
    },
});

const upload = multer({
    storage: multerStorage,
});

const postController = require('../../controllers/PostController');

// The middleware upload.single should specify the field name, like 'image' or 'file'
postRoute.post('/post/store', upload.single('image'), postController.store);
postRoute.get('/posts', postController.index);

module.exports = postRoute;