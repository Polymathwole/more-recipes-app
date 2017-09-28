const Recipe=require('../models').Recipe;
const Review=require('../models').Review;

const recipes = [];

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
  createDummy:(req,res)=>{
    data={
      title: req.body.title,
      content: req.body.content,
      upvotes:0,
      downvotes:0,
      creatorId: req.body.creatorId
    };

    if (recipes.length===0)
      data.id=1
    else
      data.id=recipes[recipes.length-1].id+1

    recipes.push(data);
    res.status(201).json(data)
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
  listDummy:(req,res)=>{
    res.status(201).json(recipes);
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

  updateDummy:(req,res)=>{
      let recipeId=undefined;
      for (let i=0;i<recipes.length;++i)
      {
        if (req.params.recipeId===recipes[i].id)
          {
            let recipe=recipes[i]
            
            for (let k of Object.keys(req.body))
            {
              recipes[id][k]=req.body[k];
            }

            return res.status(200).json(recipe[i])
          }

          if (i===recipes[recipes.length-1]&&(req.params.recipeId!==recipes[i].id))
            return res.status(400).json({message:'Recipe Not Found'});
      }

      if (recipeId)
      {

      }
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