import app from "../../src/app";
import supertest from "supertest";
import {prisma} from "../../src/database";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE Recommendation`
});

//describe("POST / "){

    //POST /recommendations: {
        //caso body seja inválido: deve retornar 422,
        //caso body.name já exista no banco: deve retornar 409 
    //}

    //POST /recommendations/:id/upvote: {
        //caso não ache o id: deveretornar 404
    //}

    //POST /recommendations/:id/downvote: {
        //caso não ache o id: deveretornar 404
    //}
//}

//describe("GET / "){
    //GET /recommendations: {
        //erros: null
    //}

        //GET /recommendations/random: {
        //caso não ache recomendações: deve retornar 404(?) //ver recommedationsService.ts linha 55
    //}

        //GET /recommendations/top/:amout: {
        //erros: null
    //}

        //GET /recommendations/:id: {
        //caso não ache o id: deveretornar 404
    //}
//}