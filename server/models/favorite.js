'use strict';

module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite',{
    recipeId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Recipes',
        key: 'id',
        as: 'favoriterecipes',
      }
    },
    creatorId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'favoriteusers',
      }
    }
});

  Favorite.associate=(models)=>{
    Favorite.belongsTo(models.Recipe,{
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });

    Favorite.belongsTo(models.User,{
      foreignKey: 'creatorId',
      onDelete: 'CASCADE'
    });
}
  return Favorite;
};