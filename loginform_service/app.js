const express = require("express");
const cors = require('cors');

const dotenv = require("dotenv");
const path = require("path");
var moduleQuery = require('./queryApi');

dotenv.config({ path: './.env'});

const app = express();
app.use(cors());

async function setViewEngine() {

    const publicDirectory = path.join(__dirname, './view');
    app.use(express.static(publicDirectory));
    app.set('views', publicDirectory);
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
}

    app.get("/", (req, res) =>{
        // res.send("loginform service is available!!!");
        res.render("index");
    });

    app.listen(5000, () =>{
        console.log("server started on Port 5000");
    })


/*--Call all Methods here --*/
setViewEngine();

app.use(express.json());
app.get("/getUsers", moduleQuery.getAllUsers);
app.post("/signUp", moduleQuery.registerUser);
