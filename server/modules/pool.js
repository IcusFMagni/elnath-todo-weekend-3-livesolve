var pg = require('pg');

var config = {
    database: 'tasks', 
    host: 'localhost', 
    port: 5432, 
    max: 10, 
    idleTimeoutMillies: 30000 
};

module.exports = new pg.Pool(config);