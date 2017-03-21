module.exports = function (sequelize, DataTypes) {
    var rsvps = sequelize.define("rsvps", {
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        time: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        reserved: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
        {
            // We're saying that we want our Author to have Posts
            classMethods: {
                associate: function (models) {
                    // An Author (foreignKey) is required or a Post can't be made
                    rsvps.belongsTo(models.restaurants, {
                        foreignKey: {
                            allowNull: false
                        }
                    });
                }
            }
        });

    return rsvps;
};