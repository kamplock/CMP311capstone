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

//GET - SELECT ALL
app.get("/api/studentcourses", (req, res) => {
    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "doane1234",
        database: "mydb"
    });
    con.connect(function(err){
        if (err) throw err;
        con.query("SELECT * FROM student_courses", function(err, result, fields){
            if (err) throw err;
            else{
                console.log(result);
                res.send(result);
            }
        });
    });
});


//POST - INSERT 
//make sure student id exists, make sure course id exists
app.post("/api/studentcourses/", (req, res) => {
    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "doane1234",
        database: "mydb"
    });
    con.connect(function(err){
        if (err) throw err;
        con.query("INSERT INTO student_courses (student_id, course_id) VALUES ('" + req.body.student_id + "', '" + req.body.course_id + "')", function(err, result){
            if (err) throw err
            else{
                console.log(result);
                res.send(result);
            }
        });
    });
});


//PUT - UPDATE
app.put("/api/studentcourses/", (req, res) => {
    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "doane1234",
        database: "mydb"
    });
    con.connect(function(err){
        if(err) throw err;
        con.query("UPDATE student_courses SET student_id = " + parseInt(req.body.student_id) + ", course_id = " + parseInt(req.body.course_id) + " WHERE id = " + parseInt(req.body.id), function(err, result){
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
app.delete("/api/studentcourses/", (req, res) => {
    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "doane1234",
        database: "mydb"
    });
    con.connect(function(err){
        if (err) throw err;
        con.query("DELETE FROM student_courses WHERE id = "+ parseInt(req.body.id), function(err, result){
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

//get student_id col and return first and last names
app.get("/api/studentcoursesname", (req, res) => {
    let con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "doane1234",
      database: "mydb"
    });
    con.connect(function(err) {
      if (err) throw err;
      con.query(
        `SELECT student_courses.student_id, students.student_firstname, students.student_lastname
                 FROM student_courses
                 JOIN students ON student_courses.student_id = students.id`,
        function(err, result, fields) {
          if (err){
            console.error(err.stack);
            res.send("Error: " + err.message);
          }
          else {
            console.log(result);
            res.send(result);
          }
        }
      );
    });
  });

  //get a students class schedule
  app.get("/api/studentcourses/schedule", (req, res) => {
    let con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "doane1234",
      database: "mydb"
    });
    con.connect(function(err) {
      if (err) throw err;
      con.query(
        `SELECT students.id, students.student_firstname, students.student_lastname, courses.class_name
                 FROM student_courses
                 JOIN students ON student_courses.student_id = students.id
                 JOIN courses ON student_courses.course_id = courses.id
                 WHERE students.id = ?`, [req.body.id],
        function(err, result, fields) {
          if (err) throw err;
          else {
            console.log(result);
            res.send(result);
          }
        }
      );
    });
  });
  
  //class roster
  app.get("/api/studentcourses/course", (req, res) => {
    let con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "doane1234",
      database: "mydb"
    });
    con.connect(function(err) {
      if (err) throw err;
      con.query(
        `SELECT courses.id, courses.class_name, students.id, students.student_firstname, students.student_lastname
                 FROM student_courses
                 JOIN courses ON student_courses.course_id = courses.id
                 JOIN students ON student_courses.student_id = students.id
                 WHERE courses.id = ?`, [req.body.id],
        function(err, result, fields) {
          if (err) throw err;
          else {
            console.log(result);
            res.send(result);
          }
        }
      );
    });
  });
  
  



