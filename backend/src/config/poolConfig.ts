import dotenv from 'dotenv'

dotenv.config({ path: '../.env' });



const {
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_NAME
} = process.env;

export const poolConfig = {
    host: DB_HOST,
    port: parseInt(DB_PORT || '5432', 10),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    ssl: {
        rejectUnauthorized: false,
    },
}