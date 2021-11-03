const { Op } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    User.associate = (models) => {
        User.hasMany(models.Color, {
            onDelete: "cascade",
        });
    };

    return User;
};