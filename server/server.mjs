import express from "express";
import cors from "cors";
import routes from "./routes.mjs";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1", routes);
app.listen(PORT, () => {
    console.log(`Server is Live on ${PORT}`);
});