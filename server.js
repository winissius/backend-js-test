import express from "express";

const posts = [
    {
        id: 1,
        description: "test",
        image: "https://placecats.com/millie/300/150"
    },
    {
        id: 2,
        description: "Um gato adorável tomando sol.",
        image: "https://placecats.com/millie/300/150"
      },
      {
        id: 3,
        description: "Um gatinho curioso explorando uma caixa.",
        image: "https://placecats.com/millie/300/150"
      },
      {
        id: 4,
        description: "Gato preguiçoso dormindo em uma cesta.",
        image: "https://placecats.com/millie/300/150"
      },
      {
        id: 5,
        description: "Gato brincando com um passarinho de brinquedo.",
        image: "https://placecats.com/millie/300/150"
      },
      {
        id: 6,
        description: "Gato comendo ração de forma muito engraçada.",
        image: "https://placecats.com/millie/300/150"
      }
];

const app = express();
app.use(express.json())

app.listen(3000, () => {
    console.log("Server is listening...");
});

app.get("/posts", (req, res) => {
    res.status(200).json(posts);
});

function searchPostID(id){
    return posts.findIndex((post) => {
        return post.id === Number(id)
    })
}

app.get("/posts/:id", (req, res) => {
    const index = searchPostID(req.params.id)
    res.status(200).json(posts[index]);
});