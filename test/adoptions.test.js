const request = require("supertest");
const User = require("../src/models/user.model");
const Pet = require("../src/models/pet.model");
const { expect } = require("chai");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let app;
let mongoServer;

describe("Functional Tests - adoption.router.js", function () {
  this.timeout(20000);

  before(async () => {
    
    app = require("../src/app");

    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);

    const User = require("../src/models/user.model");
    const Pet = require("../src/models/pet.model");

    const user = await User.create({
     name: "Test User",
     age: 30,
     email: "test@mail.com",
     password: "hashed",
     role: "user",
     pets: []
});

    const pet = await Pet.create({
     name: "Firulais",
    age: 2,
    species: "dog"
});

    global.__seedUserId = user._id.toString();
    global.__seedPetId = pet._id.toString();
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it("GET /api/adoptions debería devolver array (200)", async () => {
    const res = await request(app).get("/api/adoptions");
    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("success");
    expect(res.body.payload).to.be.an("array");
  });

  it("POST /api/adoptions debería crear adopción (201)", async () => {
    const res = await request(app)
      .post("/api/adoptions")
      .send({ owner: global.__seedUserId, pet: global.__seedPetId });

    expect(res.status).to.equal(201);
    expect(res.body.status).to.equal("success");
    expect(res.body.payload).to.have.property("_id");

    global.__adoptionId = res.body.payload._id;
  });

  it("POST /api/adoptions sin owner/pet debería dar 400", async () => {
    const res = await request(app).post("/api/adoptions").send({});
    expect(res.status).to.equal(400);
    expect(res.body.status).to.equal("error");
  });

  it("GET /api/adoptions/:aid debería devolver adopción creada (200)", async () => {
    const res = await request(app).get(`/api/adoptions/${global.__adoptionId}`);
    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("success");
    expect(res.body.payload).to.have.property("_id");
  });

  it("GET /api/adoptions/:aid inexistente debería dar 404", async () => {
    const fakeId = new mongoose.Types.ObjectId().toString();
    const res = await request(app).get(`/api/adoptions/${fakeId}`);
    expect(res.status).to.equal(404);
    expect(res.body.status).to.equal("error");
  });

  it("PUT /api/adoptions/:aid/cancel debería cancelar (200)", async () => {
    const res = await request(app).put(
      `/api/adoptions/${global.__adoptionId}/cancel`
    );
    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("success");
    expect(res.body.payload.status).to.equal("cancelled");
  });

  it("PUT /api/adoptions/:aid/cancel inexistente debería dar 404", async () => {
    const fakeId = new mongoose.Types.ObjectId().toString();
    const res = await request(app).put(`/api/adoptions/${fakeId}/cancel`);
    expect(res.status).to.equal(404);
    expect(res.body.status).to.equal("error");
  });
});