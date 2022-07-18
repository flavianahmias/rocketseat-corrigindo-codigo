const express = require("express");
const { v4: uuid } = require("uuid");
const app = express();
app.use(express.json());
const repositories = [];
app.get("/repositories", (request, response) => {
  return response.json(repositories);
});
app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = {
    id: uuid(),
    title: title,
    url: url,
    techs: techs,
    likes: 0,
  };
  repositories.push(repository);
  return response.status(201).json(repository);
});
app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  // const updatedRepository = request.body;
  const repository = repositories.find((repository) => repository.id === id);
  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  } else if (title) {
    repository.title = title;
  } else if (url) {
    repository.url = url;
  } else if (techs) {
    repository.techs = techs;
  }
  return response.json(repository);
});
app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex((repository) => repository.id === id);
  if (repositoryIndex === -1) {
    response.status(404).send({ error: "Repository not found" });
  } else if (repositoryIndex >= 0) {
    repositories.splice(repositoryIndex, 1);
    return response.status(204);
  }
});
app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex((repository) => repository.id === id);
  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }
  const validarRepositorio = repositories.some((repository) => repository.id === id);
  if (validarRepositorio) {
  }
  const likes = ++repositories[repositoryIndex].likes;
  return response.json(likes);
});
module.exports = app;
