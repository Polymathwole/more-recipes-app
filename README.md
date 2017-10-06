[![Build Status](https://travis-ci.org/Polymathwole/more-recipes-app.svg?branch=api-endpoints)](https://travis-ci.org/Polymathwole/more-recipes-app)

[![Coverage Status](https://coveralls.io/repos/github/Polymathwole/more-recipes-app/badge.svg?branch=api-endpoints-database)](https://coveralls.io/github/Polymathwole/more-recipes-app?branch=api-endpoints-database)

# more-recipes-app
An app that provides a platform for users to share the awesome and exciting  recipe ideas they have invented or learnt

More-Recipes

## Introduction

More-Recipes provides a platform for users to share the awesome and exciting recipe ideas they have invented or learnt.
A user can come up with a recipe, he/she can add it on the app and get feedback in form of reviews and votes from other users using the app. Users can also keep a list of their favorite recipes on the application.

## API endpoints

### /api/v1/users/signup    [https://wole-more-recipes.herokuapp.com/api/v1/users/signup]
Request type: POST
Allows users to sign up to the More Recipes app

#### Request:
Body:
+ username
+ email
+ password
+ confirmPassword

#### Response
+ Response 201 (application/json)
Body:
+ message
+ id
+ username
+ email

### /api/v1/users/signin    [https://wole-more-recipes.herokuapp.com/api/v1/users/signin]
Request type: POST
Allows users to sign in to the More Recipes app

#### Request:
Body:
+ username
+ password

#### Response
+ Response 200 (application/json)
Body:
+ message
+ id
+ token



### /api/v1/recipes   [https://wole-more-recipes.herokuapp.com/api/v1/recipes]
Request type: POST
Allows authenticated users to post recipes to the More Recipes app  

#### Request:
Body:
+ title
+ content
+ ingredients
+ creatorId

#### Response
+ Response 201 (application/json)



### /api/v1/recipes [https://wole-more-recipes.herokuapp.com/api/v1/recipes]
Request type: GET
Allows users to get all recipes from the More Recipes app  

#### Response
+ Response 201 (application/json)



### /api/v1/recipes/<recipeId>  [https://wole-more-recipes.herokuapp.com/api/v1/recipes/<recipeId>]
Request type: PUT
Allows authenticated users to modify recipe they added to the app 

#### Request:
Body:
+ title
+ content
+ ingredients
Parameter:
+ recipeId

#### Response
+ Response 201 (application/json)



### /api/v1/recipes/<recipeId>  [https://wole-more-recipes.herokuapp.com/api/v1/recipes/<recipeId>]
Request type: DELETE
An API route that allows authenticated user to delete a recipe they added

#### Request:
Parameter:
+ recipeId

#### Response
+ Response 200 (application/json)
+ message



### /api/v1/recipes/<recipeId>/reviews  [https://wole-more-recipes.herokuapp.com/api/v1/recipes/<recipeId>/reviews]
Request type: POST
An API route that allows an authenticated user post a review for a recipe

#### Request:
Body:
+ content
Parameter:
+ recipeId

#### Response
+ Response 200 (application/json)
+ message



### GET: /api/v1/recipes?sort=upvotes&order=desc    [https://wole-more-recipes.herokuapp.com/api/v1/recipes?sort=upvotes&order=desc]
Request type: GET
An API route that allows a user to get just recipes with the most upvotes

#### Response
+ Response 200 (application/json)



### GET: /api/v1/users/<userId>/recipes [https://wole-more-recipes.herokuapp.com/api/v1/recipesusers/<userId>/recipes]
Request: GET
An API route that allows an authenticated user to get all his/her favorite recipes

#### Request:
Parameter:
+ creatorId

#### Response
+ Response 200 (application/json)


### Other endpoints
GET     /api/v1/users/recipes/<userId>
An API route that allows an authenticated user to get all recipes they added

POST    /api/v1/favorites/<recipeId>
An API route that allows an authenticated user to favorite a recipe

GET     /api/v1/favorites
An API route that allows an authenticated user to get all favorite recipes