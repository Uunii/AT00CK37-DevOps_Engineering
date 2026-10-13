/**
 * @file server.test.js
 * @description Integration test suite for the Math API server routes.
 * @requires supertest
 * @requires chai
 * @requires ../src/server
 */

const request = require("supertest");
const expect = require("chai").expect;

process.env.NODE_ENV = "test"; // ensure server exports app
const app = require("../src/server");

/**
 * Test suite for the Math API endpoints.
 */
describe("Math API", () => {

    /**
     * Test case: responds correctly to the root route.
     */
    it("responds to the root route", async () => {
        const res = await request(app).get("/");
        expect(res.status).to.equal(200);
        expect(res.text).to.equal("Hello");
    });

    /**
     * Test case: returns status 200 for the /add route.
     */
    it("returns status 200 for /add", async () => {
        const res = await request(app).get("/add?a=2&b=3");
        expect(res.status).to.equal(200);
    });

    /**
     * Test case: returns the sum of two numbers via the /add route.
     */
    it("returns the sum of two numbers", async () => {
        const res = await request(app).get("/add?a=2&b=3");
        expect(res.text).to.equal("5");
    });
    
    /**
     * Test the /isEven route with query parameters.
     * Expects HTTP status 200.
     */
    it("returns status 200 for /isEven", async () => {
        const res = await request(app).get("/isEven?num=4");
        expect(res.status).to.equal(200);
    });

    /**
     * Test the /isEven route for correct even number check.
     * Expects true in response text.
     */
    it("returns true if the number is even", async () => {
        const res = await request(app).get("/isEven?num=4");
        expect(res.text).to.equal("true");
    });
});