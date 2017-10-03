import jwt from 'jsonwebtoken';
import crypt from 'bcrypt';
import dotenv from 'dotenv';
import controller from '../controllers';

const recipeController=controller.recipes;
const reviewController=controller.reviews;
const userController=controller.users;

dotenv.config();

export default {
    createUser:(req,res,next)=>{

        if (req.body.password)
        {
            if (req.body.confirmPassword)
            {
                if (req.body.confirmPassword===req.body.password)
                {
                    crypt.hash(req.body.password, parseInt(process.env.saltround))
                    .then((hash)=>{
                        req.body.password= hash;
                        next(); 
                    })
                    .catch(err=>res.status(500).json({message:"Error"}));
                }
                else{
                     res.status(400).json({message:"Passwords does not match "})
                }
            }
            else if(!req.body.confirmPassword)
            {
                 res.status(400).json({message:"Please confirm password"})
            }
        } 
        else if (!req.body.password)
        {
             res.status(400).json({message:"Password cannot be null"})
        }    
    },

    getUser:(req,res)=>{
    }
}