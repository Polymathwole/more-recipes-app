const Recipe=require('../models').Recipe;
const Review=require('../models').Review;

module.exports = {
    create:(req, res)=>{
      return Recipe
        .create({
          title: req.body.title,
          content: req.body.content,
          upvotes:0,
          downvotes:0,
          creatorId: req.body.creatorId
        })
        .then(recipe => res.status(201).json(recipe))
        .catch(error =>res.status(400).json({detail:error.parent.detail}))
  },

  list:(req, res)=>{
    return Recipe
      .findAll({
        include: [{
          model: Review,
          as:'reviews'
        }]
      })
      .then(recipes => res.status(200).json(recipes))
      .catch(error => res.status(400).json(error));
  },

  listByUpvotes:(req, res)=>{
    return Recipe
      .findAll({
        include: [{
          model: Review,
          as:'reviews'
        }],
        order:['upvotes','DESC'],limit:3
      })
      .then(recipes => res.status(200).json(recipes))
      .catch(error => res.status(400).json({error}));
  },

  update:(req,res)=>{
    return Recipe
        .findById(req.params.recipeId)
        .then(
          recipe=>{
            if (!recipe)
              return res.status(404).json({message: 'Recipe Not Found'});

          return recipe.update(req.body,{fields:Object.keys(req.body)})
          .then(() => res.status(200).json(recipe))
          .catch((error) => res.status(400).json({detail:error.parent.detail}));
        })
        .catch((error) => res.status(400).json({detail:error.parent.detail}));
  },

  delete:(req,res)=>{
    return Recipe
    .findById(req.params.recipeId)
    .then(
      recipe=>{
        if (!recipe)
          return res.status(404).json({message: 'Recipe Not Found'});

          return recipe.destroy()
          .then(() => res.status(200).json({message: 'Recipe Deleted Successfully'}))
          .catch((error) => res.status(400).json({detail:error.parent.detail}));
    })
    .catch((error) => res.status(400).json({detail:error.parent.detail}));
  }
};