import { MongoClient } from "mongodb";

const connectionString = "";
const client = new MongoClient(connectionString);

let conn;
try {
    conn  = await client.connect();
} catch(e) {
    console.error('Error: ', e);
}
let db = conn.db('kennect-db');
export default db;