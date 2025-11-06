import express from "express";
import Person from "../models/Person.js";

const router = express.Router();

// === Get all people ===
router.get("/", async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// === Get a single person by ID ===
router.get("/:id", async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) return res.status(404).json({ message: "Person not found" });
    res.json(person);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// === Add a new person ===
router.post("/", async (req, res) => {
  const { name, age, nationality } = req.body;
  try {
    const newPerson = new Person({ name, age, nationality });
    const savedPerson = await newPerson.save();
    res.status(201).json(savedPerson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// === Update an existing person ===
router.put("/:id", async (req, res) => {
  const { name, age, nationality } = req.body;
  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      { name, age, nationality },
      { new: true, runValidators: true }
    );

    if (!updatedPerson) return res.status(404).json({ message: "Person not found" });

    res.json(updatedPerson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// === Delete a person ===
router.delete("/:id", async (req, res) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(req.params.id);
    if (!deletedPerson) return res.status(404).json({ message: "Person not found" });
    res.json({ message: "Person deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
