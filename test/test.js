const chai = require('chai')
, chaiHttp = require('chai-http');

chai.use(chaiHttp);
const app=require('../app')
const expect = chai.expect;

describe('App',()=>{
    describe('app.get',()=>{
        it('should return ',()=>{
            chai.request(app).get('/api/v1/recipes').end( (err, res)=>{
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                done();
             });
        })

        it('should be JSON ',()=>{
            chai.request(app).get('/api/v1/recipes').end( (err, res)=>{
                expect(res).to.be.json;
                done();
             });
        })

        
    })
})