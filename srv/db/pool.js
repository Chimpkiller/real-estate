import dotenv from 'dotenv';
import { Pool } from 'pg';


dotenv.config({ path : '../.env' });


const pool = new Pool({
    host     : process.env.DB_HOST,
    port     : process.env.DB_PORT,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
});


pool.on('error', (error) => {
    console.error('error', error.message);
});


export default pool