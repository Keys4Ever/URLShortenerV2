import { Pool, PoolClient, QueryResult } from 'pg';
import { poolConfig } from '../config/poolConfig';

class DatabaseClient{
    public pool: Pool;

    constructor() {
        this.pool = new Pool(poolConfig);
    }

    async execute(query: string, params?: any[]): Promise<QueryResult> {
        const client = await this.pool.connect();
        try {
            const result = await client.query(query, params);
            client.release();
            return result;
        } catch (error) {
            client.release();
            throw error;
        }
    }

    async transaction<T = any>(callback: (client: PoolClient) => Promise<T>): Promise<T> {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            
            const result = await callback(client);

            await client.query('COMMIT');
            return result;
        }catch(error){
            await client.query('ROLLBACK');
            throw error;
        }finally{
            client.release();
        }
    }
}

const databaseClient = new DatabaseClient();

export default databaseClient;
