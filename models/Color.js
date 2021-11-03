module.exports = (sequelize, DataTypes) => {
    const Color = sequelize.define("Color", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rgb: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hex: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    });

    Color.associate = (models) => {
        Color.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
            },
        });
    };

    return Color;
}