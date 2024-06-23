require("../models");
const request = require("supertest");
const app = require("../app");

let actorId;
const BASE_URL = "/api/v1/actors";

const actor = {
  firstName: "Gael",
  lastName: "Medina",
  nationality: "Ecuatoriana",
  image: "Gael.png",
  birthday: "2024/05/30",
};

test("POST -> 'BASE_URL', should return res status 201, res.body.firstName === actor.firstName", async () => {
  const res = await request(app)
    .post(BASE_URL) //consulta BD
    .send(actor); //Envia Objeto

  expect(res.statusCode).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(actor.firstName);
});

test("GET -> 'BASE_URL' should return res status 200, res.body[0].firstName === actor.fisrtName", async () => {
  const res = await request(app).get(BASE_URL); //consulta a la BD

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body[0].firstName).toBe(actor.firstName);
  expect(res.body).toHaveLength(1);
});

test("PUT -> 'BASE_URL/:id', should return status code 200, and res.body.firstName === actorUpdate.firstName", async () => {
  const actorUpdate = {
    firstName: "Ethan Gael",
  };

  const res = await request(app)
    .put(`${BASE_URL}/${actorId}`)
    .send(actorUpdate);
  console.log(res.status);
  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(actorUpdate.firstName);
});

test("DELETE -> 'BASE_URL/:id' should return statusCode 204", async () => {
  const res = await request(app).delete(`${BASE_URL}/${actorId}`);

  expect(res.status).toBe(204);
});
