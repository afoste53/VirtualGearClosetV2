import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Import routes
import UserRoutes from "./Routes/UserRoutes.js";

// configure dotenv to read variables from .env as per documentation
dotenv.config();

// connect to database
try {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });

  console.log(`MongoDB Connected : ${conn.connection.host}`.cyan);
} catch (err) {
  console.error(`Error: ${err.message}`);
  process.exit(1);
}

const app = express();

// enable server to parse body of requests
app.use(express.json());

app.use("/api/users", UserRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`.green.bold)
);
