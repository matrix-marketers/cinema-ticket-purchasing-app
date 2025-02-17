import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import cinemaRoutes from "./routes/cinemaRoutes";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/cinemas", cinemaRoutes);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
