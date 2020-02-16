"use strict";

const savedNotes = require("../db/db.json");
const fs = require("fs");

module.exports = app => {
  app.get("/api/notes", (req, res) => res.json(savedNotes));

  app.post("/api/notes", (req, res) => {
    let newNote = req.body;
    let id = savedNotes.length + 1;
    newNote.id = id;
    console.log(savedNotes.id);
    savedNotes.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(savedNotes), err => {
      if (err) throw err;
      console.log("New note added!");
    });
    res.json(true);
  });
  app.delete("/api/notes/:id", (req, res) => {
    const deleteId = parseInt(req.params.id);
    for (let i = 0; i < savedNotes.length; ++i) {
      if (deleteId === savedNotes[i].id) {
        savedNotes.splice(i, 1);
        return;
      }
    }
    fs.writeFile("./db/db.json", JSON.stringify(savedNotes), err => {
      if (err) throw err;
      console.log("Note successfully deleted!");
    });
    res.send(savedNotes);
  });
};
