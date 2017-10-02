'use strict';
export default (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    title: DataTypes.STRING,
    ingredients: DataTypes.STRING,
    content: DataTypes.STRING,
    upvotes: DataTypes.INTEGER,
    downvotes: DataTypes.INTEGER,
    creatorId: DataTypes.INTEGER
  });

  Recipe.associate= (models)=>{
    Recipe.hasMany(models.Review, {
      foreignKey: 'recipeId',
      as:'reviews'
    });
  }
  return Recipe;
};