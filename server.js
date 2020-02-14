"use strict";

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5500;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
require("./server-routes/apiRoutes")(app);
require("./server-routes/htmlRoutes")(app);
app.listen(PORT, () => console.log("Ready and listening on : " + PORT));
