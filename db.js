


const db_drop_table = () => {
    const mysql = require('mysql');
    const connection = mysql.createConnection({
        host: '79.141.66.70',
        port: '6033',
        user: 'stef',
        password: 'password',
        database: 'leanevent_db'
    });

    connection.connect();

    connection.query("DROP TABLE registrations", (error, results) => {
        if (error) throw error;
        console.log(results);
    })

    connection.end();
}


const db_create_table = () => {
    

    const mysql = require('mysql');
    const connection = mysql.createConnection({
        host: '79.141.66.70',
        port: '6033',
        user: 'stef',
        password: 'password',
        database: 'leanevent_db'
    });

    connection.connect();
    
    connection.query("CREATE TABLE registrations (name VARCHAR(255), regions VARCHAR(255), email VARCHAR(255), chatID INT)", (error, results) => {
        if (error) throw error;
        console.log(results);
    })

    connection.end();

    //SHOW TABLES FROM 'db_name' LIKE 'нужная_таблица';
}


const db_add_team = () => {

}


module.exports = {
    db_create_table, 
    db_add_team,
    db_drop_table
}

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

// var mysql = require('mysql');
// var connection = mysql.createConnection({
//     host: '79.141.66.70',
//     user: 'stef',
//     password: 'password',
//     database: 'leanevent_db'
// });

// connection.connect();
// // let data = "S";
// connection.query('SELECT1+1  AS solution', function (error, results, fields) {
//     if (error) throw error;
//     data = 'The solution is: ' + results[0].solution;
// });

// connection.end();

// module.exports = {
//     data
// }