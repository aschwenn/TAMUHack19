// Imports
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require('mysql');
var prompt = require('prompt');
//var cors = require('cors');

console.log('Hello, World!');

var db = mysql.createConnection({
    host:   '23.229.190.133',
    port:   '3306',
    user:   'manofthekinfolk',
    password:   process.env.PASSWORD || 'al19as19dk19ke19',
    database:   'TAMUHackClass'
})
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database!');
})

// Initialize express server
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
/*app.use(cors({
    origin: 'http://localhost:8100/'
}));*/
app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

// HTTP request handlers
app.get('/', (req, res) => {
    console.log('Homepage visited.');
    res.send('Howdy!');
});
app.post('/courseQuery/', (req, res) => {
    console.log(req.body);
    if (!req.body.dept || !req.body.course){
        res.status(400).send('400 Error!');
    }
    console.log('Course request for ' + req.body.dept + ' ' + req.body.course);

    let sql = `SELECT * FROM Classes WHERE Class_Dept='` + req.body.dept + `' AND Course_No='` + req.body.course + `'`;
    db.query(sql, (err, result, fields) => {
        console.log('first query');
        if (err) throw err;

        console.log(result);
        if (result.length == 0) res.send([]); // course not found or incorrectly stored

        let classId = result[0].Class_id;
        let sql2 = `SELECT * FROM Sections WHERE Class_id='` + classId + `'`;
        db.query(sql2, (err2, result2, fields2) => {
            if (err2) throw err2;

            var json = [];
            result2.forEach(sec => {

                let profId = sec.Instructor_ID;
                let sql3 = `SELECT * FROM Professors WHERE Prof_id='` + profId + `'`;
                db.query(sql3, (err3, result3, fields3) => {
                    if (err3) throw err3;

                    if (results3.length == 0) return []; // prof not found

                    j = {
                        section: sec.Section_Name,
                        term: sec.Section_Term,
                        prof_firstname: results3[0].Prof_FirstName,
                        prof_lastname: results3[0].Prof_LastName,
                        A: sec.A_Grade,
                        B: sec.B_Grade,
                        C: sec.C_Grade,
                        D: sec.D_Grade,
                        F: sec.F_Grade,
                        GPA: sec.GPA,
                        I: sec.I_Grade,
                        S: sec.S_Grade,
                        U: sec.U_Grade,
                        Q: sec.Q_Grade,
                        X: sec.X_Grade
                    }
                    json.push(j);
                });            
            });
        });
        res.send(json);
    });
});

// Start server on port 8080
var port = 8080;
app.listen(port, () => {
    console.log('Server started on port ' + port);
    console.log('\n\n');
});