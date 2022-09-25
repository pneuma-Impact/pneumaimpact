const { expect } = require("chai");
const { createUser } = require("../../repositories/user");
const { creds } = require("./needed");
const request = require("supertest");
const { app } = require("../../app");
const { User } = require("../../models");

describe("User verification", function () {
  before(async function () {
    const user = await createUser(creds);
    this.verification_token = user.verification_token;
  });

  after(async function () {
    await User.deleteMany();
  });

  describe("POST /v1/api/auth/verify-user-account", function () {
    it("Verifies user account on correct verification code", function (done) {
      request(app)
        .post("/v1/api/auth/verify-user-account")
        .send({ token: this.verification_token })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201)
        .then((res) => {
          done();
        })
        .catch((err) => {
          return done(err);
        });
    });

    it("Throws error on bad verification code", function (done) {
      request(app)
        .post("/v1/api/auth/verify-user-account")
        .send({ token: 0938094813204981234 })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400)
        .then((res) => {
          done();
        })
        .catch((err) => {
          return done(err);
        });
    });
  });
});
