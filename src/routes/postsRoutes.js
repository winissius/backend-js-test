import express from "express";
import { listPosts } from "../controllers/postsControllers.js";

const routes = (app) => {
    // Configure the app to parse JSON data in incoming requests
    app.use(express.json());
    // Define a route handler for GET requests to the "/posts" endpoint
    app.get("/posts", listPosts);
}

export default routes;

