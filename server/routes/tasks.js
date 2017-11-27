var express = require('express');
var router = express.Router();

var pool = require('../modules/pool');

router.get('/', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {

            client.query('SELECT * FROM tasks ORDER BY is_complete, id;', function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            });
        }
    });
});

router.post('/', function (req,res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query("INSERT INTO tasks (name) VALUES ($1)", [req.body.name], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            });
            
        }
    })
})

router.delete('/complete/:id', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`DELETE FROM tasks WHERE id=$1;`, [req.params.id], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
        }
    });
});

router.put('/delete/:id', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done){
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase)
            res.sendStatus(500);
        } else {
            client.query('UPDATE tasks SET is_complete=true WHERE id=$1', [req.params.id], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    res.sendStatus(500)
                } else {
                    res.sendStatus(200)
                }
            })
        }
    })
})


module.exports= router;