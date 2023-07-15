const { DataTypes } = require('sequelize')
const db = require('../configs/db')
const User = require('./user')

const Image = db.define(
    'image',
    {
        id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        href: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        created_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
    },
    {
        tableName: 'image',
        timestamps: false,
    }
)

Image.belongsTo(User, {
    foreignKey: {
        name: 'user_id',
    },
})

module.exports = Image
