const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");

const app = express();
const port = process.env.PORT || 5000;

// 1. Initialize Firebase Admin
// Load your service account key safely
const serviceAccount = require(path.join(__dirname, 'serviceAccountKey.json'));

try {
  // Use credential directly instead of admin.credential
  initializeApp({
    credential: cert(serviceAccount)
  });
  console.log("🔥 Firebase Admin initialized successfully!");
} catch (error) {
  console.error("Firebase initialization failed:", error.message);
}
// 2. Middleware
app.use(cors({origin: "http://localhost:5000"}));
app.use(express.json());

// Auth verification Middleware
const checkAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const idToken = authHeader.split("Bearer ")[1];

    try {
        // Firebase validates the JWT token sent by your Next.js frontend
        const decodedToken = await getAuth().verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(403).json({error: 'Unauthorized access'});
    }
};

// 3. Routes


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});