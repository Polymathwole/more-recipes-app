import dbs from '../models';

const Recipe=dbs.Recipe;
const Review=dbs.Review;
const Favorite = dbs.Favorite;

export default {
    create:(req, res)=>{
      return Favorite
        .create({
          recipeId:req.body.recipeId,
          creatorId: req.body.creatorId,
        })
        .then(fave => res.status(201).json(fave))
        .catch(error =>res.status(400).json({detail:error}))
  },

  get:(req, res)=>{
    return Favorite
      .all()
      .then(faves => res.status(201).json(faves))
      .catch(error =>res.status(400).json({detail:error}))
  },

  getForId:(req, res)=>{

    if (parseInt(req.params.userId)!==req.currentUser.id)
      return res.status(400).json({message:"You can only view your favorite recipes!"});

    Favorite.findAll(
      {where:{creatorId:req.params.userId},include:[{
        model: Recipe
      }]}
    )
    .then(faves=>{
      let recipes=[];

      if (!faves)
        {
        return res.status(400).json({message:"User has no favorites"})
        }

        faves.forEach(
          (favorite)=>{
            recipes.push(favorite.Recipe);
          }
        )
       
        return res.status(200).json(recipes)
    })
    .catch(error =>res.status(400).json(error))

  }
}