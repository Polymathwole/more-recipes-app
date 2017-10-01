import dbs from '../models';

const Recipe=dbs.Recipe;
const Review=dbs.Review;

const recipes = [
  {
    "title": "Eba",
    "content": "Stir in hot water",
    "upvotes": 3,
    "downvotes": 0,
    "ingredients":"Garri",
    "id": 1
},
{
    "title": "Akara",
    "content": "Best eaten with bread",
    "upvotes": 12,
    "downvotes": 5,
    "ingredients":"Beans, Salt, Pepper",
    "id": 2
}
];

export default {
  db:recipes,
    create:(req, res)=>{
      return Recipe
        .create({
          title: req.body.title,
          content: req.body.content,
          creatorId: req.body.creatorId,
          upvotes:0,
          downvotes:0,
        })
        .then(recipe => res.status(201).json(recipe))
        .catch(error =>res.status(400).json({detail:error.parent.detail}))
  },
  createDummy:(req,res)=>{
    let data={
      title: req.body.title,
      content: req.body.content,
      upvotes:0,
      downvotes:0,
      ingredients: req.body.ingredients
    };

    if (recipes.length===0) {
      data.id=1;
    }
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
      .then(recipes => res.status(201).json(recipes))
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
    
      return res.status(200).json(recipes)
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
      for (let i = 1; i < recipes.length; ++i)
      {
        
        if (parseInt(recipes[i].id, 10) === parseInt(req.params.recipeId, 10)) 
        {
          recipes[i].title = req.body.title||recipes[i].title;
          recipes[i].content = req.body.content||recipes[i].content;
          recipes[i].upvotes = req.body.upvotes||recipes[i].upvotes;
          recipes[i].downvotes = req.body.downvotes||recipes[i].downvotes;
          recipes[i].ingredients = req.body.ingredients||recipes[i].ingredients;

          return res.status(201).json(recipes[i])
        }
      
        if (parseInt(recipes[i].id, 10) !== parseInt(req.params.recipeId, 10)&&i===recipes.length-1) 
        return res.status(404).json({ message: "Recipe not found" })
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
  },
  deleteDummy:(req,res)=>{
    for (let i = 1; i < recipes.length; ++i) 
    {
      if (parseInt(recipes[i].id, 10) === parseInt(req.params.recipeId, 10))
      {
        recipes.splice(i, 1);
        return res.status(200).json({ message: "Recipe Deleted Successfully" })
      }

      if (parseInt(recipes[i].id, 10) !== parseInt(req.params.recipeId, 10)&&i===recipes.length-1) 
      return res.status(404).json({ message: "Recipe Not Found" })
    }
  }
};