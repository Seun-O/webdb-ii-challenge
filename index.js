const express = require("express");
const helmet = require("helmet");
const dbZoos = require("./knexZoos");
const dbBears = require("./knexBears");

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

/*

route: '/api/bears/'
method: Get
returns: [{ objects}]

*/

server.get("/api/bears", async (req, res) => {
  try {
    const data = await dbBears.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error" });
  }
});

/*

route: '/api/bears/:id'
method: Get
returns: { object }

*/
server.get("/api/bears/:id", async (req, res) => {
  try {
    const data = await dbBears.findById(req.params.id);
    if (!data) {
      res.status(404).json({ message: "ID not found" });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error" });
  }
});

/*

route: '/api/bears/:id'
method: Delete
returns: Number of records updated

*/
server.delete("/api/bears/:id", async (req, res) => {
  try {
    const data = await dbBears.remove(req.params.id);

    if (!data) {
      res.status(404).json({ message: "ID not found" });
    }
    res.status(204).json(data);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error" });
  }
});

/*

route: '/api/bears/'
method: Post
returns: { Object }

*/
server.post("/api/bears/", async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({ message: "Please Include a request body." });
    } else if (!req.body.name) {
      res.status(400).json({ message: "Name field is required in the body" });
    }
    const data = await dbBears.add(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error" });
  }
});

/*

route: '/api/bears/:id'
method: Put
returns: Number of records updated

*/

server.put("/api/bears/:id", async (req, res) => {
  try {
    const data = await dbBears.update(req.params.id, req.body);
    if (!data) {
      res.status(404).json({ message: "ID not found" });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error" });
  }
});

/*

route: '/api/zoos/'
method: Get
returns: [{ objects}]

*/

server.get("/api/zoos", async (req, res) => {
  try {
    const data = await dbZoos.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error" });
  }
});

/*

route: '/api/zoos/:id'
method: Get
returns: { object }

*/
server.get("/api/zoos/:id", async (req, res) => {
  try {
    const data = await dbZoos.findById(req.params.id);
    if (!data) {
      res.status(404).json({ message: "ID not found" });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error" });
  }
});

/*

route: '/api/zoos/:id'
method: Delete
returns: Number of records updated

*/
server.delete("/api/zoos/:id", async (req, res) => {
  try {
    const data = await dbZoos.remove(req.params.id);

    if (!data) {
      res.status(404).json({ message: "ID not found" });
    }
    res.status(204).json(data);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error" });
  }
});

/*

route: '/api/zoos/'
method: Post
returns: { Object }

*/
server.post("/api/zoos/", async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({ message: "Please Include a request body." });
    } else if (!req.body.name) {
      res.status(400).json({ message: "Name field is required in the body" });
    }
    const data = await dbZoos.add(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error" });
  }
});

/*

route: '/api/zoos/:id'
method: Put
returns: Number of records updated

*/

server.put("/api/zoos/:id", async (req, res) => {
  try {
    const data = await dbZoos.update(req.params.id, req.body);
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
