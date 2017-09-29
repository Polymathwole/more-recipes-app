import dbs from '../models';

import dbDummy from './recipes'

const db=dbDummy.db;
const Review=dbs.Review;

export default {
    create:(req,res)=>{
        return Review
        .create(
            {
                content:req.body.content,
                creatorId:req.body.creatorId,
                recipeId:req.params.recipeId
            } 
        )
        .then(review => res.status(201).json(review))
        .catch(error =>res.status(400).json({detail:error.parent.detail}))
    },
    createDummy:(req,res)=>{
        for (let i = 0; i < db.length; i++) 
        {
            
            if (parseInt(db[i].id, 10) === parseInt(req.params.recipeId, 10)) 
            {
                if (!db[i].reviews)
                    db[i].reviews = [req.body.content];
                else
                    db[i].reviews.push(req.body.content);

                return res.status(200).json(db[i]);
            }

            if (parseInt(db[i].id, 10) !== parseInt(req.params.recipeId, 10)&&i===db[i].length-1)
                return res.status(404).json({ message: "Recipe not found" })
          }
    }
}