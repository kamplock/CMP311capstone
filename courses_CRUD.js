var mysql = require("mysql");
const express = require("express");
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

app.get('/', (req,res) => {
    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "doane1234",
        database: "mydb"
    });
    con.connect(function(err){
        if(err) throw err;
        console.log("Connected!");

    });
    res.send("Connected!");
});

//GET - SELECT
app.get("/api/courses", (req, res) => {
    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "doane1234",
        database: "mydb"
    });
    con.connect(function(err){
        if (err) throw err;
        con.query("SELECT * FROM courses", function(err, result, fields){
            if (err) throw err;
            else{
                console.log(result);
                res.send(result);
            }
        });
    });
});

//GET ID - SELECT
app.get("/api/courses/:id", (req, res) => {
    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "doane1234",
        database: "mydb"
    });
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM courses WHERE id = " + parseInt(req.params.id), function(err,result){
            if (err) throw err
            else{
                console.log(result);
                if (result=="") return res.status(404).send("No course with that id was found.");
                    res.send(result); 
            }
        });
    });
});

//POST - INSERT 
app.post("/api/courses/", (req, res) => {
    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "doane1234",
        database: "mydb"
    });
    con.connect(function(err){
        if (err) throw err;
        con.query("INSERT INTO courses (class_name) VALUES ('" + req.body.class_name + "')", function(err, result){
            if (err) throw err
            else{
                console.log(result);
                res.send(result);
            }
        });
    });
});

//PUT - UPDATE COURSE NAME
app.put("/api/courses/", (req, res) => {
    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "doane1234",
        database: "mydb"
    });
    con.connect(function(err){
        if(err) throw err;
        con.query("UPDATE students SET class_name = '" + req.body.class_name + "' WHERE id = " + parseInt(req.body.id), function(err, result){
            if(err) throw err
            else{
                console.log(result);
                if (result.affectedRows==0) return res.status(404).send("id out of range.");
                    res.send(result);
            }
        });
    });
});


//DELETE - DELETE
app.delete("/api/courses/", (req, res) => {
    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "doane1234",
        database: "mydb"
    });
    con.connect(function(err){
        if (err) throw err;
        con.query("DELETE FROM courses WHERE id = "+ parseInt(req.body.id), function(err, result){
            if(err) throw err
            else{
                console.log(result);
                if (result.affectedRows==0) return res.status(404).send("No course with that id was found.");
                    console.log("No course with that id was found.");
                    res.send(result);
            }
        });
    });
});


