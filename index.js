const express = require("express");
const helmet = require("helmet");
const db = require("./knex");

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.get("/api/zoos", async (req, res) => {
  try {
    const data = await db.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error" });
  }
});

server.get("/api/zoos/:id", async (req, res) => {
  try {
    const data = await db.findById(req.params.id);
    if (!data) {
      res.status(404).json({ message: "ID not found" });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error" });
  }
});

server.delete("/api/zoos/:id", async (req, res) => {
  try {
    const data = await db.remove(req.params.id);

    if (!data) {
      res.status(404).json({ message: "ID not found" });
    }
    res.status(204).json(data);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error" });
  }
});

server.post("/api/zoos/", async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({ message: "Please Include a request body." });
    } else if (!req.body.name) {
      res.status(400).json({ message: "Name field is required in the body" });
    }
    const data = await db.add(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error" });
  }
});
server.put("/api/zoos/:id", async (req, res) => {
  try {
    const data = await db.update(req.params.id, req.body);
    if (!data) {
      res.status(404).json({ message: "ID not found" });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error" });
  }
});

const PORT = 3300;
server.listen(PORT, function() {
  console.log(`\n=== Web API Listening on http://localhost:${PORT} ===\n`);
});
