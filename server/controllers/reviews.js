const Review=require('../models').Review;

module.exports = {
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
    }
}