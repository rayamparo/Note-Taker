let express = require("express");
let path = require("path");
let fs = require("fs");
let app = express();
let PORT = process.env.PORT || 3000;
let notes = [];

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, function(req, res){
    console.log("App listening on PORT " + PORT);
});

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/api/notes", function(req, res) {
    fs.readFile('db/db.json', 'utf-8', function(err, data) {
    
       res.send(data);
     });
});

app.post('/api/notes', function(req,res){
    fs.readFile('db/db.json', 'utf-8', function(err, data){
        const db = JSON.parse(data);
        db.push(req.body)
        fs.writeFile('db/db.json', JSON.stringify(db), function(err){
            if(err){
                throw err
            }
            res.send('ok')
        })
    })
})

app.delete('/api/notes/:id', function(req,res){
    fs.readFile('db/db.json', 'utf-8', function(err, data){
        let db = JSON.parse(data);
        db.splice(req.params.id, 1)
        fs.writeFile('db/db.json', JSON.stringify(db), err=>{
            if(err) throw err;
            res.send('yay')
        })
    })
})

app.get("*", (req, res) => {
    res.redirect("/");
});
