import connectDB from "../config/dbConfig.js";
import { ObjectId } from "mongodb";

// Establish a connection to the MongoDB database using the provided connection string
const connection = await connectDB(process.env.STRING_CONNECTION);

// Asynchronous function to retrieve all posts from the MongoDB database
export async function getAllPosts() {
    // Select the "social-backend" database
    const db = connection.db("social-backend");
  
    // Select the "posts" collection within the database
    const collection = db.collection("posts");
  
    // Find all documents in the collection and return them as an array
    return collection.find().toArray();
  }

  export async function createPost(newPost) {
    const db = connection.db("social-backend");
    const collection = db.collection("posts");
    return collection.insertOne(newPost);
  }

  export async function updateExistentPost(id, newPost) {
    const db = connection.db("social-backend");
    const collection = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return collection.updateOne({_id: new ObjectId(objID)}, {$set:newPost});
  }