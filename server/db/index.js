const {Pool} = require('pg');
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
})

module.exports = {
    // for single queries/non-transactions; avoids risk of leaking client
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    },
    getClient: (callback) => {
        pool.connect((err, client, done) => {
            callback(err, client, done);
        });
    }
}
