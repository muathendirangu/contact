import chai from "chai";
import chaiHttp from "chai-http";
import { app } from "../src/index";
import { send } from "process";

chai.use(chaiHttp);
chai.should();

const testContact = {
    name: "John Wafula",
    phoneNumber: "0719567380",
};
const id = 8;

const testContactWithMissingValues = {
    name: "",
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
        it("should get a single contact record", (done) => {
            chai.request(app)
                .get(`/api/contacts/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });
    });

    describe("Create a contact", () => {
        it("should create a contact", (done) => {
            chai.request(app)
                .post("/api/contacts")
                .send(testContact)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a("object");
                    done();
                });
        });
        it("should not create a contact missing values", (done) => {
            chai.request(app)
                .post("/api/contacts")
                .send(testContactWithMissingValues)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a("object");
                    done();
                });
        });
    });

    describe("Update a contact", () => {
        it("should update a contact with the id passed", (done) => {
            chai.request(app)
                .put(`/api/contacts/${id}`)
                .send(testContact)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });
    });
});
