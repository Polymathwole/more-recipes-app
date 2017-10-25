import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

const expect = chai.expect;

describe('App', () => {
  describe('GET request to ', () => {
    it("'/' should return 200 status", (done) => {
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

    describe("Unauthorized POST request to '/api/v1/users/signup'",()=>{
        
        it("should return a 400 response",(done)=>{
            chai.request(app)
            .post('/api/v1/users/signup')
            .send({title: "One",
                content: "Two",
                ingredients:"Three"})
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
        });

        it("should return a 'Username required' message",(done)=>{
            chai.request(app)
            .post('/api/v1/users/signup')
            .send({title: "One",
                content: "Two",
                ingredients:"Three"})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.equal('Username required');
                done();
            });
        });

        it("should return a 'Username not enough' message",(done)=>{
            chai.request(app)
            .post('/api/v1/users/signup')
            .send({username: "wole",
                email: "wole@y.com",
                ingredients:"Three"})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.equal('Username must be a minimum of 5 characters!');
                done();
            });
        });

        it("should return an 'Email required' message",(done)=>{
            chai.request(app)
            .post('/api/v1/users/signup')
            .send({username: "wolexy",
                content: "Two",
                ingredients:"Three"})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.equal('Email required');
                done();
            });
        });

        it("should return a 'Invalid Email' message",(done)=>{
            chai.request(app)
            .post('/api/v1/users/signup')
            .send({username: "wolexy",
                email: "Two",
                ingredients:"Three"})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.equal('Invalid email address!');
                done();
            });
        });

        it("should return an 'Invalid Email' message",(done)=>{
            chai.request(app)
            .post('/api/v1/users/signup')
            .send({username: "wolexy",
                email: " ",
                ingredients:"Three"})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.equal('Invalid email address!');
                done();
            });
        });

        it("should return a 'Password not null' message",(done)=>{
            chai.request(app)
            .post('/api/v1/users/signup')
            .send({username: "wolexy",
                email: "wole@y.com",
                ingredients:"Three"})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.equal('Password cannot be null');
                done();
            });
        });

        it("should return a 'Password not enough' message",(done)=>{
            chai.request(app)
            .post('/api/v1/users/signup')
            .send({username: "wolexy",
                email: "wole@y.com",
                password:"Three"})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.equal('Password must be a minimum of 7 characters!');
                done();
            });
        });

        it("should return a 'Confirm Password' message",(done)=>{
            chai.request(app)
            .post('/api/v1/users/signup')
            .send({username: "wolexy",
                email: "wole@y.com",
                password:"Threeyy"})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.equal('Please confirm password');
                done();
            });
        });

        it("should return a 'Password mismatch' message",(done)=>{
            chai.request(app)
            .post('/api/v1/users/signup')
            .send({username: "wolexy",
                email: "wole@y.com",
                password:"Threeyyy",
                confirmPassword: "Foiur"
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.equal('Passwords does not match');
                done();
            });
        });
    });

});
