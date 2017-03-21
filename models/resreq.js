module.exports = function (sequelize, DataTypes) {
  var restaurants = sequelize.define("restaurants", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hour: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reservations: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    delivery: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  },
    {
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function (models) {
          // An Author (foreignKey) is required or a Post can't be made
          restaurants.belongsTo(models.users, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }
  );
  return restaurants;
};