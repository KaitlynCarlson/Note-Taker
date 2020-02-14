"use strict";

const savedNotes = require("../db/db.json");
const fs = require("fs");

module.exports = app => {
  app.get("/api/notes", (req, res) => res.json(savedNotes));

  app.post("/api/notes", (req, res) => {
    let id = savedNotes.length;
    savedNotes.id = id + 1;
    console.log(savedNotes.id);
    savedNotes.push(req.body);
    fs.writeFile("./db/db.json", JSON.stringify(savedNotes), err => {
      if (err) throw err;
      console.log("New note added");
    });
    res.json(true);
  });
  app.delete("/api/notes", (req, res) => {
    res.delete(savedNotes);
  });
};
