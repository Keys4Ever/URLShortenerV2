import dotenv from 'dotenv'

dotenv.config({ path: '../.env' });



const {
    DB_CONNECTION_STRING
} = process.env;

export const poolConfig = {
    connectionString: DB_CONNECTION_STRING
}