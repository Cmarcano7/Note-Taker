// Module enables interacting with the file system.
const fs = require("fs")

// Package used to create unique ids
const { v4: uuidv4 } = require('uuid');

// Aquiring all the JSON data
var database = require("../db/db.json")

// Exporting to main server file
module.exports = function(app) {
    // Function used in post and delete methods
    function writeToDB(notes){
        // Converts new JSON data into a string
        notes = JSON.stringify(notes);
        // Saves new JSON string to the database
        fs.writeFileSync("./db/db.json", notes, function(err){
            if (err) {
                return console.log(err);
            }
        });
    };
    
    // Displays all api data saved on database var
    app.get("/api/notes", (req, res) => {
        return res.json(database);
    });

    // Post data once corresponding icon is clicked
    app.post("/api/notes", (req, res) => {

        // Making use of the unique id generator uuid
        req.body.id = uuidv4();

        // Pushes Body to JSON Array
        database.push(req.body);

        // Write notes data to database
        writeToDB(database);
        console.log(database);

        // returns new note in JSON format.
        res.json(req.body);
    });

    // Delete used once user hits corresponding icon, will search based on unique id given to each key
    app.delete("/api/notes/:id", (req, res) => {
        // Sets a variables for the for loop below
        let id = req.params.id;

        // Searches database array for matching id
        for (i=0; i < database.length; i++){
            
            //  Executes delete once a match is found between ids
            if (database[i].id == id){
                res.send(database[i]);
                database.splice(i,1);
                break;
            }
        };

        // Write new note data to database
        writeToDB(database);
    });
}