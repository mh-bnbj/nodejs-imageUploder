const User = require('../models/user')
const Image = require('../models/image')

const homepageController = async (req, res) => {
    const activePageId = Number(req.query.page) || 1
    const offset = (Number(req.query.page) - 1) * 8 || 0
    const counts = await Image.count({
        where: {
            user_id: req.user.id,
        },
    })
    const images = await Image.findAll({
        where: {
            user_id: req.user.id,
        },

        limit: 8,
        offset,
        order: [['created_date', 'DESC']],
    })
    res.render('homePage', {
        userName: req.user.name,
        userId: req.user.id,
        images: images,
        counts,
        activePageId,
        URL: process.env.URL,
    })
}

module.exports = homepageController
