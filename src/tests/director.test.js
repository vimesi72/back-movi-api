require("../models");
const request = require("supertest");
const app = require("../app");

let directorId;
const BASE_URL = "/api/v1/directors";

const director = {
  firstName: "Gael",
  lastName: "Medina",
  nationality: "Ecuatoriana",
  image: "Gael.png",
  birthday: "2024/05/30",
};

test("POST -> 'BASE_URL', should return  status code 201, and res.body.firstName === director.firstName", async () => {
  const res = await request(app)
    .post(BASE_URL) //consulta BD
    .send(director); //Envia Objeto

  directorId = res.body.id;

  expect(res.statusCode).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(director.firstName);
});

test("GET -> 'BASE_URL' should return status code 200, and res.body[0].firstName === director.fisrtName", async () => {
  const res = await request(app).get(BASE_URL); //consulta a la BD

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body[0].firstName).toBe(director.firstName);
  expect(res.body).toHaveLength(1);
});

test("PUT -> 'BASE_URL/:id' should return status code 200, and res.body.firstName === directorUpdate.firstName", async () => {
  const directorUpdate = {
    firstName: "Ethan Gael",
  };

  const res = await request(app)
    .put(`${BASE_URL}/${directorId}`)
    .send(directorUpdate);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(directorUpdate.firstName);
});

test("DELETE -> 'BASE_URL/:id', should return status code 204", async () => {
  const res = await request(app).delete(`${BASE_URL}/${directorId}`);

  expect(res.status).toBe(204);
});
