import controller from '../controllers';
import auth from '../middleware/auth.js';

const recipeController=controller.recipes;
const reviewController=controller.reviews;
const userController=controller.users;

export default (app) => {
    app.post('/api/v1/users/signup', auth.authSignup,userController.createUser);
    app.post('/api/v1/users/signin', auth.authLogin,userController.confirmUser);
    app.post('/api/v1/recipes', recipeController.create);
    app.get('/api/v1/recipes', recipeController.list);
    app.put('/api/v1/recipes/:recipeId', recipeController.update);
    app.delete('/api/v1/recipes/:recipeId', recipeController.delete);
    app.post('/api/v1/recipes/:recipeId/reviews', reviewController.create);
    app.get('/api/v1/recipes?sort=upvotes&order=des', recipeController.listByUpvotes);
}