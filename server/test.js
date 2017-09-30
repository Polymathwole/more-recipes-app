import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './app';

chai.use(chaiHttp);

const expect = chai.expect;


describe('App',()=>{
    describe('app.get',()=>{
        it('should return ',()=>{
            chai.request(app).get('/api/v1/recipes').end( (err, res)=>{
                expect(res).to.have.status(400);
                
             });
        })

        it('should be JSON ',()=>{
            chai.request(app).get('/api/v1/recipes').end( (err, res)=>{
                expect(res.body).to.be.json;
                
             });
        })

        
    })
})