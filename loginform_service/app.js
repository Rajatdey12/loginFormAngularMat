const express = require("express");
const mySql = require("mysql");
const dotenv = require("dotenv");

dotenv.config({ path: './.env'})

const app = express();
const db = mySql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

db.connect((error) =>{
    if(error){
        console.log("DB connect.....", error);
    }
    else{
        console.log("MYSQL connected.......");
    }
});

app.get("/", (req, res) =>{
    res.send("loginform service is available!!!");
});

app.listen(5000, () =>{
    console.log("server started on Port 5000");
})