import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
import { store, index } from "../../controllers/CategoryController.js";

const categorRoute = express();
categorRoute.use(bodyParser.json());
categorRoute.use(bodyParser.urlencoded({ extended: true }));
categorRoute.use(express.static("public"));

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/category"));
  },
  filename: (req, file, cb) => {
    let name = `${Date.now()}-${file.originalname}`;
    cb(null, name);
  },
});

const upload = multer({
  storage: multerStorage,
});

categorRoute.post("/categories/store", upload.single("image"), store);
categorRoute.get("/categories", index);

export default categorRoute;
