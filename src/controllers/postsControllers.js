import { getAllPosts } from "../models/postsModels.js"

export async function listPosts (req, res)  
{
    // Retrieve all posts from the database
    const posts = await getAllPosts();
    // Send a response with status code 200 (OK) and the posts data in JSON format
    res.status(200).json(posts);
}