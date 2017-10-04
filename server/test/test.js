import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

const expect = chai.expect;

describe('App',()=>{
    describe("GET request to ",()=>{
        it("'/' should return 200 status",(done)=>{
            chai.request(app)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
             });
        });

        it("'/' should return JSON",(done)=>{
            chai.request(app)
            .get('/')
            .end((err, res)=>{
                expect(res).to.be.json;
                done()
             });
        });

        it("'/' should display a message in the JSON response",(done)=>{
            chai.request(app)
            .get('/')
            .end((err, res)=>{
                expect(res.body).to.have.property('message');
                done()
             });
        }); 
    });

    describe("GET request to '/api/v1/recipes' should",()=>{
        it('return 200 status',(done)=>{
            chai.request(app)
            .get('/api/v1/recipes')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
             });
        });

        it('should return JSON ',(done)=>{
            chai.request(app)
            .get('/api/v1/recipes')
            .end((err, res)=>{
                expect(res).to.be.json;
                done()
             });
        });  
    });

    describe("GET request to '/api/v1/recipes?sort=upvotes&order=des' should",()=>{
        it('return 200 status',(done)=>{
            chai.request(app)
            .get('/api/v1/recipes?sort=upvotes&order=des')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
             });
        });

        it('return JSON ',(done)=>{
            chai.request(app)
            .get('/api/v1/recipes?sort=upvotes&order=des')
            .end((err, res)=>{
                expect(res).to.be.json;
                done()
             });
        });

        it('sort by upvotes in descending order',(done)=>{
            chai.request(app)
            .get('/api/v1/recipes?sort=upvotes&order=des')
            .end((err, res)=>{
                let resData = JSON.stringify([
                    {
                        "title": "Akara",
                        "content": "Best eaten with bread",
                        "upvotes": 12,
                        "downvotes": 5,
                        "ingredients": "Beans, Salt, Pepper",
                        "id": 2
                    },
                    {
                        "title": "Eba",
                        "content": "Stir in hot water",
                        "upvotes": 3,
                        "downvotes": 0,
                        "ingredients": "Garri",
                        "id": 1
                    }
                ]);

                expect(JSON.stringify(res.body)).to.equal(resData);
                done();
             });
        });
    });

    describe("Any other request to '/' apart from GET",()=>{

        it("POST request to '/' should return a 404",(done)=>{
            chai.request(app)
            .post('/')
            .send({title: "One",
                content: "Two",
                ingredients:"Three"})
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
        });

        it("PUT request to '/' should return a 404",(done)=>{
            chai.request(app)
            .put('/')
            .send({title: "Three",
                ingredients:"One"})
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
        });

        it("DELETE request to '/' should return a 404",(done)=>{
            chai.request(app)
            .delete('/')
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
        });
    });

    describe("Any request to unspecified routes",()=>{
                it("GET request to '/abvvsg' should return a 404",(done)=>{
                    chai.request(app)
                    .get('/abvvsg')
                    .end((err, res) => {
                        expect(res).to.have.status(404);
                        done();
                    });
                });
        
                it("POST request to '/dsdfvh' should return a 404",(done)=>{
                    chai.request(app)
                    .post('/dsdfvh')
                    .send({title: "One",
                        content: "Two",
                        ingredients:"Three"})
                    .end((err, res) => {
                        expect(res).to.have.status(404);
                        done();
                    });
                });
        
                it("PUT request to '/sdsfcvc' should return a 404",(done)=>{
                    chai.request(app)
                    .put('/sdsfcvc')
                    .send({title: "Three",
                        ingredients:"One"})
                    .end((err, res) => {
                        expect(res).to.have.status(404);
                        done();
                    });
                });
        
                it("DELETE request to '/6654hn' should return a 404",(done)=>{
                    chai.request(app)
                    .delete('/6654hn')
                    .end((err, res) => {
                        expect(res).to.have.status(404);
                        done();
                    });
                });
    });

    describe("POST request to '/api/v1/recipes'",()=>{
        
        it("should return a 201 response",(done)=>{
            chai.request(app)
            .post('/api/v1/recipes')
            .send({title: "One",
                content: "Two",
                ingredients:"Three"})
            .end((err, res) => {
                expect(res).to.have.status(201);
                done();
            });
        });

        it("should return correct data",(done)=>{
            chai.request(app)
            .post('/api/v1/recipes')
            .send({title: "One",
                content: "Two",
                ingredients:"Three"})
            .end((err, res) => {
                expect(res.body).to.have.property('id');
                done();
            });
        });
    });
    
    describe("POST request to '/api/v1/recipes/1/reviews'",()=>{   
        it("should return a 201 response",(done)=>{
            chai.request(app)
            .post('/api/v1/recipes/1/reviews')
            .send({content: "Two"})
            .end((err, res) => {
                expect(res).to.have.status(201);
                done();
            });
        });

        it("should have reviews",(done)=>{
            chai.request(app)
            .post('/api/v1/recipes/1/reviews')
            .send({content: "Trs tres tres"})
            .end((err, res) => {
                expect(res.body).to.have.property('reviews').to.not.be.null;
                done();
            });
        }); 
    });

    describe("PUT request to '/api/v1/recipes/1'",()=>{   
        it("should return a 201 response",(done)=>{
            chai.request(app)
            .put('/api/v1/recipes/1/')
            .send({title: "One",
            content: "Two",
            ingredients:"Three"})
            .end((err, res) => {
                expect(res).to.have.status(201);
                done();
            });
        });

        it("should return a 404 response",(done)=>{
            chai.request(app)
            .put('/api/v1/recipes/13/')
            .send({title: "One",
            content: "Two",
            ingredients:"Three"})
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
        });    
    });

    describe("DELETE request to '/api/v1/recipes/1'",()=>{   
        it("should return a 200 response",(done)=>{
            chai.request(app)
            .delete('/api/v1/recipes/1/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
        });

        it("should return a 404 response",(done)=>{
            chai.request(app)
            .delete('/api/v1/recipes/13/')
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
        });    
    });
});