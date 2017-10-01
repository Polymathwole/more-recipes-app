import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

const expect = chai.expect;


describe('App',()=>{
    describe('app.get',()=>{
        it('should return ',(done)=>{
            chai.request(app).get('/api/v1/recipes').end( (err, res)=>{
                expect(res).to.have.status(201);
                done();
             });
        })

        it('should be JSON ',(done)=>{
            chai.request(app).get('/api/v1/recipes').send().end( (err, res)=>{
                expect(res).to.be.json;
                done()
             });
        })

        
    })
})