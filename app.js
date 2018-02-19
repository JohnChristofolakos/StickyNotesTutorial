var fs = require("fs-extra");
var path = require("path");
var express = require("express");
var app = express();

app.use(express.static("public"));

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.raw( { type: function() { return true; } } ));

app.get("/api/notes", function(req, res) {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

    var notes = fs.readJsonSync(path.resolve(__dirname, "notes.json"));
    res.json(notes);
});

app.post("/api/notes", function(req, res) {
    var payload;
    if (req.body instanceof Uint8Array) {
        payload = JSON.parse(req.body.toString("utf8"));
    }
    else if (req.body instanceof Object) {
        payload = req.body;
    }
    fs.writeJsonSync(path.resolve(__dirname, "notes.json"), payload);
    res.status(200).send();
});

var server = app.listen(3000);

module.exports = {
    app: app,
    server: server
};
