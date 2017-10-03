import jwt from 'jsonwebtoken';
import crypt from 'bcrypt';
import dotenv from 'dotenv';
import controller from '../controllers';

const recipeController=controller.recipes;
const reviewController=controller.reviews;
const userController=controller.users;

dotenv.config();

export default {
    authSignup:(req,res,next)=>{
        if (!req.body.username)
            return res.status(400).json({ message: "Username required" });

        if (!req.body.email)
            return res.status(400).json({ message: "Email required" });

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
                     return res.status(400).json({message:"Passwords does not match "})
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
    }
}