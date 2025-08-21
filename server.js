const express = require("express");
const cors = require("cors");
const adminRoutes = require("./src/routes/adminRoutes");
const baseCommanderRoutes = require("./src/routes/baseCommanderRoutes");
const app = express();
const db = require("./config/db");
require("./models/initDB");
const { seedDatabase } = require("./seeddata");

// Setup allowed origins
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : [
      "http://localhost:5173", // React dev server
      "https://msma-frontend.vercel.app" // Deployed frontend
    ];

// CORS middleware
app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error(`CORS policy does not allow origin ${origin}`), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Express JSON middleware
app.use(express.json());

// Routes
app.use("/api/seed", seedDatabase);
app.use("/api/admin", adminRoutes);
app.use("/api/base-commander", baseCommanderRoutes);

// SQLite ready log
db.serialize(() => {
  console.log("SQLite Database ready to use");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
