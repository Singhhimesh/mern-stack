import express from "express";
import bodyParser from "body-parser";
import path from "path";
import multer from "multer";
import {    
    index,
    store,
    findById,
    findBySlug,
    edit
} from '../../controllers/PostController.js';

const postRoute = express();

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

postRoute.post('/posts/store', upload.single('image'), store);
postRoute.get('/posts', index);
postRoute.get('/posts/:id', findById);
postRoute.get('/posts/by-slug/:slug', findBySlug);

export default postRoute;