import controller from '../controllers';
import auth from '../middleware/auth.js';
import validateEmail from '../middleware/emailuser.js';

const recipeController=controller.recipes;
const reviewController=controller.reviews;
const userController=controller.users;
const favoriteController=controller.favorites;

export default (app) => {
    app.post('/api/v1/users/signup', validateEmail.checkEmailUser, auth.authSignup,userController.createUser);//tested
    app.post('/api/v1/users/signin', auth.authLogin,userController.confirmUser);//tested
    app.get('/api/v1/users/:userId/recipes', auth.allowAccess,favoriteController.getForId);
    app.post('/api/v1/recipes', auth.allowAccess,recipeController.create);//tested
    app.get('/api/v1/recipes', recipeController.list);//tested
    app.put('/api/v1/recipes/:recipeId', auth.allowAccess,recipeController.update);//tested
    app.delete('/api/v1/recipes/:recipeId', auth.allowAccess,recipeController.delete);//tested
    app.post('/api/v1/recipes/:recipeId/reviews', auth.allowAccess, reviewController.create);//tested
    app.get('/api/v1/recipes?sort=upvotes&order=des', recipeController.list);//tested

    app.get('/api/v1/users/recipes/:userId', auth.allowAccess,recipeController.listOne);
    app.post('/api/v1/favorites/:recipeId',auth.allowAccess,favoriteController.create);
    app.get('/api/v1/favorites',favoriteController.get);
}