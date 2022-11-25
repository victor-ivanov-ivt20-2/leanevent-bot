//GMwqbJYpJW3B

// const {Sequelize} = require('sequelize');

// module.exports = new Sequelize(
//     'leanevent_db',
//     'leanevent',
//     'GMwqbJYpJW3B',
//     {
//         host: '79.141.66.70',
//         port: '6603',
//         dialect: 'mssql'
//     }
// )

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '79.141.66.70',
    user: 'leanevent',
    password: 'GMwqbJYpJW3B',
    database: 'leanevent_db'
});

connection.connect();
// let data = "S";
connection.query('SELECT1+1  AS solution', function (error, results, fields) {
    if (error) throw error;
    data = 'The solution is: ' + results[0].solution;
});

connection.end();

// module.exports = {
//     data
// }