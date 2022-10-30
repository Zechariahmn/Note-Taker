const express = require("express");
const fs = require("fs");

const path = require("path");
const database = require("./db/db.json");

var app = express();
var PORT = process.env.PORT || 3001;

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", function (req, res){
    res.sendFile(path.join(__dirname, "/public/index.html"));
})


app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})


app.route("/api/notes")
    .get(function(req, res){
        res.json(database);
    })

    .post(function(req, res){
        let jsonPath = path.join(__dirname, "./db/db.json");
        let newNote = req.body;

        let largestId = 50;

        for (let i =0; i < database.length; i++) {
            let eachnote = database[i];
            if (eachnote.id > largestId){
                largestId = eachnote.id;
            }
        }

        newNote.id = largestId + 1;
        database.push(newNote)
        
        fs.writeFile(jsonPath, JSON.stringify(database),function (err){
            if (err){
                return console.log(err);
            }
            console.log("saved note");
        })
        res.json(newNote);
    })

app.delete("/api/notes", function (req, res) {

    let jsonPath = path.join(_dirname, "./db/db.json");

    for (let i = 0; i < database.length; i++) {
        if (database[i].id == req.params.id){
            database.splice(i, 1);
            break;
        }
    }

    fs.writeFile(jsonPath, JSON.stringify(database),function (err){
        if (err){
            return console.log(err);
        }
        console.log("note deleted");
         
    })

    res.json(database);

})

app.listen(PORT, () =>
  console.log(`listening at http://localhost:${PORT}`)
);