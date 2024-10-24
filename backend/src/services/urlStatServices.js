import client from "../utils/turso.js"
export const updateClicks = async (shortUrl) => {
    try {
        const id = await getIdFromUrl(shortUrl);

        const response = await client.execute({
            sql: "UPDATE url_stats SET clicks = clicks + 1 WHERE url_id = ?",
            args: [id]
        });

        if (response.rowsAffected === 0) {
            throw new Error("No se pudo actualizar el contador de clics.");
        }

    } catch (error) {
        console.error("Error actualizando clics:", error);
        throw error;
    }
};

export const getOneDayClics = async (id, day) => {
    try {
        // Validar y convertir el string de fecha "día/mes/año" a un objeto Date
        const [dayPart, monthPart, yearPart] = day.split('/');
        const date = new Date(`${yearPart}-${monthPart}-${dayPart}T00:00:00Z`); // Formato ISO para el objeto Date

        if (isNaN(date)) {
            throw new Error("Fecha inválida");
        }

        // Calcular el inicio y el fin del día especificado
        const startOfDay = new Date(date.setHours(0, 0, 0, 0)).toISOString();
        const endOfDay = new Date(date.setHours(23, 59, 59, 999)).toISOString();

        const response = await client.execute({
            sql: "SELECT COUNT(*) AS clicks FROM url_stats WHERE url_id = ? AND timestamp >= ? AND timestamp <= ?",
            args: [id, startOfDay, endOfDay]
        });

        // Retornar la cantidad de clics
        return response.rows[0].clicks || 0; // Asegurarse de devolver 0 si no hay clics

    } catch (error) {
        console.error("Error obteniendo clics del día específico:", error);
        throw error;
    }
};


export const addUrlToUrlStats = async (id) => {
    const transaction = await client.transaction("write");
    try {
        if (!id) {
            throw new Error("Necesita URL");
        }

        const response = await transaction.execute({
            sql: "INSERT INTO url_stats (url_id, count) VALUES (?,?)",
            args: [id, 0]
        });

        if (response.rowsAffected == 0) {
            throw new Error("No se pudo añadir.");
        }

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

export const getIdFromUrl = async (shortUrl) => {
    try {
        if (!shortUrl) {
            throw new Error("Necesita URL");
        }

        const response = await client.execute({
            sql: "SELECT id FROM urls WHERE short_url = ?",
            args: [shortUrl]
        });

        if (response.rows.length === 0) {
            throw new Error("No se encontró la URL");
        }

        return response.rows[0].id;
        
    } catch (error) {
        throw error;
    }
};
