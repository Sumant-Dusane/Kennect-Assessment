import express from "express";
import cors from "cors";
import router from "./routes.mjs";

const PORT = 9700;
const app = express();
app.use(cors);
app.use(express.json());
app.use("/api/v1", router);
app.listen(PORT, () => {
    console.log(`Server is Live on ${PORT}`);
});