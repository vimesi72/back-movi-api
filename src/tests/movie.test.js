require("../models");
const request = require("supertest");
const app = require("../app");

let movieId;
const BASE_URL = "/api/v1/movies";

const movie = {
  name: "Gael",
  image: "Medina",
  synopsis: "Ecuatoriana",
  releaseYear: 2024,
};

test("POST -> 'BASE_URL', should return  status code 201, and res.body.name === movie.name", async () => {
  const res = await request(app)
    .post(BASE_URL) //consulta BD
    .send(movie); //Envia Objeto

  movieId = res.body.id;

  expect(res.statusCode).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(movie.name);
});

test("GET -> 'BASE_URL' should return status code 200, and res.body[0].name === movie.name", async () => {
  const res = await request(app).get(BASE_URL); //consulta a la BD

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body[0].name).toBe(movie.name);
  expect(res.body).toHaveLength(1);
});

test("PUT -> 'BASE_URL/:id' should return status code 200, and res.body.name === movieUpdate.name", async () => {
  const movieUpdate = {
    name: "Ethan Gael",
  };

  const res = await request(app)
    .put(`${BASE_URL}/${movieId}`)
    .send(movieUpdate);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(movieUpdate.name);
});

test("DELETE -> 'BASE_URL/:id', should return status code 204", async () => {
  const res = await request(app).delete(`${BASE_URL}/${movieId}`);

  expect(res.status).toBe(204);
});
