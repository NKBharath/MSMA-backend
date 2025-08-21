const express = require("express");
const cors = require("cors");
const adminRoutes = require("./src/routes/adminRoutes");
const baseCommanderRoutes = require("./src/routes/baseCommanderRoutes");
const app = express();
const db = require("./config/db");
require("./models/initDB");
const { seedDatabase } = require("./seeddata");
// const bcrypt = require('bcrypt');

// const password = 'basealpha'; 
// const saltRounds = 10;

// bcrypt.hash(password, saltRounds, (err, hash) => {
//     if(err) {
//         console.error(err);
//         return;
//     }
//     console.log("Hashed Password:", hash);
// });


app.use(cors({
  origin: ['https://msma-frontend.vercel.app', 'http://localhost:3000'], // Add your frontend URLs
  credentials: true, // If you're using cookies/sessions
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.options("*", cors());

app.use(express.json());
app.use("/api/seed", seedDatabase);
app.use("/api/admin", adminRoutes);
app.use("/api/base-commander", baseCommanderRoutes);

db.serialize(()=>{
    console.log("SQL lite Database ready to use");
})
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ['https://msma-frontend.vercel.app', 'http://localhost:3000'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
