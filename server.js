const express = require('express');

const accountsRouter = require('./accounts/accounts-router');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());
server.use('/api/accounts', accountsRouter);

server.get('/', (req, res) => {
    res.send('<h3>DB Helpers with knex</h3>')
})

module.exports = server;