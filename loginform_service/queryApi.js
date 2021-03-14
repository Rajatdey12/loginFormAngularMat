const dotenv = require("dotenv");

var moduleQuery = module.exports;
var pool = require('./createDBPool').pool;

dotenv.config({ path: './.env'})

var currentDate = new Date().toISOString().slice(0,10);

/* -- Get All Users --*/
var getAllUsers = (request, response) => {
  pool.query('SELECT * FROM reguser ORDER BY userid ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

/* -- Post a new user --*/
const registerUser = (request, response, next) => {
  const { name, email, password } = request.body

  pool.query('INSERT INTO reguser (username, email, password, date) VALUES ($1, $2, $3, $4)', 
  [name, email, password, currentDate], (error, results) => {
    if (error) {
      next(error)
    }
    else{
    response.status(201).send(`User added with username: ${name}`)
    }
  })
}

moduleQuery.getAllUsers = getAllUsers;
moduleQuery.registerUser = registerUser;