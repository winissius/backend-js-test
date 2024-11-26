import fs from "fs"
import { getAllPosts, createPost } from "../models/postsModels.js"

export async function listPosts (req, res)  
{
    // Retrieve all posts from the database
    const posts = await getAllPosts();
    // Send a response with status code 200 (OK) and the posts data in JSON format
    res.status(200).json(posts);
}

export async function newPost(req, res) {
    const newPost = req.body;
    try {
        const createdPost = await createPost(newPost);
        res.status(200).json(createdPost);
    } catch (error) { 
        console.error(error.message)
        res.status(500).json({"Error":"Error in requisition"})
    }
}

export async function uploadImage(req, res) {
    const newPost = {
        description: "",
        imgURL: req.file.originalname,
        alt: ""
    };
    try {
        const createdPost = await createPost(newPost);
        const insertedId = createdPost.insertedId;
        const updatedImage = `uploads/${insertedId}.png`
        fs.renameSync(req.file.path, updatedImage)
        res.status(200).json(createdPost);
    } catch (error) { 
        console.error(error.message)
        res.status(500).json({"Error":"Error in requisition"})
    }
}
