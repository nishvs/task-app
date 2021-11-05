import { ConnectionOptions, createConnection,getConnectionOptions } from "typeorm";

export class Postgres {
    public createConnection = async () => {
        const options = await getConnectionOptions(process.env.NODE_ENV);
        Object.assign(options, { url: process.env.DATABASE_URL });
        const connection = await createConnection(options);
        if(!connection.isConnected){
            throw new Error("Cannot connect to database");
        }
    }
}

