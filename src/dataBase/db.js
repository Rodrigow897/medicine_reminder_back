const {Pool} = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'reminder_db',
    password: 'Messi10*',
    port: 5432
});

pool.connect()
.then(() => console.log('Connected to the database'))
.catch(err => console.error('Connection failed', err));

module.exports = pool