import controller from '../controllers';

const recipeController=controller.recipes;
const reviewController=controller.reviews;

export default (app) => {
    app.post('/api/v1/recipes', recipeController.createDummy);
    app.get('/api/v1/recipes', recipeController.listDummy);
    app.put('/api/v1/recipes/:recipeId', recipeController.updateDummy);
    app.delete('/api/v1/recipes/:recipeId', recipeController.deleteDummy);
    app.post('/api/v1/recipes/:recipeId/reviews', reviewController.createDummy);
    app.get('/api/v1/recipes?sort=upvotes&order=des', recipeController.listDummy);
}