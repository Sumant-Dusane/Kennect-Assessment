import { MongoClient } from "mongodb";

const connectionString = process.env.MONGO_URI;
const client = new MongoClient(connectionString);

let conn;
try {
    conn  = await client.connect();
    console.log("DB CONNECTED");
} catch(e) {
    console.error('Error: ', e);
}
let db = conn.db('kennect-db');
export default db;