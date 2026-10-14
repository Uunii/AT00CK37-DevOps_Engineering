// tests/server.test.js - Integration tests for the Express API.
// These tests send fake HTTP requests to the app and check the responses.

// Import Jest test helpers.
import { test, expect } from "@jest/globals";
// Import supertest to simulate HTTP requests without a real server.
import request from "supertest";
// Import our Express app to test.
import app from "../server.js";

// Test: valid hex should return RGB with status 200 (OK).
test("GET converts a hex color and returns HTTP 200", async () => {
    // Send a GET request for red color.
    const response = await request(app)
        .get("/api/hex-to-rgb/FF0000");

    // Check status is 200 and body has the right RGB values.
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
        red: 255,
        green: 0,
        blue: 0
    });
});

// Test: lowercase hex should work the same as uppercase.
test("GET accepts a lowercase hex color", async () => {
    // Send a GET request for green color in lowercase.
    const response = await request(app)
        .get("/api/hex-to-rgb/00ff00");

    // Check status is 200 and body has the right RGB values.
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
        red: 0,
        green: 255,
        blue: 0
    });
});

// Test: invalid letters should return status 400 (Bad Request) with an error.
test("GET returns HTTP 400 for invalid hex characters", async () => {
    // Send a GET request with bad characters.
    const response = await request(app)
        .get("/api/hex-to-rgb/XYZ123");

    // Check status is 400 and body has the error message.
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
        error: "Invalid hex color"
    });
});

// Test: short hex should also return status 400 with an error.
test("GET returns HTTP 400 for a hex value with the wrong length", async () => {
    // Send a GET request with only 3 digits.
    const response = await request(app)
        .get("/api/hex-to-rgb/F80");

    // Check status is 400 and body has the error message.
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
        error: "Invalid hex color"
    });
});

// Test: unknown URL should return status 404 (Not Found).
test("GET returns 404 for an unknown route", async () => {
    // Send a GET request to a route that does not exist.
    const response = await request(app)
        .get("/api/unknown");

    // Check status is 404.
    expect(response.status).toBe(404);
});
