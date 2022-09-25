const expect = require("chai").expect;
const dotenv = require("dotenv");
const chai = require("chai");
const request = require("supertest");
const { app } = require("../../app");
const { User } = require("../../models");
const { creds } = require("./needed");

chai.should();

describe("POST Register", () => {
  before(async () => {
    await User.deleteMany();
  });

  after(async () => {
    await User.deleteMany();
  });

  it("It should register a new user", function (done) {
    request(app)
      .post("/v1/api/auth/register")
      .send(creds)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .then((res) => {
        expect(res.body)
          .to.be.an("object")
          .to.have.property("user")
          .with.property("isVerified")
          .oneOf([false, true]);
        done();
      })

      .catch((err) => {
        return done(err);
      });
  });
});
