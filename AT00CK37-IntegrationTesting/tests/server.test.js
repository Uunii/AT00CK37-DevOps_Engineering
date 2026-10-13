
import { test, expect } from "@jest/globals";
import request from "supertest";
import app from "../server.js";

test("GET converts a hex color and returns HTTP 200", async () => {
    const response = await request(app)
        .get("/api/hex-to-rgb/FF0000");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
        red: 255,
        green: 0,
        blue: 0
    });
});

test("GET accepts a lowercase hex color", async () => {
    const response = await request(app)
        .get("/api/hex-to-rgb/00ff00");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
        red: 0,
        green: 255,
        blue: 0
    });
});

test("GET returns HTTP 400 for invalid hex characters", async () => {
    const response = await request(app)
        .get("/api/hex-to-rgb/XYZ123");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
        error: "Invalid hex color"
    });
});

test("GET returns HTTP 400 for a hex value with the wrong length", async () => {
    const response = await request(app)
        .get("/api/hex-to-rgb/F80");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
        error: "Invalid hex color"
    });
});

test("GET returns 404 for an unknown route", async () => {
    const response = await request(app)
        .get("/api/unknown");

    expect(response.status).toBe(404);
});
