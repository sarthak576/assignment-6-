const express = require("express");
const router = express.Router();

let users = [];

// Create a new user
router.post("/", (req, res) => {
  const user = req.body;
  users.push(user);
  res.status(201).send(user);
});

// Get all users
router.get("/", (req, res) => {
  res.send(users);
});

// Get a user by ID
router.get("/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");
  res.send(user);
});

// Update a user by ID
router.put("/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");

  Object.assign(user, req.body);
  res.send(user);
});

// Delete a user by ID
router.delete("/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).send("User not found");

  users.splice(userIndex, 1);
  res.status(204).send();
});

module.exports = router;
