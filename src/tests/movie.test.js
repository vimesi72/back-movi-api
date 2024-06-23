require("../models");
const request = require("supertest");
const app = require("../app");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");

let movieId;
let movie;
let actor;
let genre;
let director;

beforeAll(async () => {
  actor = await Actor.create({
    firstName: "Gael",
    lastName: "Medina",
    nationality: "Ecuatoriana",
    image: "Gael.png",
    birthday: "2024/05/30",
  });

  director = await Director.create({
    firstName: "Yilliam",
    lastName: "Medina",
    nationality: "Colombia",
    image: "Yilliam.png",
    birthday: "2024/05/30",
  });

  genre = await Genre.create({
    name: "Terror",
  });

  movie = {
    name: "La Bestia",
    image: "Medina",
    synopsis: "Lorem Ecuatoriana",
    releaseYear: 2024,
    actorId: actor.id,
    directorId: director.id,
    genreId: genre.id,
  };
});

afterAll(async () => {
  await actor.destroy();
  await director.destroy();
  await genre.destroy();
});

const BASE_URL = "/api/v1/movies";

test("POST -> 'BASE_URL', should return  status code 201, and res.body.name === movie.name", async () => {
  const res = await request(app)
    .post(BASE_URL) //consulta BD
    .send(movie);

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

/* test de los Set*/
test('POST => "BASE_URL/:id/actors" should return status code 200 and res.body.[0].movieActor.actorId ==== actor.id', async () => {
  console.log(movie);
  const res = await request(app)
    .post(`${BASE_URL}/${movieId}/actors`)
    .send([actor.id]);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);

  expect(res.body[0].movieActor.actorId).toBe(actor.id);
  expect(res.body[0].movieActor.movieId).toBe(movieId);
});
/* Fin de los test Set*/

test("DELETE -> 'BASE_URL/:id', should return status code 204", async () => {
  const res = await request(app).delete(`${BASE_URL}/${movieId}`);

  expect(res.status).toBe(204);
});
