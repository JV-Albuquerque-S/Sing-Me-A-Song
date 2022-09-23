import app from "../../src/app";
import supertest from "supertest";
import {prisma} from "../../src/database";
import {recommendationValidBody, recommendationInvalidBody, getIdByName } from "../factories/recommendationFactory";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE Recommendations`
});

describe("POST /recommendations", () =>{
    it("should return 201 on valid input", async () => {
        const body = recommendationValidBody();
        const response = await supertest(app).post("/recommendations").send(body);
        
        expect(response.status).toEqual(201);
    });
    it("should return 422 on invalid name", async () =>{
        const body = recommendationInvalidBody();
        const response = await supertest(app).post("/recommendations").send(body);

        expect(response.status).toEqual(422);
    });
    it("should return 422 on invalid youtube link", async () =>{
        const body = recommendationValidBody();
        body.youtubeLink = "programação é irado 😎";
        const response = await supertest(app).post("/recommendations").send(body);

        expect(response.status).toEqual(422);
    });
    it("should return 409 on name already exist", async () => {
        const body = recommendationValidBody();
        await supertest(app).post("/recommendations").send(body);
        const response = await supertest(app).post("/recommendations").send(body);
        
        expect(response.status).toEqual(409);
    });
});

describe("POST /:id/upvote", () => {
    it("should return 200 on success", async () => {
        const body = recommendationValidBody();
        await supertest(app).post("/recommendations").send(body);
        const id = await getIdByName("super vídeo mega ultra maneiro");
        const response = await supertest(app).post(`/recommendations/${id}/upvote`);

        expect(response.status).toEqual(200)
    });
    it("should return 404 on id not found", async () =>{
        const response = await supertest(app).post("/recommendations/9999999/upvote");

        expect(response.status).toEqual(404)
    });
});

describe("POST /:id/downvote", () => {
    it("should return 200 on success", async () => {
        const body = recommendationValidBody();
        await supertest(app).post("/recommendations").send(body);
        const id = await getIdByName("super vídeo mega ultra maneiro");
        const response = await supertest(app).post(`/recommendations/${id}/downvote`);

        expect(response.status).toEqual(200)
    });
    it("should return 404 on id not found", async () => {
        const response = await supertest(app).post("/recommendations/9999999/downvote");

        expect(response.status).toEqual(404)
    });
});

describe("GET /recommendations", () => {
    it("should return 200 on success", async () => {
        const response = await supertest(app).get("/recommendations");

        expect(response.status).toEqual(200)
    });
});

describe("GET /recommendations/random", () => {
    it("should return 200 on success", async () => {
        const body = recommendationValidBody();
        await supertest(app).post("/recommendations").send(body);
        const response = await supertest(app).get("/recommendations/random");

        expect(response.status).toEqual(200)
    });
    it("should return 404 on no recommendations in database", async () => {
        const response = await supertest(app).get("/recommendations/random");

        expect(response.status).toEqual(404)
    });
});

describe("GET /recommendations/top/:amount", () => {
    it("should return 200 on success", async () => {
        const amount = Math.ceil(Math.random()*10);
        const response = await supertest(app).get(`/recommendations/top/${amount}`);

        expect(response.status).toEqual(200)
    });
});

describe("GET /recommendations/:id", () => {
    it("should return 200 on success", async () => {
        const body = recommendationValidBody();
        await supertest(app).post("/recommendations").send(body);
        const id = await getIdByName("super vídeo mega ultra maneiro");
        const response = await supertest(app).get(`/recommendations/${id}`);

        expect(response.status).toEqual(200);
    });
    it("should return 404 on id not found", async () => {
        const response = await supertest(app).get(`/recommendations/9999999`);

        expect(response.status).toEqual(404);
    })
});          
        
afterAll(async () => {
    await prisma.$disconnect();
})