'use strict';

export default (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    content: DataTypes.STRING,
    creatorId:DataTypes.INTEGER
  });

  Review.associate=(models)=>{
    Review.belongsTo(models.Recipe,{
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    })
}
  return Review;
};