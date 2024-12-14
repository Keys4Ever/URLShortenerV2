import { PoolClient } from "pg";
import databaseClient from "../utils/DatabaseClient.js";

// Params interfaces
interface initializeUrlStatsParams {
    urlId: string;
    client: PoolClient
}


class Stats{
    
    async initializeUrlStats(params: initializeUrlStatsParams): Promise<void> {
        const { client, urlId } = params;
        const query = `
            INSERT INTO url_stats (url_id, clicks, access_date)
            VALUES ($1, 0, NOW())
            ON CONFLICT (url_id) DO NOTHING;
        `;
    
        try {
            await client.query(query, [urlId]);
        } catch (error) {
            console.error("Error al crear la tabla url_stats:", error);
            throw error;
        }
    }
    async updateClicks(shortUrl: string): Promise<void> {
        try {
            const id = await getIdFromUrl(shortUrl);
        
            const response = await databaseClient.execute("UPDATE url_stats SET clicks = clicks + 1 WHERE url_id = $1", [id]);

            if (response.rowCount === 0) {
                throw new Error("No se pudo actualizar el contador de clics.");
            }
        } catch (error) {
            console.error("Error actualizando clics:", error);
            throw error;
        }
    }

    async getOneDayClics(id: string, day: string): Promise<number> {
        try {
            const [dayPart, monthPart, yearPart] = day.split('/');
            const date = new Date(`${yearPart}-${monthPart}-${dayPart}T00:00:00Z`);
        
            if (isNaN(date.getTime())) {
              throw new Error("Fecha inválida");
            }
        
            // Calculate the start and end of the specified day in ISO format
            const startOfDay = new Date(date.setHours(0, 0, 0, 0)).toISOString();
            const endOfDay = new Date(date.setHours(23, 59, 59, 999)).toISOString();
        
        
            const response = await databaseClient.execute('SELECT SUM(clicks) AS total_clicks FROM url_stats WHERE url_id = $1 AND access_date >= $2 AND access_date <= $3', [id, startOfDay, endOfDay]);
        
            // Return the total clicks or 0 if no clicks are recorded
            return response.rows[0]?.total_clicks || 0;
        
          } catch (error) {
            console.error("Error obtaining clicks for the specific day:", error);
            throw error;
          }
    }

}


// Aux funcs
async function getIdFromUrl(shortUrl: string): Promise<string> {

    try {
        const { rows } = await databaseClient.execute("SELECT id FROM urls WHERE short_url = $1", [shortUrl]);   

        if (rows.length === 0) {
            throw new Error("No se encontró la URL");
        }

        return rows[0].id;

    } catch (error) {
        console.error("Error obteniendo id de la URL:", error);
        throw error;
    }

}


const stats = new Stats();
export default stats;