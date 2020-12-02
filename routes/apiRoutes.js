// Module enables interacting with the file system.
const fs = require("fs")

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
    
    app.get("/api/notes", (req, res) => {
        return res.json(database);
    });

    app.post("/api/notes", (req, res) => {

        // Set unique id to entry
        if (database.length == 0){
            req.body.id = "0";
        } else{
            req.body.id = JSON.stringify(JSON.parse(database[database.length - 1].id) + 1);
        };
        
        console.log("req.body.id: " + req.body.id);

        // Pushes Body to JSON Array
        database.push(req.body);

        // Write notes data to database
        writeToDB(database);
        console.log(database);

        // returns new note in JSON format.
        res.json(req.body);
    });

    app.delete("/api/notes", (req, res) => {
        // Obtains id and converts to a string
        let id = req.params.id.toString();

        // Goes through notesArray searching for matching ID
        for (i=0; i < database.length; i++){
            
            if (database[i].id == id){
                console.log("match!");
                // responds with deleted note
                res.send(database[i]);

                // Removes the deleted note
                database.splice(i,1);
                break;
            }
        };

        // Write new note data to database
        writeToDB(database);
    });
}