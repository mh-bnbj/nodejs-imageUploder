const User = require('../models/user')
const Image = require('../models/image')

const homepageController = async (req, res) => {
    // console.log('req.user', req.user)
    const activePageId = Number(req.query.page) || 1
    const offset = (Number(req.query.page) - 1) * 8 || 0
    const counts = await Image.count()
    const images = await Image.findAll({
        limit: 8,
        offset,
        order: [['created_date', 'DESC']],
        include: User,
    })
    res.render('homePage', {
        userName: 'mohamad',
        images: images,
        counts,
        activePageId,
    })
}

module.exports = homepageController
