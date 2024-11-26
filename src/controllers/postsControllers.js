import fs from "fs"
import { getAllPosts, createPost, updateExistentPost } from "../models/postsModels.js"
import generateDescription from "../services/geminiService.js"

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

export async function updatePost(req, res) {
    const id = req.params.id;
    const urlImage = `http://localhost:3000/${id}.png`
        try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const description = await generateDescription(imgBuffer)

        const post = {
            imgURL: urlImage,
            description: description,
            alt: req.body.alt
        }

        const createdPost = await updateExistentPost(newPost);
        res.status(200).json(createdPost);
    } catch (error) { 
        console.error(error.message)
        res.status(500).json({"Error":"Error in requisition"})
    }
}