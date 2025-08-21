const express = require("express");
const cors = require("cors");
const adminRoutes = require("./src/routes/adminRoutes");
const baseCommanderRoutes = require("./src/routes/baseCommanderRoutes");
const app = express();
const db = require("./config/db");
require("./models/initDB");
const { seedDatabase } = require("./seeddata");


const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : [
      "http://localhost:5173", 
      "https://msma-frontend.vercel.app" 
    ];

app.use(cors())
app.use(express.json());

app.use("/api/seed", seedDatabase);
app.use("/api/admin", adminRoutes);
app.use("/api/base-commander", baseCommanderRoutes);

db.serialize(() => {
  console.log("SQLite Database ready to use");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
