const postgres = require("pg");

const dotenv = require("dotenv");
dotenv.config({ path: './.env'});

const dbConfig = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT
}

var pool = new postgres.Pool(dbConfig);

pool.connect((error) =>{
    if(error){
        console.log("DB connecting.....", error);
    }
    else {
        console.log("POSTGRES connected to......."+ dbConfig.database);
    }
});

module.exports.pool = pool;