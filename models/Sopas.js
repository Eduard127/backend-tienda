"use strict";

module.exports = (sequelize, DataTypes) => {
    let Product = sequelize.define('Sopas', {
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
        Ingredientes: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    }, {
            // don't add the timestamp attributes (updatedAt, createdAt)
            timestamps: false,

            // don't use camelcase for automatically added attributes but underscore style
            // so updatedAt will be updated_at
            underscored: true,

            // disable the modification of table names; By default, sequelize will automatically
            // transform all passed model names (first parameter of define) into plural.
            // if you don't want that, set the following
            freezeTableName: false,

            // define the table's name
            tableName: 'Sopas',

            // Enable optimistic locking.  When enabled, sequelize will add a version count attribute
            // to the model and throw an OptimisticLockingError error when stale instances are saved.
            // Set to true or a string with the attribute name you want to use to enable.
            version: false
        });

    Product.associate = models => {
        Product.belongsToMany(models.Cart, {
            through: 'cart_product',
            foreignKey: 'product'
        });
        Product.associate = models =>{
            Product.belongsToMany(models.Product,{
                through: 'cart_Sopas',
                foreignKey: 'Sopas'
            })  
        }
 
        Product.belongsTo(models.Category, {
            foreignKey: 'category'
        });

        Product.belongsTo(models.File, {
            foreignKey: 'photo'
        });
    };

    return Product;
};