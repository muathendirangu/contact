import chai from "chai";
import chaiHttp from "chai-http";
import { app } from "../src/index";


chai.use(chaiHttp);
chai.should();

const testContact = {
    name: "John Wafula",
    phoneNumber: "0719567380",
};
const correctID = "ce3d1551-d090-4491-857d-04958b2ec87f";
const inCorrectID = 8;
const nonExistingID = "ce3d1951-d090-4491-857d-04958b2ec87f";

const testContactWithMissingName = {
    name: "",
    phoneNumber: "0719567380",
};
const testContactWithMissingPhoneNumber = {
    name: "John Wafula",
    phoneNumber: "",
};


describe("Contacts Router module", () => {
    describe("Retrieve contacts", () => {
        it("should get all contacts record", (done) => {
            chai.request(app)
                .get("/api/contacts")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    done();
                });
        });
        it("should get a contact record whith the correct id format", (done) => {
            chai.request(app)
                .get(`/api/contacts/${correctID}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });
        it("should not get a contact record with the incorrect id format", (done) => {
            chai.request(app)
                .get(`/api/contacts/${inCorrectID}`)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a("object");
                    done();
                });
        });
        it("should not get a contact record since it does not exist", (done) => {
            chai.request(app)
                .get(`/api/contacts/${nonExistingID}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a("object");
                    done();
                });
        });
    });

    describe("Create a contact", () => {
        it("should create a contact if name and phone number are provided", (done) => {
            chai.request(app)
                .post("/api/contacts")
                .send(testContact)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a("object");
                    done();
                });
        });
        it("should not create a contact if name was not provided", (done) => {
            chai.request(app)
                .post("/api/contacts")
                .send(testContactWithMissingName)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a("object");
                    done();
                });
        });
        it("should not create a contact if phone number was not provided", (done) => {
            chai.request(app)
                .post("/api/contacts")
                .send(testContactWithMissingPhoneNumber)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a("object");
                    done();
                });
        });
    });

    describe("Update a contact", () => {
        it("should update a contact when correct id format is passed", (done) => {
            chai.request(app)
                .put(`/api/contacts/${correctID}`)
                .send(testContact)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });

        it("should not update a contact when incorrect id format is passed", (done) => {
            chai.request(app)
                .put(`/api/contacts/${inCorrectID}`)
                .send(testContact)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a("object");
                    done();
                });
        });
        it("should not update a contact record since it does not exist", (done) => {
            chai.request(app)
                .put(`/api/contacts/${nonExistingID}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a("object");
                    done();
                });
        });
    });
    describe("Delete a contact", () => {
        it("should not delete a contact when incorrect id format is passed", (done) => {
            chai.request(app)
                .delete(`/api/contacts/${inCorrectID}`)
                .send(testContact)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a("object");
                    done();
                });
        });
        it("should not delete a contact record since it does not exist", (done) => {
            chai.request(app)
                .delete(`/api/contacts/${nonExistingID}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a("object");
                    done();
                });
        });
    });
});
