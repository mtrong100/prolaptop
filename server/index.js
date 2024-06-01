import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectToMongoDB from "./db/connectToMongoDB.js";
import routes from "./routes/routes.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// CORS configuration ver 1
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (!origin) return callback(null, true);
//     callback(null, true);
//   },
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   credentials: true,
//   allowedHeaders: [
//     "Origin",
//     "X-Requested-With",
//     "Content-Type",
//     "Accept",
//     "Authorization",
//   ],
// };

// CORS configuration ver 2
const corsOptions = {
  origin: (origin, callback) => {
    if (
      !origin ||
      origin === `${process.env.LOCAL_CLIENT_URL}` ||
      origin === `${process.env.LOCAL_CLIENT_URL_2}`
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", routes);

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port: ${PORT}`);
});
