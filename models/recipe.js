"use strict";

module.exports = (sequelize, DataTypes) => {
    let Recipe = sequelize.define('Recipe', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    }, {
            // don't add the timestamp attributes (updatedAt, createdAt)
            timestamps: true,

            // don't use camelcase for automatically added attributes but underscore style
            // so updatedAt will be updated_at
            underscored: true,

            // disable the modification of table names; By default, sequelize will automatically
            // transform all passed model names (first parameter of define) into plural.
            // if you don't want that, set the following
            freezeTableName: false,

            // define the table's name
            tableName: 'recipe',

            // Enable optimistic locking.  When enabled, sequelize will add a version count attribute
            // to the model and throw an OptimisticLockingError error when stale instances are saved.
            // Set to true or a string with the attribute name you want to use to enable.
            version: false
        });

    Recipe.associate = models => {
        Recipe.belongsTo(models.Category, {
            foreignKey: 'category'
        });

        Recipe.belongsTo(models.File, {
            foreignKey: 'photo'
        });

        Recipe.belongsToMany(models.Ingredient, {
            as: 'Ingredients',
            through: 'recipe_ingredient',
            foreignKey: 'recipe'
        });
    };

    return Recipe;
};