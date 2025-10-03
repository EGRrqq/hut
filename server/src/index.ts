import expess from "express";

const app = expess();
const port = 3000;

app.get("/", (req, res) => {
  res.send("hut-server");
});

app.listen(port, () => {
  console.log(`hut-serve listening on port ${port}`);
});
