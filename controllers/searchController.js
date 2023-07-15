const { Op } = require('sequelize')
const Image = require('../models/image')

const searchController = async (req, res) => {
    const activePageId = Number(req.query.page) || 1
    const offset = (Number(req.query.page) - 1) * 8 || 0
    const counts = await Image.count({
        where: {
            title: {
                [Op.like]: `%${req.query.q}%`,
            },
            user_id: req.user.id,
        },
    })
    const images = await Image.findAll({
        where: {
            title: {
                [Op.like]: `%${req.query.q}%`,
            },
            user_id: req.user.id,
        },
        limit: 8,
        offset,
        order: [['created_date', 'DESC']],
    })
    res.render('search', {
        userName: req.user.name,
        userId: req.user.id,
        images: images,
        counts,
        activePageId,
        query: req.query.q,
        URL: process.env.URL,
    })
}

module.exports = searchController
