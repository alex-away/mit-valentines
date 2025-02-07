const express = require("express");
const app = express();

app.listen(5000, () => console.log("Running"));

app.get("/", (req, res) => {
    res.send("MIT Bumble");
    
})