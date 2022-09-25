const expect = require("chai").expect;
const chai = require("chai");
const request = require("supertest");
const { app } = require("../../app");
const { creds, tearDownUsers, setUpUsers } = require("./needed");

chai.should();

describe("POST Login", () => {
  before(async () => {
    await setUpUsers();
  });

  after(async () => {
    await tearDownUsers();
  });

  it("It should return failed password", function (done) {
    request(app)
      .post("/v1/api/auth/login")
      .send({ email: "preciousaang@gmail.com", password: "albertsten" })
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

  it("It logs in user succesfullyon correct credentials", function (done) {
    request(app)
      .post("/v1/api/auth/login")
      .send(creds)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.have.property("user");
        done();
      })
      .catch((err) => {
        return done(err);
      });
  });
});
