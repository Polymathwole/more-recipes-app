import dbs from '../models';

import dbDummy from './recipes';

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
        .catch(error =>res.status(400).json({detail:error.parent.detail}));
    }
}