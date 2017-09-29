const recipeController = require('../controllers').recipes;
const reviewController = require('../controllers').reviews;

module.exports = (app) => {
    app.post('/api/v1/recipes', recipeController.createDummy);
    app.get('/api/v1/recipes', recipeController.listDummy);
    app.put('/api/v1/recipes/:recipeId', recipeController.updateDummy);
    app.delete('/api/v1/recipes/:recipeId', recipeController.deleteDummy);
    app.post('/api/v1/recipes/:recipeId/reviews', reviewController.createDummy);
    app.get('/api/v1/recipes?sort=upvotes&order=des', recipeController.listDummy);

    /*
    app.post('/api/v1/recipes', recipeController.create);
    app.get('/api/v1/recipes', recipeController.list);
    app.put('/api/v1/recipes/:recipeId', recipeController.update);
    app.delete('/api/v1/recipes/:recipeId', recipeController.delete);
    app.post('/api/v1/recipes/:recipeId/reviews', reviewController.create);
    app.get('/api/v1/recipes?sort=upvotes&order=des', recipeController.listByUpvotes);
    */
}