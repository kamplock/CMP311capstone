var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "doane1234",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = `CREATE TABLE student_courses (id INT AUTO_INCREMENT PRIMARY KEY, student_id INT, course_id INT, 
    FOREIGN KEY (student_id) REFERENCES students(id), FOREIGN KEY (course_id) REFERENCES courses(id))`;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log("Table created");
  });
});