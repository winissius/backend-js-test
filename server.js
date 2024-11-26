import express from "express";
import routes from "./src/routes/postsRoutes.js";


// Create an instance of the Express application
const app = express();

routes(app);

// Start the server and listen for incoming requests on port 3000
app.listen(3000, () => {
  console.log("Server is listening...");
});
