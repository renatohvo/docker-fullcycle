const express = require('express')
const faker = require('faker')
const app = express()
const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)

app.get('/', (req, res) => {
  const createQuery = `
      CREATE TABLE IF NOT EXISTS people (
        id INT(11) NOT NULL AUTO_INCREMENT,
        name VARCHAR(150) NOT NULL,
        PRIMARY KEY (id)
      )
    `;
  connection.query(createQuery)

  const randomFirstName = faker.name.firstName();
  const randomLastName = faker.name.lastName();

  const insertQuery = `INSERT INTO people(name) values ('${randomFirstName} ${randomLastName}')`;
  connection.query(insertQuery)

  const selectQuery = `SELECT name FROM people`;
  connection.query(selectQuery, (err, results) => {
    if (err) throw err;
    let responseHTML = `<h1>Full Cycle Rocks !!!</h1><ul>`;
    results.forEach(person => {
      responseHTML += `<li>${person.name}</li>`;
    });
    responseHTML += '</ul>';
    res.send(responseHTML);
  });
});

app.listen(port, () => {
  console.log('Rodando na porta: ' + port)
})
