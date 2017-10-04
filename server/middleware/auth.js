import jwt from 'jsonwebtoken';
import crypt from 'bcrypt';
import dotenv from 'dotenv';
import controller from '../controllers';
import Userdb from '../models'
const User=Userdb.User;

const recipeController=controller.recipes;
const reviewController=controller.reviews;
const userController=controller.users;

dotenv.config();

export default {
    authSignup:(req,res,next)=>{
        if (req.body.password)
        {
            if (req.body.confirmPassword)
            {
                if (req.body.confirmPassword===req.body.password)
                {
                    crypt.hash(req.body.password, parseInt(process.env.saltround))
                    .then(hash=>{
                        req.body.password= hash;
                        next(); 
                    })
                    .catch(err=>res.status(500).json({message:"Error"}));
                }
                else{
                     return res.status(400).json({message:"Passwords does not match"})
                }
            }
            else if(!req.body.confirmPassword)
            {
                 return res.status(400).json({message:"Please confirm password"})
            }
        } 
        else if (!req.body.password)
        {
             return res.status(400).json({message:"Password cannot be null"})
        }    
    },

    authLogin:(req,res,next)=>{
        if (req.body.username)
        {
            if (req.body.password)
            {
                next();    
            }
            else{
                return res.status(400).json({ message: "Password required!" });
            }
        }
        else
        {
            return res.status(400).json({ message: "Username required" });
        }
    },

    allowAccess:(req,res,next)=>{
        let token = req.headers['x-access-token'];
       
          if (!token) 
          {
            return res.status(401).json({message: 'Not authorized!'});
          }
          
          jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded)=>
          {
            if (err) 
            {
              return res.json({message: 'Token authentication failed'});
            } 
            
            if (decoded)
            {  
              User.findById(decoded.id)
              .then(user => {

                    if(!user) 
                        {
                            return res.status(401).send({error: 'User verification unsuccessful'})
                        }

                    req.currentUser = user;
                    next();
                })
                .catch(error =>res.status(400).json({message:'Error'}));
            }
        })
    }
}