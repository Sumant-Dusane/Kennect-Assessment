import { MongoClient } from "mongodb";

const connectionString = "mongodb+srv://sumant-dusane:sumant123456@sumant-dusane.3donyvz.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp";
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