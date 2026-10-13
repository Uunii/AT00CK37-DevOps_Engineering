import express from "express";
import { hexToRgb } from "./hexToRgb.js";
import { pathToFileURL } from "node:url";
import path from "node:path";

const app = express();

app.use(express.json());

app.get("/api/hex-to-rgb/:hex", (req, res) => {
    try {
        const rgb = hexToRgb(req.params.hex);
        res.status(200).json(rgb);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default app;

const isMainModule =
    process.argv[1] &&
    import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (isMainModule) {
    app.listen(3000, () => {
        console.log("Server running at http://localhost:3000");
    });
}
