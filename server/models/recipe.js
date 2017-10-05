'use strict';

module.exports= (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    title: DataTypes.STRING,
    ingredients: DataTypes.STRING,
    content: DataTypes.TEXT,
    upvotes: {
      type: DataTypes.INTEGER,
      defaultValue:0
    },
    downvotes: {
      type: DataTypes.INTEGER,
      defaultValue:0
    },
    creatorId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'recipes',
      }
    }
  });

  Recipe.associate= (models)=>{
    Recipe.hasMany(models.Review, {
      foreignKey: 'recipeId',
      as:'recipereviews'
    });

    Recipe.hasMany(models.Favorite, {
      foreignKey: 'recipeId',
      as:'favoriterecipes'
    });

    Recipe.belongsTo(models.User,{
      foreignKey: 'creatorId',
      onDelete: 'CASCADE'
    });
  }
  return Recipe;
};