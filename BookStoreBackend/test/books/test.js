/**
 * @module       test
 * @file         test.js
 * @description  test the all routes for crud operation
 * @author       Payal Ghusalikar <payal.ghusalikar9@gmail.com>
*  @date         2/01/2021
-----------------------------------------------------------------------------------------------*/

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../server");
chai.use(chaiHttp);
const bookData = require("./books.json");
const should = require("should");

chai.should;
const token = bookData.books.properToken.token;
//console.log("token", bookData)

describe("books API", () => {
    /**
     * @description Test the GET API
     */
    describe("GET /books", () => {
        // test the GET API when points are proper
        it("givenbooks_WhenGivenProperEndPoints_ShouldReturnObject", (done) => {
            console.log("getting all data .");
            const token = bookData.books.properToken.token;
            chai
                .request(server)
                .get("/books")
                .set("Authorization", token)
                .end((err, res) => {
                  //  console.log("responce :", res);
                    console.log("error :", err);

                    done();
                });
        });

        // test the GET API when points are not proper
        it("givenbooks_WhenNotGivenProperEndPoints_ShouldNotReturnObject", (done) => {
            const token = bookData.books.properToken.token;
            chai
                .request(server)
                .get("/not")
                .set("Authorization", token)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });

   
    /**
     * @description Test the POST API
     */
    describe("POST /book", () => {
        // test the POST API when provided proper data
        it("givenbooks_WhenGivenPropertitleAnddescription_ShouldPostbook", (done) => {
            const book = bookData.books.bookToPost;
            const token = bookData.books.properToken.token;
            chai
                .request(server)
                .post("/book/")
                .set("Authorization", token)
                .send(book)

                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });

        it("givenbooks_WhenNotGivenQuantityAndPriceInInteger_ShouldNotPostbook", (done) => {
            const book = bookData.books.bookWithoutIntegerValueForPrice;
            const token = bookData.books.properToken.token;
            chai
                .request(server)
                .post("/book/")
                .set("Authorization", token)
                .send(book)

                .end((error, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a("object");
                    done();
                });
        });
        it("givenbooks_WhenNotGivenQuantityAndPriceInInteger_ShouldNotPostbook", (done) => {
            const book = bookData.books.bookWithoutIntegerValueForQuantity;
            const token = bookData.books.properToken.token;
            chai
                .request(server)
                .post("/book/")
                .set("Authorization", token)
                .send(book)

                .end((error, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a("object");
                    done();
                });
        });

        it("givenbooks_WhenGivenNotPropertitleAnddescription_ShouldNotPostbook", (done) => {
            const book = bookData.books.invalidbookToPost;
            const token = bookData.books.properToken.token;
            chai
                .request(server)
                .post("/book/")
                .set("Authorization", token)
                .send(book)
                .end((error, res) => {
                    res.should.have.status(400);
                 //   res.body.should.be.a("object");
                    done();
                });
        });

        // test the POST API when provided improper data
        it("givenbooks_WhenNotGivenPropertitleAndDescription_ShouldNotPostbook", (done) => {
            const book = bookData.books.bookWithouttitle;
            const token = bookData.books.properToken.token;
            chai
                .request(server)
                .post("/book/")
                .set("Authorization", token)
                .send(book)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });

        it("givenbooks_WhenNotGivenDescription_ShouldNotPostbook", (done) => {
            const book = bookData.books.bookWithoutDescription;
            chai
                .request(server)
                .post("/books/")
                .set("Authorization", token)
                .send(book)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it("givenbooks_WhenGivenEmptyTitle_ShouldNotPostbook", (done) => {
            const book = bookData.books.bookWithEmptyTitle;
            chai
                .request(server)
                .post("/books/")
                .set("Authorization", token)
                .send(book)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });

    /**
     * @description Test the PUT API using Id
     */
    describe("/PUT  /book/:bookId", () => {
        // test the PUT API when provided proper Id
        it("givenbooks_WhenGivenProperId_ShouldUpdatebook", (done) => {
            const bookId = bookData.books.bookToUpdate.bookId;
            const book = bookData.books.bookToUpdate;
            chai
                .request(server)
                .put("/book/" + bookId)
                .set("Authorization", token)
                .send(book)

                .end((err, res) => {
                    res.should.have.status(200);
                    console.log("res Body:", res.body);
                    res.body.should.be.a("Object");
                    done();
                });
        });
        // test the PUT API when provided improper Id
        it("givenbooks_WhenGivenImropertitle_ShouldNotUpdatebook", (done) => {
            const bookId = bookData.books.bookWithouttitle.bookId;
            const book = bookData.books.bookWithouttitle;
            chai
                .request(server)
                .put("/book/" + bookId)
                .set("Authorization", token)
                .send(book)

                .end((err, res) => {
                    res.should.have.status(422);

                    done();
                });
        });
        it("givenbooks_WhenGivenImropertitle_ShouldNotUpdatebook", (done) => {
            const bookId = bookData.books.bookWithEmptytitle.bookId;
            const book = bookData.books.bookWithEmptytitle;
            chai
                .request(server)
                .put("/book/" + bookId)
                .set("Authorization", token)
                .send(book)
                .end((err, res) => {
                    res.should.have.status(422);

                    done();
                });
        });
        it("givenbooks_WhenGivenImroperdescription_ShouldNotUpdatebook", (done) => {
            const bookId = bookData.books.bookWithImproperdescription.bookId;
            const book = bookData.books.bookWithImproperdescription;
            chai
                .request(server)
                .put("/book/" + bookId)
                .set("Authorization", token)
                .send(book)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });
    });

    describe("/PUT  /book/addtobag/:bookId", () => {
        it("givenbooks_WhenGivenProperbookIdandLabelId_ShouldaddbookToBag", (done) => {
            const bookId = bookData.books.bookToUpdate.bookId;

            chai
                .request(server)
                .put("/book/addtobag/" + bookId)
                .set("Authorization", token)
                .send(bookId)

                .end((err, res) => {
                    res.should.have.status(200);
                    console.log("res Body:", res.body);
                    res.body.should.be.a("Object");
                    done();
                });
        });


        it("givenbooks_WhenGivenProperbookIdandLabelId_ShouldNotbookToBag", (done) => {
            const bookId = bookData.books.bookToUpdate.improperId;

            chai
                .request(server)
                .put("/book/addtobag/" + bookId)
                .set("Authorization", token)
                .send(bookId)

                .end((err, res) => {
                    res.should.have.status(200);
                    console.log("res Body:", res.body);
                    res.body.should.be.a("Object");
                    done();
                });
        });

        // it("givenbooks_WhenGivenImProperbookIdandLabelId_ShouldNotaddLabelbook", (done) => {
        //     const bookId = bookData.books.bookToUpdate.bookId;
        //     const labelId = bookData.books.addImproperlabels.labelId;

        //     chai
        //         .request(server)
        //         .put("/books/addlabeltobook/" + bookId)
        //         // .put("/books/removelabelfrombook/" + bookId)
        //         .set("Authorization", token)
        //         .send(labelId)
        //         .end((err, res) => {
        //             res.should.have.status(200);
        //             console.log("res Body:", res.body);
        //             res.body.should.be.a("Object");
        //             done();
        //         });
        // });
    });



    describe("DELETE /books/bookID", function () {
        it("givenbooks_WhenGivenProperId_ShouldDelete_book", (done) => {
            const bookID = bookData.books.bookToDelete.bookId;
            chai
                .request(server)
                .delete("/books/" + bookID)
                .set("Authorization", token)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it("givenbooks_WhenNotGivenProperId_ShouldNotDelete_book", (done) => {
            const bookID = 144;
            chai
                .request(server)
                .delete("/book/" + bookID)
                .set("Authorization", token)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
});