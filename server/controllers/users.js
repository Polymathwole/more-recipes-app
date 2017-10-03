import dbs from '../models';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

const User=dbs.User;
dotenv.config();

export default {
    createUser:(req, res)=>{
        const username = req.body.username.toLowerCase().trim();
        const email = req.body.email.toLowerCase().trim();
        const password = req.body.password;

        if (!username)
            return res.status(400).json({ message: "Username required" });
    
        if (!email)
            return res.status(400).json({ message: "Email required" });

        User.findOne({
            where: 
                {
                    $or:[
                        {username: {$eq: username}},
                        {email: {$eq: email}}
                    ]
            }})
        .then((user) => {
                if (user)
                {
                    if (user.username===username)
                        return res.status(400).json({error: 'Username already exists'});
                    else if (user.email===email)
                        return res.status(400).json({error: 'Email already exists'});
                }
                else
                {
                    return User.create({
                        username,
                        email,
                        password
                      })
                      .then((user)=>{
                        let token = jwt.sign({id: user.id},process.env.TOKEN_SECRET,{ expiresIn: 7*24*60*60*31}); 

                        let data = {id:user.id,username:user.username,email:user.email}
                       
                        return res.status(201).json(data); 
                      })
                      .catch(error =>res.status(400).json({message:'Error'}));
                } 
              })
        .catch(error => { return res.status(500).send(error) });
    }
}