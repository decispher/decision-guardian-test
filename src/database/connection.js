/**
 * Database Connection Pool Configuration
 * 
 * WARNING: Pool size is intentionally fixed at 20.
 * See DECISION-DB-001 for rationale.
 */

const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'app_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,

    // Pool configuration - DO NOT MODIFY without load testing
    max: 20,              // Maximum connections (see DECISION-DB-001)
    min: 5,               // Minimum connections
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

pool.on('error', (err) => {
    console.error('Unexpected database pool error:', err);
    process.exit(-1);
});

pool.on('connect', () => {
    console.log('Database connection established');
});

async function query(text, params) {
    const start = Date.now();
    const result = await pool.query(text, params);
    const duration = Date.now() - start;

    console.log('Query executed', { text, duration, rows: result.rowCount });
    return result;
}

async function getClient() {
    const client = await pool.connect();
    const originalRelease = client.release.bind(client);

    client.release = () => {
        client.release = originalRelease;
        return originalRelease();
    };

    return client;
}

async function healthCheck() {
    try {
        const result = await pool.query('SELECT NOW()');
        return { status: 'healthy', timestamp: result.rows[0].now };
    } catch (error) {
        return { status: 'unhealthy', error: error.message };
    }
}

module.exports = {
    pool,
    query,
    getClient,
    healthCheck,
};
