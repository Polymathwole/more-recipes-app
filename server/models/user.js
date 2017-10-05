'use strict';

module.exports= (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username:{
      type: DataTypes.STRING,
      validate: {
        min: 5
      }
    },
    email:{
      type:DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        min: 7
      }
    },
    admin: {
      type:DataTypes.BOOLEAN,
      defaultValue:false
    }
    })

  User.associate= (models)=>{
    User.hasMany(models.Favorite, {
      foreignKey: 'creatorId',
      as:'favoriteusers'
    });

    User.hasMany(models.Recipe, {
      foreignKey: 'creatorId',
      as:'recipes'
    });

    User.hasMany(models.Review, {
      foreignKey: 'creatorId',
      as:'reviewcreators'
    });
  };

  return User;
};