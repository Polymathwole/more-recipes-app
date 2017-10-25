import dbs from '../models';

const { Recipe, Review } = dbs;

export default {
  create: (req, res) => {
    Recipe
      .findById(req.params.recipeId) // Ensure review is provided only  on a recipe that exists
      .then((recipe) => {
        if (!recipe) {
          return res.status(400).json({ message: 'Recipe not found! Review cannot be provided' });
        }

        return Review
          .create({
            content: req.body.content,
            creatorId: req.currentUser.id,
            recipeId: req.params.recipeId
          })
          .then(review => res.status(201).json(review))
          .catch(() => res.status(400).json({ detail: 'Server error' }));
      })
      .catch(() => res.status(400).json({ detail: 'Server error' }));
  }
};
