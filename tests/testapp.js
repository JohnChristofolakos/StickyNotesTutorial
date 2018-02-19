require("mocha");
var sinon = require("sinon");
var request = require("supertest");
var app = require("../app");
var fs = require("fs-extra");

var notes = [ { "text": "This is the note text" } ];

describe("GET /api/notes", function() {
    after( function() {
        app.server.close();
    });

    it("Should respond 200 OK if the JSON file is valid", function(done) {
        sinon.stub(fs, "readJsonSync").returns(notes);
        
        request(app.app)
        .get("/api/notes")
        .expect("Content-Type", /json/)
        .expect(200, notes, done);
    });
});