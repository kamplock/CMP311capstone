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
app.get("/api/students", (req, res) => {
    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "doane1234",
        database: "mydb"
    });
    con.connect(function(err){
        if (err) throw err;
        con.query("SELECT * FROM students", function(err, result, fields){
            if (err) throw err;
            else{
                console.log(result);
                res.send(result);
            }
        });
    });
});

//GET ID - SELECT
app.get("/api/students/:id", (req, res) => {
    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "doane1234",
        database: "mydb"
    });
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM students WHERE id = " + parseInt(req.params.id), function(err,result){
            if (err) throw err
            else{
                console.log(result);
                if (result=="") return res.status(404).send("No student with that id was found.");
                    res.send(result); 
            }
        });
    });
});

//POST - INSERT 
app.post("/api/students/", (req, res) => {
    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "doane1234",
        database: "mydb"
    });
    con.connect(function(err){
        if (err) throw err;
        con.query("INSERT INTO students (student_firstname, student_lastname) VALUES ('" + req.body.student_firstname + "', '" + req.body.student_lastname + "')", function(err, result){
            if (err) throw err
            else{
                console.log(result);
                res.send(result);
            }
        });
    });
});

//PUT - UPDATE NAME
app.put("/api/students/", (req, res) => {
    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "doane1234",
        database: "mydb"
    });
    con.connect(function(err){
        if(err) throw err;
        con.query("UPDATE students SET student_firstname = '" + req.body.student_firstname + "' , student_lastname = '" + req.body.student_lastname + "' WHERE id = " + parseInt(req.body.id), function(err, result){
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
app.delete("/api/students/", (req, res) => {
    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "doane1234",
        database: "mydb"
    });
    con.connect(function(err){
        if (err) throw err;
        con.query("DELETE FROM students WHERE id = "+ parseInt(req.body.id), function(err, result){
            if(err) throw err
            else{
                console.log(result);
                if (result.affectedRows==0) return res.status(404).send("No student with that id was found.");
                    console.log("No student with that id was found.");
                    res.send(result);
            }
        });
    });
});


