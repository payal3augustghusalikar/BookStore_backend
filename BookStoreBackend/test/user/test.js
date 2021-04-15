/**
 * @module       test
 * @file         test.js
 * @description  test the all routes for user api
 * @author       Payal Ghusalikar <payal.ghusalikar9@gmail.com>
*  @date         05/04/2021
-----------------------------------------------------------------------------------------------*/

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../server");
chai.use(chaiHttp);
const userData = require("./user.json");
chai.should();
let token = userData.user.properToken.token;

describe("Register", () => {
    it("givenUser_whenGivenProperData_shouldSaveUser", (done) => {
        let userInfo = userData.user.registerUserProperData;
        console.log("userInfo: " + userInfo);
        chai
            .request(server)
            .post("/user-register")
            .send(userInfo)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("array");
                done();
            });
    });

    it("givenUser_whenGivenProperData_shouldSaveUser", (done) => {
        let userInfo = userData.user.registerUserProperData;
        console.log("userInfo: " + userInfo);
        chai
            .request(server)
            .post("/admin-register")
            .send(userInfo)
            .end((err, res) => {
                res.should.have.status(200);
              //  res.body.should.be.a("array");
                done();
            });
    });
  
    it("givenUser_whenGivenImproperData_shouldNotSaveUser", (done) => {
        let userInfo = userData.user.userWithEmptyFirstName;
        chai
            .request(server)
            .post("/user-register")
            .send(userInfo)
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.be.a("object");
                done();
            });
    });

    it("givenUser_whenGivenImproperData_shouldNotSaveUser", (done) => {
        let userInfo = userData.user.userWithEmptyLastName;
        chai
            .request(server)
            .post("/user-register")
            .send(userInfo)
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.be.a("object");
                done();
            });
    });
    it("givenUser_whenGivenImproperDataEmail_shouldNotSaveUser", (done) => {
        let userInfo = userData.user.userWithImproperEmail;
        chai
            .request(server)
            .post("/user-register")
            .send(userInfo)
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.be.a("object");
                done();
            });
    });

    it("givenUser_whenGivenEmptyEmail_shouldNotSaveUser", (done) => {
        let userInfo = userData.user.userWithEmptyEmail;
        chai
            .request(server)
            .post("/user-register")
            .send(userInfo)
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.be.a("object");
                done();
            });
    });

    it("givenUser_whenGivenLessThan3CharInName_shouldNotSaveUser", (done) => {
        let userInfo = userData.user.userWithThan3CharInName;
        chai
            .request(server)
            .post("/user-register")
            .send(userInfo)
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.be.a("object");
                done();
            });
    });

    it("givenUser_whenNotGivenPasswordAndConfirmPasswordSame_shouldNotSaveUser", (done) => {
        let userInfo = userData.user.PasswordAndConfirmPasswordNotSame;
        chai
            .request(server)
            .post("/user-register")
            .send(userInfo)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a("object");
                done();
            });
    });
});

describe("Login", () => {
    it("givenUser_whenGivenProperData_shouldRespondsWithJson", (done) => {
        let userInfo = userData.user.loginUserProperData;
        chai
            .request(server)
            .post("/user-login")
            .send(userInfo)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                done();
            });
    });

    it("givenUser_whenGivenEmptyEmail_shouldNotLoginUser", (done) => {
        let userInfo = userData.user.loginUserEmptyEmail;
        chai
            .request(server)
            .post("/user-login")
            .send(userInfo)
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.be.a("object");
                done();
            });
    });
    
    it("givenUser_whenGivenImproperData_shouldNotRespondsWithJson", (done) => {
        let userInfo = userData.user.loginUserImproperData;
        chai
            .request(server)
            .post("/user-login")
            .send(userInfo)
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.be.a("object");
                done();
            });
    });

    it("givenUser_whenGivenImproperData_shouldNotRespondsWithJson", (done) => {
        let userInfo = userData.user.loginUserImproperData;
        chai
            .request(server)
            .post("/user-login")
            .send(userInfo)
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.be.a("object");
                done();
            });
    });

    it("givenUser_whenGivenNotRegisterdData_shouldNotRespondsWithJson", (done) => {
        let userInfo = userData.user.NotregisterUserProperDatatoLogin;
        chai
            .request(server)
            .post("/user-login")
            .send(userInfo)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a("object");
                done();
            });
    });
});
