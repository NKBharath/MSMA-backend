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

const allowedOrigins = [
    "http://localhost:5173",
    "https://msma-frontend.vercel.app"
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.options("*", cors());

app.use(express.json());
app.use("/api/seed", seedDatabase);
app.use("/api/admin", adminRoutes);
app.use("/api/base-commander", baseCommanderRoutes);

db.serialize(()=>{
    console.log("SQL lite Database ready to use");
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
