// server.js - Simple Express API that exposes hex-to-RGB conversion over HTTP.
// Endpoint: GET /api/hex-to-rgb/:hex -> returns { red, green, blue } as JSON.

// Import Express to create the web server.
import express from "express";
// Import our color converter helper.
import { hexToRgb } from "./hexToRgb.js";
// Tools to check if this file was started directly with "node server.js".
import { pathToFileURL } from "node:url";
import path from "node:path";

// Create the Express app (our server).
const app = express();

// Allow the app to understand JSON request bodies.
app.use(express.json());

// API route: convert the hex value from the URL to RGB.
// Example: GET /api/hex-to-rgb/FF0000 returns { red: 255, green: 0, blue: 0 }.
app.get("/api/hex-to-rgb/:hex", (req, res) => {
    try {
        // Try to convert the hex parameter from the URL.
        const rgb = hexToRgb(req.params.hex);
        // Success: send back the RGB object with status 200 (OK).
        res.status(200).json(rgb);
    } catch (error) {
        // Fail: bad hex value, send error message with status 400 (Bad Request).
        res.status(400).json({ error: error.message });
    }
});

// Export the app so tests can use it without starting the server.
export default app;

// Check if this file is being run directly (not imported by a test).
const isMainModule =
    process.argv[1] &&
    import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

// Only start listening when run directly, so tests don't start a real server.
if (isMainModule) {
    // Start the server on port 3000.
    app.listen(3000, () => {
        console.log("Server running at http://localhost:3000");
    });
}
