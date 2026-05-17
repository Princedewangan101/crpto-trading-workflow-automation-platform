import "dotenv/config";
import express from 'express';
import cors from 'cors';
import { authMiddleware } from "./authMiddleware.js";
import router from "./routes.js";
import connectDb from "./db.js";


const app = express();
await connectDb();

app.use(cors());
app.use(express.json());

// app.use(authMiddleware)

app.get("/", (req, res) => { return res.status(200).json({ message: "getiing route" }) })

app.use("/v1", router)

app.listen(process.env.PORT, () => {
    console.log("server is running at 5000");
})
