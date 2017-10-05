import dbs from '../models';

const Recipe=dbs.Recipe;
const Review=dbs.Review;
const Favorite = dbs.Favorite;

export default {
    create:(req, res)=>{

      Favorite.findOne({
        where: {
          recipeId:req.params.recipeId,
          creatorId:req.currentUser.id
        }
      })
      .then((fave) => {
          if (fave) {
            return res.status(201).json({ message: 'recipe is already a favorite' });
          }

        Favorite.create({
          recipeId:req.params.recipeId,
          creatorId: req.currentUser.id,
        })
        .then((newfav) => {
          return res.status(201).json({ message: `Recipe ${recipeId} has been added as your favourite`, newfav });
        })
        .catch((error) => res.status(500).send(error));
    })
    .catch((error) => res.status(500).send(error));
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
    .catch(error =>res.status(500).json(error))

  }
}