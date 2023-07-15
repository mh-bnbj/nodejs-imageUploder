const { DataTypes } = require('sequelize')
const db = require('../configs/db')
const bcrypt = require('bcrypt')

const User = db.define(
    'user',
    {
        id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'user',
        timestamps: false,
    }
)

User.validPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}

User.encryptPassword = async (password) => {
    const saltRounds = parseInt(process.env.SALT_ROUNDS)
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(password, salt)

    return hash
}

module.exports = User
