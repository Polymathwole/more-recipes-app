const recipeController = require('../controllers').recipes;
const reviewController = require('../controllers').reviews;

module.exports = (app) => {
    app.get('/api/v1/recipes?sort=upvotes&order=des', recipeController.listByUpvotes);
    app.post('/api/v1/recipes', recipeController.create);
    app.get('/api/v1/recipes', recipeController.list);
    app.put('/api/v1/recipes/:recipeId', recipeController.update);
    app.delete('/api/v1/recipes/:recipeId', recipeController.delete);
    app.post('/api/v1/recipes/:recipeId/reviews', reviewController.create);
}