const express = require('express');

// database access using knex
const db = require('../data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
    db.select('*')
        .from('accounts')
        .then(accounts => {
            res.status(200).json(accounts);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: 'could not retrive accounts' });
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;

    db('accounts')
        .where({ id: id })
        .first()
        .then(account => {
            res.status(200).json(account)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: 'unable to retrieve post' })
        })
})

router.post('/', (req, res) => {
    const accountBody = req.body;

    db('accounts')
        .insert(accountBody, "id")
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: 'unable to add account' });
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db('accounts')
        .where({ id })
        .update(changes)
        .then(count => {
            res.status(200).json(count);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: 'unable to update account' });
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    
    db('accounts')
        .where({ id })
        .del()
        .then(count => {
            res.status(200).json(count);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: 'unable to delete the post' });
        })
})
module.exports = router;