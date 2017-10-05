'use strict';

module.exports= (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    recipeId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Recipes',
        key: 'id',
        as: 'recipereviews',
      }
    },
    content: DataTypes.TEXT,
    creatorId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'reviewcreators',
      }
    }
  });

  Review.associate=(models)=>{
    Review.belongsTo(models.Recipe,{
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });

    Review.belongsTo(models.User,{
      foreignKey: 'creatorId',
      onDelete: 'CASCADE'
    });
}
  return Review;
};