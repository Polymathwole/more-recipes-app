import dbs from '../models';

const Recipe=dbs.Recipe;
const Review=dbs.Review;

export default {
    create:(req, res)=>{
      return Recipe
        .create({
          title: req.body.title,
          content: req.body.content,
          ingredients:req.body.ingredients,
          creatorId: req.currentUser.id
        })
        .then(recipe => res.status(201).json(recipe))
        .catch(error =>res.status(400).json({error}))
  },

  list:(req, res)=>{
    return Recipe
      .findAll({
        include: [{
          model: Review,
          as:'recipereviews'
        }]
      })
      .then(recipes => {
        if (req.query && req.query.sort)
        {
          if (req.query.order && req.query.order === "asc")
            recipes.sort((a, b)=> {
              return a.upvotes - b.upvotes
             });
     
           if (req.query.order && req.query.order === "des") 
           {
             recipes.sort((a, b)=>{ 
               return b.upvotes - a.upvotes 
             });
           }
         }

        res.status(200).json(recipes)
      
      })
      .catch(error => res.status(400).json(error));
  },

  listOne:(req,res)=>{
    if (parseInt(req.params.userId)!==req.currentUser.id)
      return res.status(400).json({message:"You can only view your recipes!"});

    return Recipe
    .findAll({where:{creatorId:req.currentUser.id},include: [{
      model: Review,
      as:'recipereviews'
    }]}
  )
    .then(recipes => {
      res.status(200).json(recipes)
    })
    .catch(error => res.status(400).json(error));
  },

  update:(req,res)=>{
    return Recipe
        .findById(req.params.recipeId)
        .then(
          recipe=>{
            if (!recipe)
              return res.status(404).json({message: 'Recipe Not Found'});

              if (recipe.creatorId===req.currentUser.id)  //ensure the user is updating the recipe he/she created
              {
                return recipe.update(req.body,{fields:Object.keys(req.body)})
                .then(() => res.status(201).json(recipe))
                .catch((error) => res.status(400).json({detail:error}));
              }
              else
              {
                return res.status(400).json({message: 'You can only update a recipe you created!'});
              }

        })
        .catch((error) => res.status(400).json({detail:error}));
  },

  delete:(req,res)=>{
    return Recipe
    .findById(req.params.recipeId)
    .then(
      recipe=>{
        if (!recipe)
          return res.status(404).json({message: 'Recipe Not Found'});

          if (recipe.creatorId===req.currentUser.id)  //ensure the user is deleteing the recipe he/she created
          {
            return recipe.destroy()
            .then(() => res.status(200).json({message: 'Recipe Deleted Successfully'}))
            .catch((error) => res.status(400).json({detail:error}));
          }
          else
          {
            return res.status(400).json({message: 'You can only delete a recipe you created!'});
          }
    })
    .catch((error) => res.status(400).json({detail:error}));
  }
};