const { expect } = require("chai");
const { createUser } = require("../../repositories/user.repo");
const { creds } = require("./needed");
const request = require("supertest");
const { app } = require("../../app");
const { User } = require("../../models");
const { generateToken } = require("../../services/auth.s");

describe("User Access and verification", function () {
  before(async function () {
    const user = await createUser(creds);
    this.user = user;
    this.token = generateToken(user._id);
    this.verification_token = user.verification_token;
  });

  after(async function () {
    this.user = undefined;
    this.token = undefined;
    await User.deleteMany();
  });

  describe("GET /v1/api/auth/user", function () {
    it("Returns authenticated user on correct access token", function (done) {
      request(app)
        .get("/v1/api/auth/user")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${this.token}`)

        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body).to.have.property("user");
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe("POST /v1/api/auth/verify-user-account", function () {
    it("Verifies user account on correct verification code", function (done) {
      request(app)
        .post("/v1/api/auth/verify-user-account")
        .send({ token: this.verification_token })
        .set("Authorization", `Bearer ${this.token}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body).have.property("status");
          done();
        })
        .catch((err) => {
          return done(err);
        });
    });

    it("Throws unauthenticated error", function (done) {
      request(app)
        .post("/v1/api/auth/verify-user-account")
        .set("Authorization", "Bearer: $adsfjasdflkjasdf")
        .set("Accept", "application/json")
        .expect(401)
        .then((res) => {
          done();
        })
        .catch((err) => {
          return done(err);
        });
    });
  });
});
