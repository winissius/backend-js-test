import express from "express";
import multer from "multer";
import { listPosts, newPost, uploadImage, updatePost } from "../controllers/postsControllers.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})

const routes = (app) => {
    // Configure the app to parse JSON data in incoming requests
    app.use(express.json());
    // Define a route handler for GET requests to the "/posts" endpoint
    app.get("/posts", listPosts);
    app.post("/posts", newPost)
    app.post("/upload", upload.single("image"), uploadImage)
    app.put("/upload/:id", updatePost)
}

export default routes;

