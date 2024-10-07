// //import dependencies
// const http = require('http');
// const port = 3000;
// const server = http.createServer((req, res) => {
//     res.statusCode = 200;

//     res.setHeader('Content_Type', 'text/plain' );
//     res.end('Hello, World');

// });

// server.listen(port, () => {
//     console.log(`Server is running at port: ${port}`);
// })


// let express = require('express');
// let app = express();
// let mysql = require('mysql2')
// var connection = mysql.createConnection({
//     host: 'localhost',
//     database: 'expense_tracker_copy',
//     user: 'root',
//     password: '@2468' 
// })


// app.listen(3000, () => {
//     console.log("Server is running on port 3000")
//     connection.connect((err) => {
//         if (err)  {
//             console.log("Error connecting")
//         }
//         console.log("Database connected")
//     })
// });


// app.get('/', (req, res) =>{
//     res.send("Hey i launched this endpoint");
// })

// app.get('/contact', (req, res) => {
//     let sql = `SELECT * FROM expenses`;
//     connection.query(sql, (err, results) => {
//         if (err) throw err;
//         res.send(results);
//     })

// })



// var express = require('express');
// var app = express();
// var mysql = require('mysql2');

// var db = mysql.createConnection({
//     host: 'localhost',
//     database: 'hospital_db1',
//     user: 'root',
//     password: '@2468'
// });


// app.listen(3000, () => {
//     console.log("App is running on port 3000");
//     db.connect((err)=>{
//         if(err){
//             console.log("Connection Error")
//         }
//         console.log("Database Connected successfully")
//     });
// });

// app.get('/', (req, res) => {
//     sql = `SELECT * FROM patients`;
//     db.query(sql, (err, results) => {
//         if(err) throw err;
//         res.send(results);
//     })
// });



// var express = require('express');
// var app = express();
// var mysql = require('mysql2')


// var db = mysql.createConnection({
//     host:'localhost',
//     database: 'hospital_db1',
//     user: 'root',
//     password: '@2468'
// })

// app.listen(5000, () => {
//     console.log("Server is Listening on port 5000")
// });

// app.get('/',(req, res) => {
//     res.send("I Opened a new port");
// })

// app.get('/patients', (req, res) =>{
//     db.query(`SELECT * FROM patients`,(err, result) => {
//         if (err){
//             console.log("Error connecting to database")
//         }
//         res.send(result);
//     })
// })


// Import our dependancies
const express = require('express')
const app = express();
const mysql = require('mysql2')
const dotenv = require('dotenv')
dotenv.config();//Configure Environment variables



//Start and listen to the server
app.listen(3000, ()=>{
    console.log('Server is running on port 3000....')
})

// Endpoint to say hello world
app.get('', (req, res) => {
    res.send("HELLO WORLD MEET ME BRAYO THE GURU");
});

// Create a connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
})

//Test the db connection
db.connect((err) => {
    if (err){
       return console.log("ERROR CONNECTING TO DATABASE: ", err)
    }
    console.log("CONNECTED SUCCESSFULLY: ",db.threadId)
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');
})


app.get('/patients',(req, res) => {
    const sql = `SELECT first_name, last_name FROM patients`;
    db.query(sql,(err, result) => {
        if (err) {
            return res.status(400).send("FAILED TO GET PATIENTS", err)
        }
        res.status(200).render('patients', {result: result})
    })
})

app.get('/getPatients', (req, res) =>{
    const getPatients = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';

    db.query(getPatients, (err, results) => {
        if(err){
            console.log(err);
            return res.status(500).send('Failed to get patients');
        }else{
             res.render('getPatients', {results: results})
            }
    });
});

app.get('/providers', (req,res) =>{
    const providers = 'SELECT first_name, last_name, provider_specialty FROM providers';

    db.query(providers, (err, results) =>{
        if(err){
            console.log(err);
            return res.status(500).send('Failed to get patients');
        }else{
            res.render('providers', {results: results})
        }
    })
})
app.get('/specialty', (req,res) =>{
    const specialty = 'SELECT provider_specialty FROM providers';

    db.query(specialty, (err,results) =>{
        if(err){
            console.log(err);
            return res.status(500).send('Failed to get specialty');
        }else{
            res.render('specialty', {results: results})
        }
    });
});



